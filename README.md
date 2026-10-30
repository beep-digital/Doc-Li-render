# Central de Temas Beep

Manuais de instalação e configuração dos temas da Beep Digital (Loja Integrada, Tray e WBuy). Site feito com [Nextra](https://nextra.site).

## Rodar localmente

```bash
npm install
npm run dev
```

Abra http://localhost:3000. A busca só funciona depois de `npm run build`.

## Temas

| Plataforma | Tema | Pasta | Pendências |
| --- | --- | --- | --- |
| Loja Integrada | Fast Store | `content/loja-integrada/fast-store/` | `/loja-integrada/fast-store/interno/decisoes-e-pendencias` |
| Loja Integrada | Linha Be | `content/loja-integrada/be/` | `/loja-integrada/be/interno/pendencias` |
| Loja Integrada | EVO | `content/loja-integrada/evo/` | `/loja-integrada/evo/interno/pendencias` |
| Loja Integrada | Royal | `content/loja-integrada/royal/` | `/loja-integrada/royal/interno/pendencias` |
| Loja Integrada | Top Store | `content/loja-integrada/top-store/` | `/loja-integrada/top-store/interno/pendencias` |
| Tray | Be | `content/tray/be/` | `/tray/be/interno/pendencias` |
| Tray | Royal | `content/tray/royal/` | `/tray/royal/interno/pendencias` |
| Tray | Pro | `content/tray/pro/` | `/tray/pro/interno/pendencias` |
| Tray | Top Store | `content/tray/top-store/` | `/tray/top-store/interno/pendencias` |
| Tray | Essential | `content/tray/essential/` | `/tray/essential/interno/pendencias` |
| WBuy | Top Store | `content/wbuy/top-store/` | `/wbuy/top-store/interno/pendencias` |

As páginas `interno/` não aparecem no menu nem na busca.

## Sem manual no Drive

Estes temas existem, mas não há manual para o lojista nem no Drive (só layout, arquivos de dev ou nada) nem na central de ajuda antiga (`help.beeptheme.com.br`). Não entram na central até alguém escrever o manual:

- Bagy (V1 - Be: só layouts das réplicas)
- VTEX (V1: só design, XD e telas)
- Shopify
- Nuvemshop

O Top Store e o Essential da Tray não têm manual no Drive: as páginas deles vieram da central de ajuda antiga (`help.beeptheme.com.br`) e ainda estão incompletas.


## Adicionar um tema

1. Crie `content/{plataforma}/{tema}/` (copie a estrutura do Royal: `_meta.js`, `index.mdx`, `interno/`).
2. Registre o tema em `content/{plataforma}/_meta.js` com `type: 'page'`.
3. Adicione o tema em `TEMAS` no `theme.config.js`. A home e o seletor de tema leem dali.
4. Plataforma nova: crie `content/{plataforma}/_meta.js`, registre em `content/_meta.js` com `display: 'children'` e adicione em `PLATAFORMAS` no `theme.config.js`.
5. Imagens em `public/images/{plataforma}/{tema}/`.

Detalhes, regras de escrita e o roteiro para migrar um manual antigo em PDF estão no `CLAUDE.md`. O jeito recomendado de atualizar é abrir o Claude Code nesta pasta e pedir a mudança.
