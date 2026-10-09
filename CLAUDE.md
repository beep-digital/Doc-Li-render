# Documentação do tema Beep — novo renderizador da Loja Integrada

Site de documentação (Nextra 4 + Next.js, App Router) do tema da Beep Digital para o **novo renderizador da Loja Integrada (LI)**. A documentação é escrita pela IA a partir das fontes em `fontes/`; a equipe dita o que o código do tema não mostra (comportamento do painel da LI, tamanhos de imagem, armadilhas).

## Estrutura

- `content/` — páginas em MDX. A navegação vem dos `_meta.js` de cada pasta.
  - `banners/` — um arquivo por espaço de banner. `referencia-rapida.mdx` resume tudo numa tabela: **mantenha as duas em sincronia**.
  - `interno/` — oculto no menu (`display: 'hidden'`). `decisoes-e-pendencias.mdx` é a lista viva de pendências.
- `fontes/` — material bruto (transcrições resumidas, guias do Endrio). Não é publicado. Novas transcrições vão em `fontes/reunioes/AAAA-MM-DD-assunto.md`.
- `theme.config.js` — nome do tema (`THEME_NAME`). O nome comercial ainda não foi definido; troque só aqui.
- `public/images/` — prints. Ainda vazio.

## Regras de escrita

- Público: **lojista leigo**. Português do Brasil, frases curtas, passo a passo, sem jargão técnico.
- Documentar o **tema**, nunca uma loja específica (o guia original foi feito para a Seiva — não citar Seiva/Dantas nas páginas públicas).
- Cada página de banner segue o formato: "Onde aparece" → tabela (posição, nome, imagem, quantidade) → passo a passo → callouts de atenção.
- Palavras-chave de nome sempre em `código` e com a grafia exata.
- Regra central do tema: **o nome decide o lugar; todo texto vai no título do banner, nunca no nome.**
- Não inventar comportamento. Quando algo não estiver confirmado nas fontes, escreva o mínimo, deixe `{/* TODO: ... */}` no MDX e registre em `content/interno/decisoes-e-pendencias.mdx`.
- Componentes disponíveis: `Callout`, `Steps`, `Cards`, `Tabs` de `nextra/components`.

## Comandos

- `npm run dev` — servidor local em http://localhost:3000
- `npm run build` — build de produção + índice de busca (Pagefind, no `postbuild`)

## Identidade visual

- Cor principal: `#ff4a9d` (HSL 332/100/64), aplicada em `app/layout.jsx` (`<Head color>`) e nos títulos via `app/globals.css`.
- Logo: `public/logo-beep-theme.svg` (também usado como favicon).
- Prints do painel ficam em `public/images/<assunto>/` e entram no MDX com `![descrição](/images/...)`.
