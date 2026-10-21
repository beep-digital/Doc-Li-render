// Configuração da Central de Temas Beep.
// Tema novo: crie a pasta content/{plataforma}/{slug}/, registre o slug no
// _meta.js da plataforma e adicione uma entrada em TEMAS. Passo a passo no README.

export const SITE_NAME = 'Central de Temas Beep'
export const SITE_DESCRIPTION =
  'Manuais dos temas da Beep para Loja Integrada e Tray: instalação, configuração e dúvidas comuns.'

// Nome de exibição de cada plataforma. A chave é a pasta em content/.
export const PLATAFORMAS = {
  'loja-integrada': 'Loja Integrada',
  tray: 'Tray'
}

// status: 'disponivel' (manual completo) ou 'em-construcao' (manual sendo escrito)
export const TEMAS = [
  {
    plataforma: 'loja-integrada',
    slug: 'fast-store',
    nome: 'Fast Store',
    status: 'em-construcao',
    descricao: 'Tema para o novo renderizador da Loja Integrada. Tudo pelo painel da loja, sem código.'
  },
  {
    plataforma: 'loja-integrada',
    slug: 'royal',
    nome: 'Royal',
    status: 'disponivel',
    descricao: 'Tema configurado pelo painel Beep Theme e aplicado na loja com um código HTML.'
  }
]

export const STATUS_LABEL = {
  disponivel: 'Disponível',
  'em-construcao': 'Em construção'
}

export const temaHref = tema => `/${tema.plataforma}/${tema.slug}`

export const temaDaRota = pathname =>
  TEMAS.find(tema => pathname === temaHref(tema) || pathname.startsWith(`${temaHref(tema)}/`))
