# Catálogo EMI — Edições Multimédia Interativas 2026

Este repositório contém o projeto desenvolvido como parte do trabalho da **Prova Prática do Exame de Edições Multimédia Interativas 2026** (EMI). 

O **Catálogo EMI** é uma aplicação web interativa de alto desempenho e totalmente acessível, desenvolvida com **React, TypeScript, Vite e Tailwind CSS**, projetada com foco nas diretrizes modernas de acessibilidade do utilizador (WCAG AA/AAA) e design de interface refinado.

---

## 📸 Conceito e Contexto do Projeto

O objetivo deste projeto é demonstrar a implementação de um ecossistema multimédia interativo completo, focado na carga assíncrona de dados estruturados (catálogo de filmes em formato JSON) e na inclusão digital absoluta através de recursos de acessibilidade nativos e controláveis por painel dedicado.

---

## ⚡ Principais Funcionalidades

### 1. 🔍 Navegação & Carga Assíncrona Inteligente
*   **Pesquisa Dinâmica Multicritério:** Pesquise instantaneamente por títulos, realizadores (diretores), ou elenco principal com feedback instantâneo de desempenho.
*   **Filtros Avançados:** Filtre o catálogo por género cinematográfico ou através do ano de lançamento exato.
*   **Ordenação e Feedback em Tempo Real:** Contador de resultados em tempo real com anúncios amigáveis para leitores de ecrã (através do atributo `aria-live="polite"`).

### 2. 🎙️ Comando e Pesquisa por Voz (Acessibilidade Avançada)
*   Integração nativa com a API de reconhecimento de voz do navegador (**SpeechRecognition**).
*   Permite pesquisar filmes, limpar filtros, ou navegar na aplicação utilizando comandos por voz.
*   Feedback de registo visual dos comandos falados no ecrã para melhor orientação do utilizador.

### 3. ♿ Painel de Acessibilidade Personalizado
Um painel completo, controlável através do teclado, que permite adaptar a experiência às necessidades visuais e auditivas de cada utilizador:
*   **5 Temas Visuais Adaptativos:**
    *   `Default Dark`: Visual escuro minimalista moderno com alta legibilidade.
    *   `Alto Contraste Escuro (Dark)`: Combinação de Preto e Amarelo ideal para utilizadores com visão reduzida.
    *   `Alto Contraste Claro (Light)`: Cores invertidas de alto contraste (Preto e Branco puro).
    *   `Escala de Cinzentos (Grayscale)`: Experiência focada no contraste de brilhos.
    *   `Sépia`: Tons quentes e suaves para evitar a fadiga visual.
*   **Controlo de Tamanho de Letra:** Três níveis ajustáveis (Normal, Grande, Extra Grande) com redimensionamento fluido de toda a estrutura do catálogo.
*   **Modo de Dislexia:** Ativação de tipografia otimizada para utilizadores com características disléxicas para melhorar a velocidade de leitura.
*   **Velocidade de Narração:** Ajuste fino da voz do assistente de áudio (de 0.5x até 2.0x).

### 4. 📄 Página de Detalhe de Filme com Narração (TTS)
*   Ficha técnica cinematográfica completa em ecrã inteiro ao selecionar qualquer título.
*   Pôster oficial, pontuação da crítica detalhada (**IMDb** e **Metascore**), barra de progresso adaptativa WCAG, prémios e indicações obtidas, estúdio de produção, bilheteira e sinopse do filme.
*   **Motor de Síntese de Áudio (Text-to-Speech):** Um botão de áudio inteligente que narra todos os detalhes do filme em voz alta (com suporte bilingue inteligente com base no idioma ativo).

### 5. 📊 Painel Estatístico Interativo (Dashboard)
*   **Indicadores de Performance (KPIs):** Total de filmes, pontuação média das avaliações, género mais comum e o ano de lançamento do filme mais antigo.
*   **Gráficos Interativos Dinâmicos:** 
    *   Distribuição de Filmes por Género.
    *   Avaliação Média dos Filmes por Década de Lançamento.
*   Os gráficos respondem perfeitamente aos temas visuais selecionados e fornecem legendas acessíveis via teclado para navegação por leitores de ecrã.

### 6. 🌐 Suporte Bilingue Nativo (Internacionalização)
*   Alternância instantânea de idioma entre **Português** e **Inglês** em toda a interface do catálogo e painéis de estatísticas/acessibilidade.

---

## 🛠️ Tecnologias Utilizadas

A stack tecnológica foi selecionada para garantir velocidade, tipagem estática robusta, acessibilidade e modularidade de código:

*   **React 18** — Desenvolvimento baseado em componentes funcionais e hooks reativos.
*   **Vite** — Tooling ultra-rápido para o empacotamento e desenvolvimento frontend.
*   **TypeScript** — Tipagem forte para prevenção de erros em tempo de desenvolvimento.
*   **Tailwind CSS** — Framework utilitário de CSS que assegura consistência visual e design responsivo perfeito (Desktop-First e Mobile-First).
*   **Lucide React** — Biblioteca moderna de ícones vetoriais de alta resolução.

---

## 📂 Estrutura de Ficheiros

```text
src/
├── components/
│   ├── AccessibilityPanel.tsx      # Painel lateral para adaptação de acessibilidade
│   ├── MovieCard.tsx               # Cartão individual do catálogo com foco acessível
│   ├── MovieDetailPage.tsx         # Página de detalhes profundos com narração (TTS)
│   └── StatisticsDashboard.tsx     # Dashboard estatístico com gráficos acessíveis
├── types.ts                        # Definições de tipos TypeScript globais
├── App.tsx                         # Core reativo e estado mestre da aplicação
├── index.css                       # Configuração global de fontes e Tailwind CSS
└── main.tsx                        # Ponto de entrada do React
```

---

## 🚀 Como Executar o Projeto Localmente

Siga os passos abaixo para clonar e rodar o projeto em ambiente de desenvolvimento local:

### 1. Instalar as dependências
```bash
npm install
```

### 2. Executar em modo de desenvolvimento
```bash
npm run dev
```
A aplicação estará disponível por padrão em `http://localhost:3000` (ou na porta configurada pelo Vite).

### 3. Compilar para produção
```bash
npm run build
```
Os ficheiros estáticos prontos para publicação estarão gerados na pasta `dist/`.

---

## 🌟 Compromisso com a Acessibilidade (WCAG)

Este trabalho foi concebido visando os critérios de sucesso do **Web Content Accessibility Guidelines (WCAG 2.1)**:
*   **Percetível:** Alternativa em texto para conteúdos não-textuais (pôsteres) e temas de alto contraste.
*   **Operável:** Toda a aplicação é navegável utilizando apenas o teclado (suporte completo a `tabindex`, focos visuais claros, atalhos e tecla de escape).
*   **Compreensível:** Layout limpo, instruções visuais explícitas e suporte bilingue completo.
*   **Robusto:** Utilização correta de atributos de acessibilidade (WAI-ARIA) para garantir compatibilidade com tecnologias de apoio (como leitores de ecrã).

---

*Trabalho desenvolvido no âmbito da Unidade Curricular de **Edições Multimédia Interativas 2026**.*
