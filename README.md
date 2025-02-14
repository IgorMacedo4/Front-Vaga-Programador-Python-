# Front-End para Web Content Analyzer

Este projeto é a interface de usuário do **Web Content Analyzer**, uma aplicação demonstrativa que evidencia habilidades em automação web, integração avançada com IA (utilizando o modelo Gemini da Google Generative AI) e engenharia de dados.  
A interface foi desenvolvida em **React** com **Vite** e **Tailwind CSS**, e interage com uma API em Flask hospedada na Render para extrair, analisar e salvar o conteúdo textual de páginas web.

---

## 📌 Visão Geral

A aplicação permite que o usuário:

✅ **Insira uma URL:** Valida e envia a URL para o back-end.  
✅ **Analise uma Página Web:** O back-end extrai o conteúdo textual limpo da página, gera um resumo (**snippet**) e apresenta métricas da estrutura do site.  
✅ **Interaja com um Chat Baseado em IA:** Faça perguntas sobre o conteúdo extraído ou utilize as sugestões geradas pelo modelo **Gemini**, que são apresentadas como botões interativos.  
✅ **Salve o Conteúdo Extraído:** Baixe o conteúdo textual limpo em vários formatos (**TXT, CSV, PDF, JSON**) diretamente pelo chat.

---

## 🚀 Funcionalidades

- **💡 Interface Interativa:** Layout moderno com divisão em duas colunas – à esquerda, exibição da análise e sugestões; à direita, a área de chat com scroll interno.
- **🔗 Integração com API:** Comunicação com o servidor (hospedado na Render) para validação, análise, resposta do modelo Gemini e download do conteúdo.
- **🎨 Feedback Visual:** Mensagens do chat, botões interativos para sugestões e opções de download, e rolagem automática para sempre mostrar as últimas mensagens.
- **🔧 Configuração via Variáveis de Ambiente:** Utiliza a variável de ambiente `VITE_API_URL` para definir a URL base da API.

---

## 🛠️ Tecnologias Utilizadas

- **⚛️ React** – Biblioteca para criação de interfaces de usuário.
- **⚡ Vite** – Ferramenta de build e desenvolvimento para projetos modernos.
- **🎨 Tailwind CSS** – Framework CSS para um design responsivo e customizado.
- **📜 JavaScript (ESM)** – Utilização de módulos ECMAScript.
- **🔄 Fetch API** – Para comunicação com o back-end via HTTP.

---

## 📥 Instalação e Execução

### 1️⃣ Clone o Repositório
```bash
git clone https://github.com/IgorMacedo4/Front-Vaga-Programador-Python-.git
cd Front-Vaga-Programador-Python-
```

### 2️⃣ Instale as Dependências
Utilize o gerenciador de pacotes de sua preferência (**npm, yarn, ou pnpm**):
```bash
npm install
```

### 3️⃣ Configuração de Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto (se necessário) e defina a variável de ambiente para a API:
```env
VITE_API_URL=https://server-vaga-programador-python.onrender.com
```

### 4️⃣ Executando em Desenvolvimento
Para iniciar o servidor de desenvolvimento:
```bash
npm run dev
```
A aplicação estará disponível em **http://localhost:5173**.

### 5️⃣ Build para Produção
Para gerar a versão otimizada do projeto, execute:
```bash
npm run build
```
Em seguida, para testar a versão de preview localmente:
```bash
npm run preview
```

---

## 📡 Deploy na Vercel

Este projeto já está configurado para **deploy na Vercel**. O arquivo `vercel.json` redireciona todas as requisições para `index.html`, permitindo que sua SPA gerencie o roteamento.  
Confira o `vercel.json`:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```
Além disso, o `vite.config.ts` está configurado para desenvolvimento e build:
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
    sourcemap: true
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
```
📌 **Nota:** Em produção, as requisições à API utilizarão a variável de ambiente `VITE_API_URL`.

O projeto está disponível em produção na Vercel:  
🔗 **https://front-vaga-programador-python.vercel.app/**

---

## 📢 Considerações Finais

Esta interface demonstra a integração de técnicas modernas de **front-end** (**React, Vite, Tailwind CSS**) com um **back-end** robusto para análise e extração de conteúdo web, combinando **automação, IA e engenharia de dados**.

📌 **Desenvolvido por Igor Macedo** para a vaga de **Programador(a) Python** com experiência avançada em IA.  
📩 Este demonstrativo foi enviado exclusivamente para **thomas.maia@abladvogados.com**.

---

## 🎯 Como Utilizar

1️⃣ **Clone o repositório** e instale as dependências conforme as instruções acima.  
2️⃣ **Configure a variável de ambiente** `VITE_API_URL` para apontar para o seu servidor (por exemplo, `https://server-vaga-programador-python.onrender.com`).  
3️⃣ **Execute em desenvolvimento** ou **faça o build para produção** e interaja com a aplicação.  

---

🔹 **Este README.md oferece uma visão completa do projeto, com instruções detalhadas para instalação e execução.** 🚀

