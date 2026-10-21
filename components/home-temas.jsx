import Link from 'next/link'
import { PLATAFORMAS, STATUS_LABEL, TEMAS, temaHref } from '../theme.config'

// Grade de pontos do topo da home: um único ponto aceso (manual de marca v1).
function GradeDePontos() {
  const colunas = 9
  const linhas = 6
  const aceso = { c: 6, l: 2 }
  const pontos = []
  for (let l = 0; l < linhas; l++) {
    for (let c = 0; c < colunas; c++) {
      const ligado = c === aceso.c && l === aceso.l
      pontos.push(
        <span
          key={`${c}-${l}`}
          className={ligado ? 'grade__ponto grade__ponto--aceso' : 'grade__ponto'}
          style={{ '--i': c + l }}
        />
      )
    }
  }
  return (
    <div className="grade" aria-hidden="true" style={{ '--colunas': colunas }}>
      {pontos}
    </div>
  )
}

export function HomeTemas() {
  const plataformas = [...new Set(TEMAS.map(tema => tema.plataforma))]

  return (
    <div className="central">
      <section className="central__topo">
        <div className="central__texto">
          <p className="rotulo">
            <span className="rotulo__ponto" aria-hidden="true" />
            Central de temas
          </p>
          <h1 className="central__titulo">Manuais dos temas da Beep</h1>
          <p className="central__sub">
            Escolha a plataforma e o tema da sua loja. Cada manual mostra, passo a passo, como
            instalar e configurar tudo.
          </p>
        </div>
        <div className="central__painel">
          <GradeDePontos />
        </div>
      </section>

      {plataformas.map(plataforma => (
        <section key={plataforma} className="central__plataforma" aria-labelledby={`pl-${plataforma}`}>
          <h2 id={`pl-${plataforma}`} className="rotulo rotulo--secao">
            {PLATAFORMAS[plataforma] || plataforma}
          </h2>
          <ul className="central__cards">
            {TEMAS.filter(tema => tema.plataforma === plataforma).map(tema => (
              <li key={temaHref(tema)}>
                <Link href={temaHref(tema)} className="tema-card">
                  <span
                    className={
                      tema.status === 'disponivel' ? 'rotulo' : 'rotulo rotulo--apagado'
                    }
                  >
                    <span className="rotulo__ponto" aria-hidden="true" />
                    {STATUS_LABEL[tema.status] || tema.status}
                  </span>
                  <span className="tema-card__nome">{tema.nome}</span>
                  <span className="tema-card__desc">{tema.descricao}</span>
                  <span className="tema-card__abrir">
                    Abrir manual <span aria-hidden="true">→</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
