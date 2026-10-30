// Configuração da Central de Temas Beep.
// Tema novo: crie a pasta content/{plataforma}/{slug}/, registre o slug no
// _meta.js da plataforma e adicione uma entrada em TEMAS. Passo a passo no README.

export const SITE_NAME = 'Central de Temas Beep'
export const SITE_DESCRIPTION =
  'Manuais dos temas da Beep para Loja Integrada, Tray e WBuy: instalação, configuração e dúvidas comuns.'

// Nome de exibição de cada plataforma. A chave é a pasta em content/.
export const PLATAFORMAS = {
  'loja-integrada': 'Loja Integrada',
  tray: 'Tray',
  wbuy: 'WBuy'
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
  },
  {
    plataforma: 'loja-integrada',
    slug: 'top-store',
    nome: 'Top Store',
    status: 'disponivel',
    descricao: 'Tema configurado pelo painel Beep Theme e aplicado na loja com um código HTML.'
  },
  {
    plataforma: 'loja-integrada',
    slug: 'be',
    nome: 'Linha Be',
    status: 'disponivel',
    descricao: 'Tema instalado com códigos colados no Incluir código HTML da Loja Integrada, um para cada funcionalidade.'
  },
  {
    plataforma: 'loja-integrada',
    slug: 'evo',
    nome: 'EVO',
    status: 'em-construcao',
    descricao: 'Tema configurado no painel da Beep com um token e aplicado na loja com um código HTML.'
  },
  {
    plataforma: 'tray',
    slug: 'be',
    nome: 'Be',
    status: 'disponivel',
    descricao: 'Tema configurado pelo painel da Beep dentro da Tray: cores, banners, layout e recursos complementares.'
  },
  {
    plataforma: 'tray',
    slug: 'royal',
    nome: 'Royal',
    status: 'em-construcao',
    descricao: 'Tema configurado pelo painel da Beep dentro da Tray, com blog, depoimentos, timer de categoria e Instagram na home.'
  },
  {
    plataforma: 'tray',
    slug: 'pro',
    nome: 'Pro',
    status: 'em-construcao',
    descricao: 'Tema configurado pelo painel da Beep dentro da Tray, com melhores categorias e melhores escolhas na home.'
  },
  {
    plataforma: 'tray',
    slug: 'top-store',
    nome: 'Top Store',
    status: 'em-construcao',
    descricao: 'Tema configurado pelo painel da Beep dentro da Tray: logo, cores e banners com tamanhos e gabarito.'
  },
  {
    plataforma: 'tray',
    slug: 'essential',
    nome: 'Essential',
    status: 'em-construcao',
    descricao: 'Tema configurado pelo painel da Beep dentro da Tray, com avisos de maior idade e cookies, blog, depoimentos e YouTube na home.'
  },
  {
    plataforma: 'wbuy',
    slug: 'top-store',
    nome: 'Top Store',
    status: 'em-construcao',
    descricao: 'Tema configurado pelo próprio painel da WBuy: banners, tarjas e redes sociais em Marketing, cores e fontes em Temas.'
  }
]

export const STATUS_LABEL = {
  disponivel: 'Disponível',
  'em-construcao': 'Em construção'
}

export const temaHref = tema => `/${tema.plataforma}/${tema.slug}`

export const temaDaRota = pathname =>
  TEMAS.find(tema => pathname === temaHref(tema) || pathname.startsWith(`${temaHref(tema)}/`))
