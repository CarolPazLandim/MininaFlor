# 🌸 Bloom & Co. — Floricultura & Presentes Especiais

Landing page e-commerce moderna, elegante e responsiva para floricultura especializada em flores nobres, buquês autorais, cestas gourmet e presentes afetivos com entrega expressa no mesmo dia.

Construído com **React 19**, **Vite**, **TypeScript** e **Tailwind CSS v4**.

---

## 🚀 Como Executar Localmente

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn

### Instalação e Execução
```bash
# 1. Instalar as dependências do projeto
npm install

# 2. Iniciar o servidor de desenvolvimento
npm run dev

# O app estará disponível em: http://localhost:3000
```

### Build de Produção
```bash
# Gerar a pasta otimizada /dist
npm run build

# Pré-visualizar o build localmente
npm run preview
```

---

## 🐙 Como Publicar no GitHub

Siga os passos abaixo no terminal do seu computador para subir este projeto em um novo repositório no GitHub:

1. **Crie um repositório no GitHub:**
   - Acesse [github.com/new](https://github.com/new)
   - Escolha um nome (ex: `bloom-and-co-floricultura`)
   - Deixe o repositório como **Público** (ou Privado)
   - **Não** marque a opção de adicionar README ou .gitignore (eles já existem no projeto)
   - Clique em **Create repository**

2. **No terminal do seu projeto, execute:**
```bash
# Iniciar o repositório git local
git init

# Adicionar todos os arquivos
git add .

# Criar o primeiro commit
git commit -m "feat: landing page completa Bloom & Co para flores e presentes"

# Renomear a branch principal para main
git branch -M main

# Conectar com seu repositório remoto (substitua com a sua URL do GitHub)
git remote add origin https://github.com/SEU-USUARIO/bloom-and-co-floricultura.git

# Enviar os arquivos para o GitHub
git push -u origin main
```

---

## 🌐 Como Publicar no Netlify

O projeto já está **100% configurado** com o arquivo `netlify.toml` e o `public/_redirects` para roteamento SPA.

### Opção 1: Conectar pelo GitHub (Recomendado — Deploy Contínuo)
1. Acesse [app.netlify.com](https://app.netlify.com) e faça login.
2. Clique em **Add new site** > **Import an existing project**.
3. Selecione **GitHub** e autorize o Netlify.
4. Escolha o repositório `bloom-and-co-floricultura`.
5. O Netlify detectará automaticamente as configurações definidas no `netlify.toml`:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
6. Clique em **Deploy site**.
7. Pronto! Em menos de 1 minuto seu site estará online com HTTPS gratuito e atualizações automáticas a cada `git push`.

---

### Opção 2: Deploy Direto via Netlify CLI
Caso queira publicar direto pelo terminal sem passar pelo painel:
```bash
# Gerar a pasta de produção
npm run build

# Publicar em produção no Netlify
npx netlify-cli deploy --prod --dir=dist
```

---

### Opção 3: Netlify Drop (Arrastar e Soltar)
1. Execute `npm run build` no seu terminal.
2. Acesse [app.netlify.com/drop](https://app.netlify.com/drop).
3. Arraste a pasta `dist` gerada para a janela do navegador.
4. Seu site estará publicado instantaneamente.

---

## 📁 Estrutura de Arquivos Principais

- `netlify.toml` — Configuração de build, diretório de publicação `dist`, regras de redirecionamento SPA e cabeçalhos de cache/segurança.
- `public/_redirects` — Fallback para SPA no Netlify (`/*  /index.html  200`).
- `public/images/` — Imagens em alta resolução dos buquês, rosas, caixas de presente e cestas.
- `src/components/` — Componentes modulares da landing page (Hero, Ocasiões, Categorias, Mais Vendidos, Banner Express, Diferenciais, Avaliações, Footer, CartDrawer, QuickViewModal, CheckoutModal, CustomKitModal).
- `src/data/products.ts` — Catálogo de produtos, ocasiões, mimos e depoimentos.
- `src/context/ShopContext.tsx` — Estado global de sacola, favoritos, data/horário de entrega e checkout.

---

Desenvolvido para proporcionar uma experiência de compra delicada, sofisticada e emocional. 🌿
