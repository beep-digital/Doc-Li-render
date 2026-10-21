// Gera o índice de busca (Pagefind) depois do `next build`.
//
// Procura HTML em todo o `.next`, porque o local exato muda entre ambientes:
//   local:  .next/server/app/loja-integrada/royal.html
//   Vercel: .next/server/route-cache/APP_PAGE/<hash>/$/loja-integrada/royal.html
// O CLI do Pagefind usaria o caminho do arquivo como URL (/server/app/...),
// então o índice é montado pela API Node, com a URL pública calculada aqui.
//
// Se algo falhar, avisa e segue: o site publica sem busca em vez de derrubar o deploy.
import { existsSync, readdirSync, readFileSync, rmSync } from 'node:fs'
import { join, relative, sep } from 'node:path'

const SITE = process.env.PAGEFIND_SITE || '.next'
const OUTPUT = process.env.PAGEFIND_OUTPUT || 'public/_pagefind'

// Páginas que não são rota de conteúdo
const IGNORED = new Set(['_not-found', '_global-error', '_error', '404', '500', '_app', '_document'])

export function listHtml(dir) {
  if (!existsSync(dir)) return []
  const files = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'cache') continue
    const full = join(dir, entry.name)
    if (entry.isDirectory()) files.push(...listHtml(full))
    else if (entry.name.endsWith('.html')) files.push(full)
  }
  return files
}

// Caminho do arquivo (relativo ao .next) para a rota pública. null = não indexar.
export function toPublicUrl(relPath) {
  let p = relPath.split(sep).join('/')

  if (p.includes('/$/')) {
    // Vercel: tudo até o último segmento `$` (route-cache/APP_PAGE/<hash>/$/...)
    p = p.slice(p.lastIndexOf('/$/') + 3)
  } else if (p.startsWith('$/')) {
    p = p.slice(2)
  } else {
    const prefixes = ['server/app/', 'server/pages/', 'export/']
    const prefix = prefixes.find((pre) => p.startsWith(pre))
    if (!prefix) return null
    p = p.slice(prefix.length)
  }

  p = p.replace(/\.html$/, '')
  const segments = p.split('/').filter(Boolean)
  if (segments.some((s) => IGNORED.has(s) || s.startsWith('_') || s.startsWith('['))) return null
  if (segments[segments.length - 1] === 'index') segments.pop()

  return '/' + segments.join('/')
}

export async function buildIndex(site = SITE, output = OUTPUT) {
  const files = listHtml(site)
  if (files.length === 0) {
    console.warn(`[pagefind] Nenhum HTML encontrado em ${site}. Busca não gerada neste build.`)
    return []
  }

  const pages = new Map()
  for (const file of files.sort()) {
    const url = toPublicUrl(relative(site, file))
    if (url && !pages.has(url)) pages.set(url, file)
  }
  console.log(`[pagefind] ${files.length} HTML em ${site}, ${pages.size} rotas para indexar`)

  const pagefind = await import('pagefind')
  try {
    const { index, errors } = await pagefind.createIndex()
    if (!index) throw new Error(errors.join('; '))

    const indexed = []
    for (const [url, file] of pages) {
      const res = await index.addHTMLFile({ url, content: readFileSync(file, 'utf8') })
      if (res.errors.length) console.warn(`[pagefind] ${url}: ${res.errors.join('; ')}`)
      else if (res.file) indexed.push(res.file.url)
    }

    rmSync(output, { recursive: true, force: true })
    const written = await index.writeFiles({ outputPath: output })
    if (written.errors.length) throw new Error(written.errors.join('; '))
    console.log(`[pagefind] ${indexed.length} páginas indexadas em ${output}`)
    return indexed
  } finally {
    await pagefind.close()
  }
}

if (!process.env.PAGEFIND_NO_RUN) {
  try {
    await buildIndex()
  } catch (err) {
    console.warn(`[pagefind] Falha ao gerar o índice. O site segue sem busca. (${err?.message ?? err})`)
  }
}
