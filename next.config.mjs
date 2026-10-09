import nextra from 'nextra'

const withNextra = nextra({
  // Busca local (Pagefind) é gerada no postbuild
  search: { codeblocks: false }
})

export default withNextra({
  reactStrictMode: true
})
