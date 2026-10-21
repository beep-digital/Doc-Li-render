// Raiz da central. A home não aparece na sidebar; cada plataforma mostra os
// seus temas direto (display: 'children'), e cada tema é uma "page" isolada.
const semMoldura = {
  layout: 'full',
  sidebar: false,
  toc: false,
  breadcrumb: false,
  pagination: false,
  copyPage: false,
  timestamp: false
}

export default {
  index: { title: 'Início', display: 'hidden', theme: semMoldura },
  'loja-integrada': { title: 'Loja Integrada', display: 'children' }
}
