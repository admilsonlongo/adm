# 🚀 Guia de Deploy

Este documento contém instruções para fazer o deploy do Simulador de Detecção de Fraudes.

## 📋 Checklist Pré-Deploy

- [ ] Chave da API Anthropic configurada
- [ ] Variáveis de ambiente configuradas
- [ ] Testes manuais realizados
- [ ] Banco de dados configurado
- [ ] CORS configurado para domínio de produção

## 🔧 Configuração de Produção

### Backend

1. **Instalar dependências:**
```bash
cd backend
npm install --production
```

2. **Configurar variáveis de ambiente (.env):**
```env
ANTHROPIC_API_KEY=sk-ant-sua-chave-de-producao
PORT=3001
NODE_ENV=production
```

3. **Iniciar servidor:**
```bash
npm start
```

### Frontend

1. **Instalar dependências:**
```bash
cd frontend
npm install
```

2. **Configurar variáveis de ambiente (.env):**
```env
VITE_API_URL=https://seu-dominio.com/api
```

3. **Build de produção:**
```bash
npm run build
```

Os arquivos de produção estarão em `frontend/dist/`

## 🌐 Opções de Hospedagem

### Backend

**Opção 1: VPS/Servidor Dedicado**
- Usar PM2 para gerenciar processo Node.js
- Nginx como proxy reverso
- SSL/TLS com Let's Encrypt

**Opção 2: Plataformas Cloud**
- Heroku
- Railway
- Render
- DigitalOcean App Platform
- AWS Elastic Beanstalk

### Frontend

**Opção 1: Hospedagem Estática**
- Vercel (recomendado)
- Netlify
- GitHub Pages
- Cloudflare Pages

**Opção 2: CDN**
- AWS S3 + CloudFront
- Google Cloud Storage + CDN

## 📦 Deploy com PM2 (VPS)

### Instalar PM2
```bash
npm install -g pm2
```

### Criar arquivo ecosystem.config.js
```javascript
module.exports = {
  apps: [{
    name: 'fraud-detector-api',
    script: './backend/server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3001
    }
  }]
}
```

### Iniciar aplicação
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## 🔒 Nginx como Proxy Reverso

### Configuração Nginx
```nginx
server {
    listen 80;
    server_name seu-dominio.com;

    # Frontend
    location / {
        root /var/www/fraud-detector/frontend/dist;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 🔐 SSL/TLS com Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d seu-dominio.com
```

## 🗄️ Banco de Dados

### SQLite (Desenvolvimento/Pequeno Volume)
- Já está configurado
- Arquivo: `fraud_detection.db`
- Backup regular recomendado

### PostgreSQL (Produção/Alto Volume)

1. **Instalar dependências:**
```bash
npm install pg
```

2. **Atualizar database.js para usar PostgreSQL**

3. **Criar banco:**
```sql
CREATE DATABASE fraud_detection;
```

## 📊 Monitoramento

### PM2 Monitoring
```bash
pm2 monit
pm2 logs
```

### Logs Importantes
- Erros da API
- Chamadas à API da Anthropic
- Taxa de conversão (leads → análises)
- Tempo de resposta

## 🔄 Atualização de Código

```bash
# Parar aplicação
pm2 stop fraud-detector-api

# Atualizar código
git pull origin main

# Instalar dependências se necessário
cd backend && npm install
cd ../frontend && npm install && npm run build

# Reiniciar
pm2 restart fraud-detector-api
```

## 🧪 Testes Pós-Deploy

1. [ ] Health check: `GET /api/health`
2. [ ] Criar lead de teste
3. [ ] Responder questionário completo
4. [ ] Verificar análise retornada
5. [ ] Testar em diferentes navegadores
6. [ ] Testar em dispositivos móveis

## ⚠️ Considerações de Segurança

1. **Nunca commitar .env**
2. **Usar HTTPS em produção**
3. **Configurar rate limiting**
4. **Monitorar uso da API Anthropic**
5. **Fazer backup regular do banco**
6. **Configurar CORS apropriadamente**

## 💰 Custos Estimados

### Anthropic API
- Modelo: Claude Sonnet
- ~$3-5 por 1M tokens
- Estimativa: $0.003 por análise

### Hospedagem
- VPS básico: $5-10/mês
- Vercel (frontend): Grátis para projetos pequenos
- Total estimado: $5-15/mês (baixo volume)

## 📈 Escalabilidade

Para alto volume:
1. Migrar para PostgreSQL
2. Adicionar cache (Redis)
3. Implementar fila de jobs (Bull)
4. Load balancer para múltiplas instâncias
5. CDN para assets estáticos

## 🆘 Troubleshooting

### Erro: "ANTHROPIC_API_KEY not found"
- Verificar arquivo .env
- Verificar se o arquivo está no diretório correto
- Reiniciar servidor após alterar .env

### Erro: "CORS blocked"
- Atualizar configuração CORS no backend
- Adicionar domínio de produção à whitelist

### Erro: "Database locked"
- Se usar SQLite em produção
- Considerar migrar para PostgreSQL

---

**Dúvidas?** Consulte o README.md principal ou entre em contato.
