import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { initDatabase, runQuery, getQuery } from './database.js';
import { analisarFraude, obterPerguntasEstrategicas } from './fraudAnalysisService.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Inicializar banco de dados
initDatabase();

// ==================== ROTAS ====================

/**
 * Rota de health check
 */
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API está funcionando' });
});

/**
 * Rota para criar um novo lead
 * POST /api/leads
 */
app.post('/api/leads', async (req, res) => {
  try {
    const { nome, email, telefone } = req.body;

    // Validação básica
    if (!nome || !email) {
      return res.status(400).json({
        error: 'Nome e email são obrigatórios'
      });
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Email inválido'
      });
    }

    const result = await runQuery(
      'INSERT INTO leads (nome, email, telefone) VALUES (?, ?, ?)',
      [nome, email, telefone || null]
    );

    res.status(201).json({
      success: true,
      leadId: result.id,
      message: 'Lead cadastrado com sucesso'
    });

  } catch (error) {
    console.error('Erro ao criar lead:', error);
    res.status(500).json({
      error: 'Erro ao cadastrar lead'
    });
  }
});

/**
 * Rota para obter perguntas estratégicas
 * GET /api/perguntas
 */
app.get('/api/perguntas', (req, res) => {
  try {
    const perguntas = obterPerguntasEstrategicas();
    res.json({
      success: true,
      perguntas
    });
  } catch (error) {
    console.error('Erro ao obter perguntas:', error);
    res.status(500).json({
      error: 'Erro ao obter perguntas'
    });
  }
});

/**
 * Rota para analisar respostas e detectar fraude
 * POST /api/analisar
 */
app.post('/api/analisar', async (req, res) => {
  try {
    const { leadId, respostas } = req.body;

    // Validação
    if (!leadId || !respostas || !Array.isArray(respostas)) {
      return res.status(400).json({
        error: 'leadId e respostas (array) são obrigatórios'
      });
    }

    // Verificar se o lead existe
    const lead = await getQuery('SELECT * FROM leads WHERE id = ?', [leadId]);
    if (!lead) {
      return res.status(404).json({
        error: 'Lead não encontrado'
      });
    }

    // Analisar fraude usando IA
    const analise = await analisarFraude(respostas);

    // Preparar dados para salvar
    const perguntasRespostasJSON = JSON.stringify(respostas);
    const medidasJSON = JSON.stringify({
      medidas: analise.medidas_recomendadas,
      sinais_alerta: analise.sinais_alerta,
      nivel_risco: analise.nivel_risco
    });

    // Salvar análise no banco
    const result = await runQuery(
      `INSERT INTO analises
       (lead_id, pontuacao, explicacao, medidas_recomendadas, perguntas_respostas)
       VALUES (?, ?, ?, ?, ?)`,
      [
        leadId,
        analise.pontuacao,
        analise.explicacao,
        medidasJSON,
        perguntasRespostasJSON
      ]
    );

    res.json({
      success: true,
      analiseId: result.id,
      analise: {
        pontuacao: analise.pontuacao,
        explicacao: analise.explicacao,
        medidas_recomendadas: analise.medidas_recomendadas,
        sinais_alerta: analise.sinais_alerta,
        nivel_risco: analise.nivel_risco
      }
    });

  } catch (error) {
    console.error('Erro ao analisar fraude:', error);
    res.status(500).json({
      error: 'Erro ao processar análise',
      details: error.message
    });
  }
});

/**
 * Rota para obter análise por ID
 * GET /api/analises/:id
 */
app.get('/api/analises/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const analise = await getQuery(
      `SELECT a.*, l.nome, l.email, l.telefone
       FROM analises a
       JOIN leads l ON a.lead_id = l.id
       WHERE a.id = ?`,
      [id]
    );

    if (!analise) {
      return res.status(404).json({
        error: 'Análise não encontrada'
      });
    }

    // Parse dos campos JSON
    const medidas = JSON.parse(analise.medidas_recomendadas);
    const perguntasRespostas = JSON.parse(analise.perguntas_respostas);

    res.json({
      success: true,
      analise: {
        id: analise.id,
        lead: {
          nome: analise.nome,
          email: analise.email,
          telefone: analise.telefone
        },
        pontuacao: analise.pontuacao,
        explicacao: analise.explicacao,
        medidas_recomendadas: medidas.medidas,
        sinais_alerta: medidas.sinais_alerta,
        nivel_risco: medidas.nivel_risco,
        perguntas_respostas: perguntasRespostas,
        data_analise: analise.created_at
      }
    });

  } catch (error) {
    console.error('Erro ao buscar análise:', error);
    res.status(500).json({
      error: 'Erro ao buscar análise'
    });
  }
});

/**
 * Rota para obter estatísticas gerais
 * GET /api/estatisticas
 */
app.get('/api/estatisticas', async (req, res) => {
  try {
    const stats = await getQuery(`
      SELECT
        COUNT(DISTINCT l.id) as total_leads,
        COUNT(a.id) as total_analises,
        AVG(a.pontuacao) as pontuacao_media,
        MAX(a.pontuacao) as maior_pontuacao,
        MIN(a.pontuacao) as menor_pontuacao
      FROM leads l
      LEFT JOIN analises a ON l.id = a.lead_id
    `);

    res.json({
      success: true,
      estatisticas: stats
    });

  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
    res.status(500).json({
      error: 'Erro ao buscar estatísticas'
    });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📊 API disponível em http://localhost:${PORT}/api`);
});
