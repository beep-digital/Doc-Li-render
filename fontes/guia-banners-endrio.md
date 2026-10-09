# Guia de banners (fonte original — Endrio)

> Material de referência. Escrito originalmente para a loja Seiva Cosméticos, que usa este tema.
> Na documentação, tratar como comportamento do **tema**, nunca citar a loja Seiva.

## Padrão de nomes (travado)

Padrão de nomes de banner travado, para o cliente não errar a chave e o elemento sumir da loja.

- Full banner e mini banners: só a categoria. O mobile vem junto.
- Dupla de vitrine: cadastra em mini banner, nome começa com `vitrine`.
- Banner central: mini banner, nome começa com `central` (ex.: central banner 01).
- Tarja de benefícios: nome com `tarja informativa`, o texto vai no título do banner.
- Ícone de categoria: `slide categoria`, o texto de baixo vai no título do banner.

Regra geral: todo texto editável vai no título do banner, nunca no nome.

## FAQ

O tema monta o FAQ a partir de uma página de conteúdo chamada "FAQ". A Beep entrega um modelo HTML. O cliente cria a página, cola o modelo no código-fonte e troca as perguntas e respostas.

## Guia de banners (versão Seiva)

**Antes de começar: o nome do banner decide onde ele aparece.** O painel da Loja Integrada oferece poucas posições de banner, e a loja usa mais espaços do que isso. Alguns espaços dividem a mesma posição e o site separa os banners pelo nome do cadastro. Três blocos diferentes da página inicial usam a posição "Mini banner"; o que define o destino é uma palavra no nome — Vitrine, Central, ou nenhuma delas.

1. **Banner principal** — topo da home, abaixo do menu, rodízio. 1920×700; celular 768×768 (campo de imagem para celular). Posição Fullbanner. Nome livre. Sem limite (recomendado 3 a 5).
2. **Trio de mini banners** — três lado a lado; no celular viram carrossel. 410×500. Posição Mini banner. Nome sem Vitrine nem Central. Quantidade 3.
3. **Dupla pós-vitrine** — dois banners grandes após a vitrine. 632×672. Mini banner. Nome contém Vitrine (ex.: Vitrine Banner 01). Quantidade 2. Atenção: quase quadrado, mas não é; imagem quadrada perde faixa em cima e embaixo.
4. *(numeração pulada no original)*
5. **Banner central** — faixa larga única abaixo da segunda vitrine. 1280×500; celular 500×790. Mini banner. Nome contém Central (ex.: Central Banner 01). Exatamente 1. Atenção: único com limite rígido — com mais de um, só o primeiro aparece, sem aviso. Único em que o celular muda de deitado para em pé; sem imagem de celular, fica cortado nas laterais.
6. **Tarja de benefícios** — abaixo do banner principal, ícone + frase curta. 4 lado a lado no computador; um por vez no celular. 120×120, PNG transparente (só o ícone). Posição Tarja. Nome contém Tarja Informativa. Quantidade 4. A frase vem do campo **texto alternativo**; cada quebra de linha vira uma linha na tela.
7. **Ícones de categoria** — faixa "Compre por categoria", ícones redondos com nome embaixo. 240×240, PNG transparente. Posição Tarja. Nome contém Slide Categoria (ex.: Slide Categoria Óleos Essenciais). 7 cabem no computador sem rolar; mais de 7 vira carrossel com bolinhas. Imagem = ícone; texto alternativo = nome embaixo; link = categoria. Ícone fica num círculo colorido — deixar folga.
8. **Vitrine destaque (slide)** — antes do FAQ ou do rodapé. 632×672. Posição Vitrine. Nome: Banner Vitrine. Mínimo 3.

> Divergência a resolver: o padrão de nomes fala em "título do banner"; o guia Seiva fala em "texto alternativo".

## FAQ — estrutura real (recebida em 09/10/2026)

`div.container > h2` + `div.accordion > div.accordion-item > button[aria-expanded="false"][id="accordion-button-N"] + div.accordion-content > p`. O original tinha 19 perguntas da Seiva; na documentação foi resumido para 3 com lorem ipsum.
