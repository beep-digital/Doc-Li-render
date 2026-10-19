import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Banner, Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import './globals.css'
import { SITE_DESCRIPTION, SITE_TITLE, THEME_NAME } from '../theme.config'

export const metadata = {
  title: { default: SITE_TITLE, template: `%s — ${THEME_NAME}` },
  description: SITE_DESCRIPTION,
  icons: { icon: '/logo-beep-theme.svg' }
}

// #ff4a9d em HSL = 332°, 100%, 64% 
const primaryColor = { hue: 332, saturation: 100, lightness: { light: 64, dark: 64 } }

const banner = (
  <Banner storageKey="docs-rascunho-v1">
    Documentação em construção — o tema ainda não foi publicado.
  </Banner>
)

const navbar = (
  <Navbar
    logo={
      <span className="beep-logo">
        <img src="/logo-beep-theme.svg" alt={THEME_NAME} />
        <span>Documentação</span>
      </span>
    }
  />
)

const footer = (
  <Footer>
    {new Date().getFullYear()} © Beep Digital · Tema para o novo renderizador da Loja Integrada
  </Footer>
)

export default async function RootLayout({ children }) {
  return (
    <html lang="pt-BR" dir="ltr" suppressHydrationWarning>
      <Head color={primaryColor} />
      <body>
        <Layout
          banner={banner}
          navbar={navbar}
          pageMap={await getPageMap()}
          footer={footer}
          editLink={null}
          feedback={{ content: null }}
          sidebar={{ defaultMenuCollapseLevel: 1 }}
          toc={{ title: 'Nesta página', backToTop: 'Voltar ao topo' }}
          search={undefined}
          themeSwitch={{ dark: 'Escuro', light: 'Claro', system: 'Sistema' }}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
