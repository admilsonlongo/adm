# ⚡ Guia de Início Rápido

Comece a usar o Simulador de Detecção de Fraudes em menos de 5 minutos!

## 📋 Pré-requisitos

- Node.js 18 ou superior ([Download](https://nodejs.org/))
- Chave de API da Anthropic ([Obter chave](https://console.anthropic.com/))

## 🚀 Instalação Rápida

### 1. Clone e Configure

```bash
# Clone o repositório (se ainda não clonou)
git clone <url-do-repositorio>
cd adm
```

### 2. Configure o Backend

```bash
cd backend

# Instalar dependências
npm install

# Criar arquivo .env
cat > .env << EOF
ANTHROPIC_API_KEY=sk-ant-sua-chave-aqui
PORT=3001
NODE_ENV=development
EOF

# IMPORTANTE: Edite o arquivo .env e substitua "sk-ant-sua-chave-aqui"
# pela sua chave real da Anthropic
```

### 3. Configure o Frontend

```bash
cd ../frontend

# Instalar dependências
npm install

# O frontend já está configurado para usar http://localhost:3001/api
# Não é necessário criar .env para desenvolvimento local
```

## ▶️ Executar o Projeto

### Opção 1: Dois Terminais (Recomendado)

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

Você verá:
```
🚀 Servidor rodando na porta 3001
📊 API disponível em http://localhost:3001/api
Conectado ao banco de dados SQLite
Banco de dados inicializado com sucesso
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Você verá:
```
  VITE v5.0.2  ready in 500 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

### Opção 2: Script de Inicialização (Linux/Mac)

Crie um arquivo `start.sh`:
```bash
#!/bin/bash

# Iniciar backend em background
cd backend
npm start &
BACKEND_PID=$!

# Esperar 3 segundos
sleep 3

# Iniciar frontend
cd ../frontend
npm run dev

# Cleanup ao fechar
trap "kill $BACKEND_PID" EXIT
```

Execute:
```bash
chmod +x start.sh
./start.sh
```

## 🌐 Acessar a Aplicação

Abra seu navegador em: **http://localhost:3000**

## 🧪 Testar o Simulador

1. **Preencha seus dados:**
   - Nome: "João Silva"
   - Email: "joao@email.com"
   - Telefone: "(11) 99999-9999" (opcional)

2. **Responda o questionário:**
   - Responda as 6 perguntas sobre a situação suspeita
   - Use os botões "Próxima" e "Anterior" para navegar

3. **Veja o resultado:**
   - Pontuação de risco (0-100)
   - Análise detalhada
   - Sinais de alerta
   - Medidas recomendadas

## 📊 Verificar se Está Funcionando

### Teste o Backend

Abra http://localhost:3001/api/health no navegador.

Deve retornar:
```json
{
  "status": "ok",
  "message": "API está funcionando"
}
```

### Verificar Logs

**Backend:**
- Verifique no terminal do backend
- Deve mostrar conexão com banco de dados

**Frontend:**
- Abra o DevTools (F12) no navegador
- Vá para Console
- Não deve haver erros

## 🔧 Problemas Comuns

### ❌ Erro: "Cannot find module"
**Solução:** Execute `npm install` novamente no diretório correspondente

### ❌ Erro: "Port 3001 already in use"
**Solução:**
```bash
# Linux/Mac
lsof -ti:3001 | xargs kill

# Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F
```

### ❌ Erro: "ANTHROPIC_API_KEY not found"
**Solução:**
- Verifique se o arquivo `.env` existe em `backend/`
- Certifique-se de que a chave está correta
- Reinicie o servidor backend

### ❌ Frontend não conecta ao Backend
**Solução:**
- Verifique se o backend está rodando (http://localhost:3001/api/health)
- Limpe o cache do navegador (Ctrl+Shift+R)
- Verifique o console do navegador (F12) para erros

### ❌ Erro ao analisar fraude
**Solução:**
- Verifique se a chave da Anthropic é válida
- Verifique os logs do backend para mensagens de erro
- Certifique-se de que tem créditos na conta Anthropic

## 📱 Testar em Mobile

1. Descubra seu IP local:
```bash
# Linux/Mac
ifconfig | grep "inet "

# Windows
ipconfig
```

2. Atualize o frontend para aceitar conexões externas:
```bash
# No diretório frontend, edite vite.config.js
# Adicione: server: { host: '0.0.0.0', port: 3000 }
```

3. Acesse pelo celular:
```
http://SEU-IP-LOCAL:3000
```

## 🎯 Próximos Passos

1. ✅ **Personalize as perguntas**
   - Edite `backend/fraudAnalysisService.js`
   - Função `obterPerguntasEstrategicas()`

2. ✅ **Ajuste o prompt da IA**
   - Edite `backend/fraudAnalysisService.js`
   - Função `analisarFraude()`

3. ✅ **Customize as cores e estilos**
   - Edite `frontend/src/styles/App.css`
   - Variáveis CSS no `:root`

4. ✅ **Adicione seu logo**
   - Substitua em `frontend/src/components/Header.jsx`

5. ✅ **Configure analytics**
   - Google Analytics
   - Meta Pixel
   - Hotjar

## 📚 Documentação Completa

- [README.md](README.md) - Documentação técnica completa
- [DEPLOY.md](DEPLOY.md) - Guia de deploy em produção

## 🆘 Precisa de Ajuda?

1. Consulte a documentação completa no README.md
2. Verifique os logs no terminal
3. Abra um issue no GitHub (se aplicável)

---

**Pronto para usar!** 🎉

Comece protegendo pessoas contra fraudes financeiras agora mesmo.
