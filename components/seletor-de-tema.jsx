'use client'

import { usePathname, useRouter } from 'next/navigation'
import { PLATAFORMAS, TEMAS, temaDaRota, temaHref } from '../theme.config'

// Seletor "Tema: X (Plataforma)" da navbar. Leva à home do tema escolhido.
// A lista vem de TEMAS em theme.config.js, agrupada por plataforma.
export function SeletorDeTema() {
  const pathname = usePathname() || '/'
  const router = useRouter()
  const atual = temaDaRota(pathname)
  const plataformas = [...new Set(TEMAS.map(tema => tema.plataforma))]

  return (
    <label className="seletor-tema">
      <span className="seletor-tema__rotulo">Tema</span>
      <select
        aria-label="Escolher o tema"
        value={atual ? temaHref(atual) : ''}
        onChange={event => {
          if (event.target.value) router.push(event.target.value)
        }}
      >
        {!atual && (
          <option value="" disabled>
            Escolha um tema
          </option>
        )}
        {plataformas.map(plataforma => (
          <optgroup key={plataforma} label={PLATAFORMAS[plataforma] || plataforma}>
            {TEMAS.filter(tema => tema.plataforma === plataforma).map(tema => (
              <option key={temaHref(tema)} value={temaHref(tema)}>
                {tema.nome} ({PLATAFORMAS[tema.plataforma] || tema.plataforma})
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    </label>
  )
}
