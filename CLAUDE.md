# Central de Temas Beep

Site de documentação (Nextra 4 + Next.js 16, App Router, busca Pagefind) com os manuais de **todos os temas da Beep Digital**: Loja Integrada, Tray e o que vier. Um site só: uma identidade, um deploy, uma busca. Tema novo é pasta nova.

A documentação é escrita pela IA a partir das fontes (manual antigo, transcrição, guia da equipe). A equipe dita o que o código do tema não mostra (comportamento do painel da plataforma, tamanhos de imagem, armadilhas).

## Estrutura

```
content/
  _meta.js                      raiz: home oculta da sidebar + plataformas com display: 'children'
  index.mdx                     home: cards por plataforma (components/home-temas.jsx)
  {plataforma}/
    _meta.js                    um item type: 'page' por tema
    {tema}/
      _meta.js                  sidebar do tema
      index.mdx                 introdução do tema
      ...                       páginas do manual
      interno/                  oculto (display: 'hidden'): pendências e notas da equipe
public/images/{plataforma}/{tema}/   prints do manual
components/
  seletor-de-tema.jsx           select "Tema: X (Plataforma)" na navbar
  home-temas.jsx                home da central
theme.config.js                 SITE_NAME, PLATAFORMAS e a lista TEMAS
fontes/                         material bruto, não publicado
```

Rotas: `/{plataforma}/{tema}/...`. Hoje: `/loja-integrada/fast-store/...` e `/loja-integrada/royal/...`.

**Por que funciona:** cada tema é `type: 'page'` no `_meta.js` da plataforma. O Nextra isola a sidebar e a paginação (anterior/próxima) dentro do tema aberto. A plataforma usa `display: 'children'` na raiz, então não vira um nível a mais na sidebar.

## Como adicionar um tema novo

1. **Pasta:** crie `content/{plataforma}/{slug}/` com `_meta.js`, `index.mdx` e `interno/` (com `_meta.js` e `pendencias.mdx`). Copie a estrutura de `content/loja-integrada/royal/`.
2. **Plataforma nova?** Crie `content/{plataforma}/_meta.js` e registre a plataforma em `content/_meta.js` com `{ title: 'Nome', display: 'children' }`. Adicione o nome em `PLATAFORMAS` no `theme.config.js`.
3. **Registre o tema** no `content/{plataforma}/_meta.js`: `slug: { type: 'page', title: 'Nome do tema' }`.
4. **Adicione em `TEMAS`** no `theme.config.js`: `{ plataforma, slug, nome, status, descricao }`. `status` é `disponivel` ou `em-construcao`. A home e o seletor leem daqui.
5. **Imagens** em `public/images/{plataforma}/{slug}/`, com nome que diz o que mostram (`header-cor-fundo.webp`).
6. Rode `npm run build` (confere links, gera a busca) e `npm run dev`.

### Migrar um manual antigo (PDF exportado do Google Docs)

Foi assim com o Royal (21/10/2026):

1. Extraia o texto por página com `pypdf` (cada palavra pode vir numa linha: junte).
2. Extraia as imagens com `pypdf` (`page.images`), na ordem da página. Descarte repetidas por hash (o logo do cabeçalho vem em toda página) e a capa. Converta para webp (Pillow, qualidade 88, largura máxima 1600).
3. Monte uma folha de contato com as imagens para ver o que cada uma mostra e casar com o texto da página.
4. Reorganize o manual linear em páginas: Introdução, Primeiros passos, Como o painel funciona, uma página por componente ou funcionalidade, Salvar/publicar.
5. "Clique aqui" do manual vira link para a página certa.
6. O que estiver confuso no original: escreva o mínimo e registre em `interno/pendencias.mdx`.

## Regras de escrita

- Público: **lojista leigo**. Português do Brasil, frases curtas, passo a passo, sem jargão técnico.
- **Nunca use travessão.** Ponto, vírgula, dois pontos e parênteses resolvem.
- Documentar o **tema**, nunca uma loja específica (o guia do Fast Store foi feito para a Seiva: não citar Seiva ou Dantas nas páginas públicas).
- Não inventar comportamento. Quando algo não está confirmado na fonte, escreva o mínimo, deixe `{/* TODO: ... */}` no MDX e registre nas pendências do tema (`interno/`).
- Palavras-chave de nome sempre em `código` e com a grafia exata.
- Componentes: `Callout`, `Steps`, `Cards`, `Tabs` de `nextra/components`. Imagem: `![descrição](/images/{plataforma}/{tema}/arquivo.webp)`.
- Links internos sempre com o caminho completo: `/loja-integrada/royal/componentes/tema`.

### Fast Store (`content/loja-integrada/fast-store/`)

- `banners/` tem um arquivo por espaço de banner. `referencia-rapida.mdx` resume tudo numa tabela: **mantenha as duas em sincronia**.
- Cada página de banner segue: "Onde aparece", tabela (posição, nome, imagem, quantidade), passo a passo, callouts de atenção.
- Regra central do tema: **o nome decide o lugar; todo texto vai no título do banner, nunca no nome.**
- Pendências: `interno/decisoes-e-pendencias.mdx`.

### Royal (`content/loja-integrada/royal/`)

- Configurado no painel Beep Theme (`painel.beeptheme.com.br`) e levado para a loja colando o código **Plugins** em Incluir código HTML da Loja Integrada.
- Pendências: `interno/pendencias.mdx`.

## Comandos

- `npm run dev`: servidor local em http://localhost:3000
- `npm run build`: build de produção + índice de busca (Pagefind, no `postbuild`). A busca só funciona depois do build.

## Identidade visual (manual de marca Beep v1)

- Paleta: paper `#F6F4EF` (fundo claro), ink `#14161A` (texto e fundo escuro), graphite `#24272C`, sand `#E9E5DC`, sinal `#1BD47E` (só preenchimento: ponto do logo, ponto aceso), sinal-texto `#0A7344` (verde quando é texto).
- Sem azul, sem gradiente, sem segunda cor. O callout `info` do Nextra é sobrescrito para sand.
- Fontes: Instrument Sans (tudo que se lê) e JetBrains Mono (rótulos em caixa alta), via `next/font/google` em `app/layout.jsx`.
- Cor primária do Nextra em `app/layout.jsx` (`<Head color>`): sinal-texto no claro, sinal no escuro. Tokens e estilos em `app/globals.css`.
- Logo: texto "beep" + ponto verde em HTML/CSS (nunca o logo antigo). Favicon: `public/favicon.svg`.
- Páginas de manual sem animação. A home tem uma única: a grade de pontos aparece e um ponto acende (desligada com `prefers-reduced-motion`).
