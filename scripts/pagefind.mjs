// Gera o índice de busca (Pagefind) depois do `next build`.
// Procura HTML em todo o `.next`, porque o local exato muda entre ambientes
// (local x Vercel). Se não houver HTML, avisa e segue: o site publica sem busca
// em vez de derrubar o deploy.
import { execFileSync } from 'node:child_process'
import { existsSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const SITE = '.next'

function countHtml(dir) {
  if (!existsSync(dir)) return 0
  let total = 0
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'cache') continue
    const full = join(dir, entry.name)
    if (entry.isDirectory()) total += countHtml(full)
    else if (entry.name.endsWith('.html')) total++
  }
  return total
}

const htmlCount = countHtml(SITE)
if (htmlCount === 0) {
  console.warn('[pagefind] Nenhum HTML encontrado em .next — busca não gerada neste build.')
  process.exit(0)
}

console.log(`[pagefind] ${htmlCount} arquivos HTML encontrados em ${SITE}`)
try {
  execFileSync(
    'npx',
    ['pagefind', '--site', SITE, '--glob', '**/*.html', '--output-path', 'public/_pagefind'],
    { stdio: 'inherit', shell: process.platform === 'win32' }
  )
} catch {
  console.warn('[pagefind] Falha ao gerar o índice — o site segue sem busca.')
}
