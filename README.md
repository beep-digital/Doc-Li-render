# Central de Temas Beep

Manuais de instalação e configuração dos temas da Beep Digital (Loja Integrada, Tray). Site feito com [Nextra](https://nextra.site).

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
| Loja Integrada | Royal | `content/loja-integrada/royal/` | `/loja-integrada/royal/interno/pendencias` |

As páginas `interno/` não aparecem no menu.

## Adicionar um tema

1. Crie `content/{plataforma}/{tema}/` (copie a estrutura do Royal: `_meta.js`, `index.mdx`, `interno/`).
2. Registre o tema em `content/{plataforma}/_meta.js` com `type: 'page'`.
3. Adicione o tema em `TEMAS` no `theme.config.js`. A home e o seletor de tema leem dali.
4. Plataforma nova: crie `content/{plataforma}/_meta.js`, registre em `content/_meta.js` com `display: 'children'` e adicione em `PLATAFORMAS` no `theme.config.js`.
5. Imagens em `public/images/{plataforma}/{tema}/`.

Detalhes, regras de escrita e o roteiro para migrar um manual antigo em PDF estão no `CLAUDE.md`. O jeito recomendado de atualizar é abrir o Claude Code nesta pasta e pedir a mudança.
