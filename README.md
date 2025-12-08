# 🛡️ Simulador de Detecção de Fraudes Financeiras

Sistema web inteligente para análise e detecção de possíveis golpes e fraudes financeiras, desenvolvido para o site **cuidadofinanceiro.com.br**.

## 📋 Sobre o Projeto

Este simulador utiliza **Inteligência Artificial (Claude da Anthropic)** para analisar situações potencialmente fraudulentas e fornecer:

- **Pontuação de risco** (0 a 100) da probabilidade de golpe
- **Análise detalhada** dos sinais de alerta identificados
- **Recomendações práticas** de medidas a tomar
- **Armazenamento completo** de todas as análises em banco de dados

## 🚀 Tecnologias Utilizadas

### Backend
- **Node.js** com Express
- **SQLite** para banco de dados
- **Anthropic Claude API** (IA para análise de fraudes)
- **ES6 Modules**

### Frontend
- **React 18**
- **Vite** (build tool)
- **CSS moderno** com variáveis CSS
- **Axios** para comunicação com API

## 📁 Estrutura do Projeto

```
adm/
├── backend/
│   ├── database.js              # Configuração e funções do banco de dados
│   ├── database.sql             # Schema do banco SQLite
│   ├── fraudAnalysisService.js  # Serviço de análise com IA
│   ├── server.js                # Servidor Express e rotas da API
│   ├── package.json             # Dependências do backend
│   └── .env.example             # Exemplo de variáveis de ambiente
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── LeadForm.jsx         # Formulário de captação de leads
│   │   │   ├── Questionario.jsx     # Questionário de perguntas estratégicas
│   │   │   └── Resultado.jsx        # Página de resultados da análise
│   │   ├── services/
│   │   │   └── api.js               # Cliente API (Axios)
│   │   ├── styles/
│   │   │   └── App.css              # Estilos globais
│   │   ├── App.jsx                  # Componente principal
│   │   └── main.jsx                 # Ponto de entrada React
│   ├── index.html               # HTML base
│   ├── vite.config.js           # Configuração Vite
│   ├── package.json             # Dependências do frontend
│   └── .env.example             # Exemplo de variáveis de ambiente
│
└── README.md                    # Este arquivo
```

## 🔧 Instalação e Configuração

### Pré-requisitos
- Node.js 18+ instalado
- Chave de API da Anthropic (obtenha em: https://console.anthropic.com/)

### Passo 1: Clonar o Repositório

```bash
git clone <url-do-repositorio>
cd adm
```

### Passo 2: Configurar Backend

```bash
cd backend

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env

# Editar o arquivo .env e adicionar sua chave da API Anthropic
# ANTHROPIC_API_KEY=sk-ant-sua-chave-aqui
```

### Passo 3: Configurar Frontend

```bash
cd ../frontend

# Instalar dependências
npm install

# (Opcional) Configurar URL da API
cp .env.example .env
# Por padrão usa http://localhost:3001/api
```

## 🏃 Como Executar

### Iniciar Backend (Terminal 1)

```bash
cd backend
npm start
```

O servidor backend estará rodando em: **http://localhost:3001**

### Iniciar Frontend (Terminal 2)

```bash
cd frontend
npm run dev
```

O frontend estará disponível em: **http://localhost:3000**

## 📊 Banco de Dados

O banco de dados SQLite é criado automaticamente na primeira execução em:
```
backend/fraud_detection.db
```

### Estrutura das Tabelas

#### Tabela `leads`
- `id`: ID único do lead
- `nome`: Nome completo
- `email`: Email
- `telefone`: Telefone (opcional)
- `created_at`: Data de criação

#### Tabela `analises`
- `id`: ID único da análise
- `lead_id`: Referência ao lead
- `pontuacao`: Pontuação de risco (0-100)
- `explicacao`: Explicação detalhada
- `medidas_recomendadas`: JSON com medidas, sinais de alerta e nível de risco
- `perguntas_respostas`: JSON com perguntas e respostas
- `created_at`: Data da análise

## 🔌 API Endpoints

### GET `/api/health`
Verifica se a API está funcionando.

**Resposta:**
```json
{
  "status": "ok",
  "message": "API está funcionando"
}
```

### POST `/api/leads`
Cria um novo lead.

**Body:**
```json
{
  "nome": "João Silva",
  "email": "joao@email.com",
  "telefone": "(11) 99999-9999"
}
```

**Resposta:**
```json
{
  "success": true,
  "leadId": 1,
  "message": "Lead cadastrado com sucesso"
}
```

### GET `/api/perguntas`
Retorna as perguntas estratégicas do questionário.

**Resposta:**
```json
{
  "success": true,
  "perguntas": [
    {
      "id": 1,
      "pergunta": "Como você tomou conhecimento desta oportunidade?",
      "tipo": "text",
      "placeholder": "Ex: Recebi mensagem no WhatsApp..."
    }
  ]
}
```

### POST `/api/analisar`
Analisa as respostas e retorna pontuação de fraude.

**Body:**
```json
{
  "leadId": 1,
  "respostas": [
    {
      "pergunta": "Como você tomou conhecimento?",
      "resposta": "Recebi uma mensagem no WhatsApp"
    }
  ]
}
```

**Resposta:**
```json
{
  "success": true,
  "analiseId": 1,
  "analise": {
    "pontuacao": 75,
    "explicacao": "Análise detalhada...",
    "medidas_recomendadas": ["Medida 1", "Medida 2"],
    "sinais_alerta": ["Sinal 1", "Sinal 2"],
    "nivel_risco": "alto"
  }
}
```

### GET `/api/analises/:id`
Busca uma análise específica por ID.

### GET `/api/estatisticas`
Retorna estatísticas gerais do sistema.

## 🎨 Funcionalidades

### 1. Captação de Leads
- Formulário com validação de nome, email e telefone
- Validação em tempo real
- Feedback visual de erros

### 2. Questionário Estratégico
- 6 perguntas estratégicas sobre a situação
- Tipos de pergunta: texto, textarea, múltipla escolha
- Navegação entre perguntas
- Barra de progresso visual
- Validação de respostas obrigatórias

### 3. Análise por IA
- Processamento via Claude (Anthropic)
- Análise contextual das respostas
- Identificação de padrões de golpes brasileiros
- Pontuação de 0 a 100

### 4. Resultado Visual
- Pontuação com código de cores
- Nível de risco (baixo/médio/alto/crítico)
- Explicação detalhada
- Lista de sinais de alerta
- Medidas recomendadas prioritizadas
- Canais para denúncia
- Opção de fazer nova análise

## 🔐 Segurança

- Validação de dados no frontend e backend
- Sanitização de inputs
- Variáveis de ambiente para chaves sensíveis
- CORS configurado
- Sem exposição de dados sensíveis na API

## 📈 Melhorias Futuras

- [ ] Dashboard administrativo para análise de leads
- [ ] Exportação de relatórios em PDF
- [ ] Notificações por email
- [ ] Histórico de análises por usuário
- [ ] Integração com outros serviços de IA
- [ ] Modo offline com análise básica
- [ ] Testes automatizados
- [ ] Deploy em produção
- [ ] Migração para PostgreSQL
- [ ] Sistema de autenticação

## 📝 Licença

Este projeto foi desenvolvido para uso no site cuidadofinanceiro.com.br

## 👥 Suporte

Para dúvidas ou problemas:
1. Verifique a documentação acima
2. Confira os logs do backend e frontend
3. Certifique-se de que a chave da API Anthropic está configurada

## 🤝 Contribuindo

1. Faça fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

---

Desenvolvido com ❤️ para ajudar pessoas a se protegerem contra fraudes financeiras.
