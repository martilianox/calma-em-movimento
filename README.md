# 🌟 Calma em Movimento

**Aplicativo de saúde mental com IA especializada em psicologia**

Um assistente inteligente para ajudar você a gerenciar ansiedade, estresse e bem-estar emocional com suporte de IA médica especializada.

---

## ✨ Funcionalidades Principais

### 🤖 **Médico Amigo - IA Especializada**
- **API Doctor AI integrada** com especialização em psiquiatria/psicologia
- Análise inteligente de sintomas em tempo real
- Respostas personalizadas baseadas em severidade
- Sistema de fallback local quando API não disponível
- Tradução automática PT ↔ EN para melhor precisão

### 🎯 **Recursos do App**
- 📊 **Calendário Emocional** - Registre seus sentimentos diariamente
- 📝 **Diário Digital** - Escreva sobre suas emoções
- 📈 **Gráficos de Ansiedade** - Visualize seu progresso
- 🧘 **Exercícios Guiados** - Respiração, meditação, relaxamento
- 🆘 **Modo Crise** - Suporte imediato em momentos difíceis
- 📞 **Contatos de Emergência** - Acesso rápido a ajuda profissional
- 🔐 **Autenticação Supabase** - Dados seguros e sincronizados

---

## 🚀 Como Começar

### 1️⃣ **Instalação**

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/calma-em-movimento.git

# Entre na pasta
cd calma-em-movimento

# Instale as dependências
npm install
```

### 2️⃣ **Configuração de Variáveis de Ambiente**

Crie um arquivo `.env.local` na raiz do projeto:

```env
# Supabase (Obrigatório para autenticação e dados)
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase

# RapidAPI - Doctor AI (Opcional)
# Se não configurar, o app usa respostas locais inteligentes
NEXT_PUBLIC_RAPIDAPI_KEY=sua_chave_rapidapi
```

**📌 Como obter as credenciais:**

- **Supabase**: Crie um projeto em [supabase.com](https://supabase.com)
- **RapidAPI** (opcional): Inscreva-se em [rapidapi.com](https://rapidapi.com) e assine a [Doctor AI API](https://rapidapi.com/ai-doctor-api-ai-medical-chatbot-healthcare-ai-assistant/api/ai-doctor-api-ai-medical-chatbot-healthcare-ai-assistant)

### 3️⃣ **Executar Localmente**

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

---

## 🏗️ **Estrutura do Banco de Dados (Supabase)**

O app cria automaticamente as tabelas necessárias:

### **Tabelas Principais:**

```sql
-- Perfis de usuário
user_profiles (
  id uuid PRIMARY KEY,
  user_id uuid REFERENCES auth.users,
  name text,
  age integer,
  created_at timestamp
)

-- Conversas do Médico Amigo
medico_amigo_conversations (
  id uuid PRIMARY KEY,
  user_id uuid REFERENCES auth.users,
  messages jsonb,
  symptoms text[],
  severity text,
  created_at timestamp,
  updated_at timestamp
)

-- Entradas do diário
diary_entries (
  id uuid PRIMARY KEY,
  user_id uuid REFERENCES auth.users,
  date text,
  anxiety_level integer,
  feelings text[],
  what_feeling text,
  what_caused text,
  body_reaction text,
  free_thoughts text,
  created_at timestamp
)
```

---

## 🤖 **Como Funciona a IA Médica**

### **Fluxo de Resposta Inteligente:**

1. **Usuário envia mensagem** → Sistema analisa sintomas
2. **Análise de severidade** → Classifica em: baixa, média, alta, emergência
3. **Consulta API Doctor AI** → Resposta especializada em psiquiatria
4. **Tradução e contextualização** → Adapta resposta para português
5. **Fallback local** → Se API falhar, usa lógica inteligente local

### **Níveis de Severidade:**

| Nível | Ação | Exemplo |
|-------|------|---------|
| 🟢 **Baixa** | Exercícios de relaxamento | "Estou um pouco nervoso" |
| 🟡 **Média** | Técnicas de respiração | "Coração acelerado, suando" |
| 🟠 **Alta** | Recomenda atendimento médico | "Não aguento mais, desespero" |
| 🔴 **Emergência** | Contatos de emergência imediatos | "Dor no peito forte, sufocando" |

---

## 📦 **Deploy na Vercel**

### **Opção 1: Deploy Automático (Recomendado)**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/seu-usuario/calma-em-movimento)

### **Opção 2: Deploy Manual**

```bash
# Instale a CLI da Vercel
npm i -g vercel

# Faça login
vercel login

# Deploy
vercel --prod
```

### **⚙️ Configurar Variáveis de Ambiente na Vercel:**

1. Acesse seu projeto na Vercel
2. Vá em **Settings** → **Environment Variables**
3. Adicione as variáveis:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_RAPIDAPI_KEY` (opcional)

---

## 🛠️ **Tecnologias Utilizadas**

- **Framework:** Next.js 15 (App Router)
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS v4
- **Banco de Dados:** Supabase (PostgreSQL)
- **Autenticação:** Supabase Auth
- **IA Médica:** RapidAPI Doctor AI
- **Ícones:** Lucide React
- **Deploy:** Vercel

---

## 🔒 **Segurança e Privacidade**

- ✅ Autenticação segura com Supabase
- ✅ Dados criptografados em trânsito (HTTPS)
- ✅ Row Level Security (RLS) no banco de dados
- ✅ Variáveis de ambiente protegidas
- ✅ Sem armazenamento de dados sensíveis no cliente

---

## 📝 **Notas Importantes**

### **⚠️ Aviso Médico:**
Este aplicativo é uma ferramenta de suporte emocional e **NÃO substitui atendimento médico profissional**. Em caso de emergência ou sintomas graves, procure ajuda médica imediatamente.

### **🔑 API Doctor AI (Opcional):**
- O app funciona perfeitamente **sem a API** usando respostas locais inteligentes
- Com a API, você obtém respostas especializadas de IA médica
- Plano gratuito da RapidAPI: 100 requisições/mês
- Custo adicional: a partir de $9.99/mês para mais requisições

---

## 🤝 **Contribuindo**

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer fork do projeto
2. Criar uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abrir um Pull Request

---

## 📄 **Licença**

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 📞 **Contatos de Emergência**

### **Brasil:**
- 🚨 **SAMU:** 192
- 🆘 **CVV (Centro de Valorização da Vida):** 188
- 📞 **Emergência:** 190 (Polícia) / 193 (Bombeiros)

### **Recursos Online:**
- [CVV - Chat Online](https://www.cvv.org.br/)
- [CAPS - Centros de Atenção Psicossocial](https://www.gov.br/saude/pt-br/acesso-a-informacao/acoes-e-programas/caps)

---

## 💙 **Sobre o Projeto**

**Calma em Movimento** foi criado com o objetivo de democratizar o acesso a ferramentas de saúde mental, combinando tecnologia de ponta com empatia e cuidado humano.

Desenvolvido com ❤️ para ajudar pessoas a cuidarem melhor de sua saúde emocional.

---

**🌟 Se este projeto te ajudou, considere dar uma estrela no GitHub!**
