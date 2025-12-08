import Anthropic from '@anthropic-ai/sdk';
import dotenv from 'dotenv';

dotenv.config();

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

/**
 * Analisa as respostas do usuário e retorna uma pontuação de risco de fraude
 * @param {Array} perguntasRespostas - Array com perguntas e respostas
 * @returns {Object} - Objeto com pontuação, explicação e medidas recomendadas
 */
export async function analisarFraude(perguntasRespostas) {
  const contexto = perguntasRespostas
    .map((item, index) => `${index + 1}. ${item.pergunta}\nResposta: ${item.resposta}`)
    .join('\n\n');

  const prompt = `Você é um especialista em detecção de fraudes financeiras e golpes no Brasil.

Analise as seguintes respostas de um usuário que está relatando uma situação potencialmente suspeita:

${contexto}

Com base nessas informações, forneça uma análise completa no seguinte formato JSON:

{
  "pontuacao": [número de 0 a 100, onde 0 = sem risco e 100 = certamente é golpe],
  "explicacao": "Explicação detalhada da pontuação, incluindo os principais sinais de alerta identificados",
  "medidas_recomendadas": [
    "Lista de medidas específicas que o usuário deve tomar imediatamente",
    "Cada medida deve ser clara e acionável"
  ],
  "sinais_alerta": [
    "Lista dos principais sinais de alerta identificados na situação"
  ],
  "nivel_risco": "baixo/médio/alto/crítico"
}

Considere fatores como:
- Promessas de retorno garantido ou muito altos
- Pressão para tomar decisões rápidas
- Solicitação de dados sensíveis ou senhas
- Contato não solicitado
- Esquemas de pirâmide ou vendas multinível
- Falta de documentação ou registro oficial
- Métodos de pagamento não rastreáveis
- Comunicação por canais não oficiais

Seja específico nas recomendações e considere o contexto brasileiro (golpes comuns, instituições para denúncia, etc.).`;

  try {
    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 2000,
      messages: [{
        role: 'user',
        content: prompt
      }]
    });

    // Extrair o conteúdo da resposta
    const responseText = message.content[0].text;

    // Tentar extrair o JSON da resposta
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Não foi possível extrair JSON da resposta da IA');
    }

    const analise = JSON.parse(jsonMatch[0]);

    // Validar e garantir que a pontuação está entre 0 e 100
    if (typeof analise.pontuacao !== 'number' || analise.pontuacao < 0 || analise.pontuacao > 100) {
      throw new Error('Pontuação inválida retornada pela IA');
    }

    return {
      pontuacao: Math.round(analise.pontuacao),
      explicacao: analise.explicacao || '',
      medidas_recomendadas: Array.isArray(analise.medidas_recomendadas)
        ? analise.medidas_recomendadas
        : [],
      sinais_alerta: Array.isArray(analise.sinais_alerta)
        ? analise.sinais_alerta
        : [],
      nivel_risco: analise.nivel_risco || 'baixo'
    };

  } catch (error) {
    console.error('Erro ao analisar fraude:', error);
    throw new Error('Erro ao processar análise de fraude: ' + error.message);
  }
}

/**
 * Gera perguntas estratégicas personalizadas com base no contexto inicial
 * @returns {Array} - Array com perguntas estratégicas
 */
export function obterPerguntasEstrategicas() {
  return [
    {
      id: 1,
      pergunta: "Como você tomou conhecimento desta oportunidade/situação?",
      tipo: "text",
      placeholder: "Ex: Recebi uma mensagem no WhatsApp, vi um anúncio, fui contatado por telefone..."
    },
    {
      id: 2,
      pergunta: "Alguém está solicitando pagamento antecipado, transferência ou dados bancários?",
      tipo: "radio",
      opcoes: [
        "Sim, solicitaram pagamento antecipado",
        "Sim, pediram dados bancários ou senhas",
        "Sim, ambos",
        "Não, não houve nenhuma solicitação desse tipo"
      ]
    },
    {
      id: 3,
      pergunta: "Há promessas de retorno financeiro garantido ou valores muito acima do mercado?",
      tipo: "radio",
      opcoes: [
        "Sim, prometem lucros garantidos",
        "Sim, prometem retornos muito altos",
        "Não há promessas de retorno financeiro",
        "Não tenho certeza"
      ]
    },
    {
      id: 4,
      pergunta: "Você está sendo pressionado a tomar uma decisão rápida ou há senso de urgência?",
      tipo: "radio",
      opcoes: [
        "Sim, dizem que é por tempo limitado",
        "Sim, estão me pressionando bastante",
        "Não, posso pensar com calma",
        "Um pouco, mas não é extremo"
      ]
    },
    {
      id: 5,
      pergunta: "A empresa/pessoa tem registro oficial, documentação verificável ou presença online estabelecida?",
      tipo: "radio",
      opcoes: [
        "Sim, verifiquei e está tudo documentado",
        "Dizem que sim, mas não consegui verificar",
        "Não tem documentação ou registro",
        "Não sei como verificar"
      ]
    },
    {
      id: 6,
      pergunta: "Descreva mais detalhes sobre a situação que você considera suspeita:",
      tipo: "textarea",
      placeholder: "Forneça o máximo de detalhes possível sobre o que aconteceu, quem entrou em contato, o que foi prometido, etc."
    }
  ];
}
