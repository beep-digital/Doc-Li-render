import { Footer, LastUpdated, Layout, Navbar } from 'nextra-theme-docs'
import { Head, Search } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import { Instrument_Sans, JetBrains_Mono } from 'next/font/google'
import 'nextra-theme-docs/style.css'
import './globals.css'
import { SeletorDeTema } from '../components/seletor-de-tema'
import { SITE_DESCRIPTION, SITE_NAME } from '../theme.config'

// Fontes do manual de marca v1: Instrument Sans para ler, JetBrains Mono para detalhe.
const sans = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-beep-sans',
  display: 'swap'
})
const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['500'],
  variable: '--font-beep-mono',
  display: 'swap'
})

export const metadata = {
  title: { default: SITE_NAME, template: `%s · ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  icons: { icon: '/favicon.svg' }
}

// Cor primária do Nextra (links, item ativo da sidebar).
// Claro: sinal-texto #0A7344 (legível sobre paper). Escuro: sinal #1BD47E.
const primaryColor = {
  hue: { light: 153, dark: 152 },
  saturation: { light: 84, dark: 77 },
  lightness: { light: 25, dark: 47 }
}
const backgroundColor = { light: '#F6F4EF', dark: '#14161A' }

const navbar = (
  <Navbar
    logo={
      <span className="beep-marca">
        <span className="beep-logo">
          beep<span className="beep-dot" aria-hidden="true" />
        </span>
        <span className="beep-marca__nome">Central de temas</span>
      </span>
    }
    logoLink="/"
  >
    <SeletorDeTema />
  </Navbar>
)

const footer = (
  <Footer>
    <span className="rodape">
      {new Date().getFullYear()} © Beep Digital · Você cuida do negócio. A gente faz funcionar.
    </span>
  </Footer>
)

export default async function RootLayout({ children }) {
  return (
    <html
      lang="pt-BR"
      dir="ltr"
      suppressHydrationWarning
      className={`${sans.variable} ${mono.variable}`}
    >
      <Head color={primaryColor} backgroundColor={backgroundColor} />
      <body>
        <Layout
          navbar={navbar}
          pageMap={await getPageMap()}
          footer={footer}
          editLink={null}
          copyPageButton={false}
          lastUpdated={<LastUpdated locale="pt-BR">Atualizado em</LastUpdated>}
          feedback={{ content: null }}
          sidebar={{ defaultMenuCollapseLevel: 1 }}
          toc={{ title: 'Nesta página', backToTop: 'Voltar ao topo' }}
          search={
            <Search
              placeholder="Buscar nos manuais"
              emptyResult="Nada encontrado."
              errorText="Não foi possível carregar a busca."
              loading="Buscando..."
            />
          }
          themeSwitch={{ dark: 'Escuro', light: 'Claro', system: 'Sistema' }}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
