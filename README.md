# 🌊 Calma em Movimento

**Aplicativo de suporte emocional e gerenciamento de ansiedade com IA integrada**

Um assistente pessoal de saúde mental que combina tecnologia de ponta com empatia humana para ajudar você a gerenciar ansiedade, crises emocionais e bem-estar mental.

---

## ✨ Funcionalidades Principais

### 🤖 Médico Amigo com IA
- **Consultas especializadas** em psiquiatria e psicologia
- **Análise inteligente de sintomas** com 4 níveis de severidade
- **Tradução automática** para melhor precisão nas respostas
- **Modo offline** com respostas empáticas locais
- **Integração com API Doctor AI** para respostas médicas especializadas

### 🆘 Modo Crise
- Ativação rápida em momentos de emergência
- Exercícios de respiração guiados
- Acesso direto a contatos de emergência
- Técnicas de grounding e ancoragem

### 🧘 Exercícios Terapêuticos
- Respiração guiada (4-7-8, Box Breathing)
- Relaxamento muscular progressivo
- Meditação mindfulness
- Alongamentos para ansiedade
- Técnicas de grounding (5-4-3-2-1)

### 📅 Diário Emocional
- Registro diário de emoções e ansiedade
- Gráficos de progresso ao longo do tempo
- Identificação de padrões e gatilhos
- Resumo médico para compartilhar com profissionais

### 📚 Biblioteca de Conteúdo
- Artigos sobre saúde mental
- Vídeos educativos
- Podcasts de bem-estar
- Recursos de autoajuda

### 📞 Contatos de Emergência
- Lista personalizada de contatos
- Acesso rápido em crises
- Números de emergência nacionais

---

## 🚀 Deploy na Vercel

### Passo 1: Preparar o Repositório

1. **Faça commit das alterações:**
```bash
git add .
git commit -m "Preparar app para deploy"
git push origin main
```

### Passo 2: Deploy na Vercel

1. **Acesse** [vercel.com](https://vercel.com)
2. **Clique em** "Add New Project"
3. **Importe** seu repositório do GitHub
4. **Configure** as variáveis de ambiente (opcional):
   - `NEXT_PUBLIC_SUPABASE_URL` - URL do seu projeto Supabase
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Chave anônima do Supabase
   - `NEXT_PUBLIC_RAPIDAPI_KEY` - Chave da API Doctor AI (opcional)

5. **Clique em** "Deploy"

### Passo 3: Configurar Variáveis de Ambiente (Opcional)

**Importante:** O app funciona perfeitamente SEM variáveis de ambiente! Elas são opcionais.

#### Para adicionar Supabase:
1. Vá em **Settings** → **Environment Variables**
2. Adicione:
   - `NEXT_PUBLIC_SUPABASE_URL`: Sua URL do Supabase
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Sua chave anônima

#### Para adicionar API Doctor AI:
1. Vá em **Settings** → **Environment Variables**
2. Adicione:
   - `NEXT_PUBLIC_RAPIDAPI_KEY`: Sua chave da RapidAPI

3. **Redeploy** o projeto após adicionar variáveis

---

## 🛠️ Desenvolvimento Local

### Pré-requisitos
- Node.js 18+ instalado
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/calma-em-movimento.git
cd calma-em-movimento

# Instale as dependências
npm install

# Execute o servidor de desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

### Variáveis de Ambiente (Opcional)

Crie um arquivo `.env.local` na raiz do projeto:

```env
# Supabase (opcional - para autenticação e banco de dados)
NEXT_PUBLIC_SUPABASE_URL=sua_url_aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_aqui

# RapidAPI Doctor AI (opcional - para respostas médicas especializadas)
NEXT_PUBLIC_RAPIDAPI_KEY=sua_chave_rapidapi_aqui
```

**Nota:** O app funciona perfeitamente sem essas variáveis! Elas apenas adicionam funcionalidades extras.

---

## 🏗️ Estrutura do Projeto

```
calma-em-movimento/
├── src/
│   ├── app/
│   │   ├── components/          # Componentes React
│   │   │   ├── MedicoAmigo.tsx  # Chat com IA médica
│   │   │   ├── CrisisMode.tsx   # Modo crise
│   │   │   ├── Dashboard.tsx    # Tela principal
│   │   │   └── ...
│   │   ├── page.tsx             # Página principal
│   │   └── layout.tsx           # Layout global
│   ├── lib/
│   │   ├── supabase.ts          # Cliente Supabase
│   │   └── doctorAI.ts          # Integração API Doctor AI
│   └── ...
├── public/                      # Arquivos estáticos
├── package.json
└── README.md
```

---

## 🔧 Tecnologias Utilizadas

- **Next.js 15** - Framework React
- **React 19** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Tailwind CSS v4** - Estilização
- **Supabase** - Backend e autenticação (opcional)
- **Doctor AI API** - Respostas médicas especializadas (opcional)
- **Lucide Icons** - Ícones modernos

---

## 🎨 Funcionalidades da IA Médica

### API Doctor AI Integration
O Médico Amigo utiliza a API Doctor AI para fornecer:

- ✅ **Respostas especializadas** em psiquiatria e psicologia
- ✅ **Análise de sintomas** com níveis de severidade
- ✅ **Recomendações personalizadas** baseadas no contexto
- ✅ **Tradução automática** PT ↔ EN para maior precisão
- ✅ **Modo offline** com respostas empáticas locais

### Níveis de Severidade
1. **🟢 Baixo** - Suporte emocional e exercícios
2. **🟡 Médio** - Técnicas de respiração e aconselhamento
3. **🟠 Alto** - Recomendação de atendimento médico
4. **🔴 Emergência** - Ativação imediata de contatos de emergência

---

## 📱 Responsividade

O app é 100% responsivo e funciona perfeitamente em:
- 📱 Smartphones (iOS e Android)
- 💻 Tablets
- 🖥️ Desktops

---

## 🔒 Privacidade e Segurança

- ✅ Dados criptografados
- ✅ Autenticação segura via Supabase
- ✅ Conformidade com LGPD
- ✅ Modo offline disponível
- ✅ Nenhum dado compartilhado sem consentimento

---

## ⚠️ Aviso Importante

**Este aplicativo é uma ferramenta de suporte emocional e NÃO substitui atendimento médico profissional.**

Em caso de emergência ou sintomas graves:
- 🚨 Ligue **192** (SAMU)
- 🚨 Ligue **188** (CVV - Centro de Valorização da Vida)
- 🚨 Procure atendimento médico imediatamente

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:
1. Fazer um fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abrir um Pull Request

---

## 📞 Suporte

Para dúvidas ou suporte:
- 📧 Email: suporte@calmaemmovimento.com
- 💬 Issues: [GitHub Issues](https://github.com/seu-usuario/calma-em-movimento/issues)

---

## 🌟 Agradecimentos

Agradecimentos especiais a:
- **Doctor AI API** pela integração de IA médica
- **Supabase** pela infraestrutura backend
- **Vercel** pela hospedagem
- Todos os profissionais de saúde mental que inspiraram este projeto

---

**Desenvolvido com 💙 para ajudar pessoas a gerenciar ansiedade e bem-estar mental**
