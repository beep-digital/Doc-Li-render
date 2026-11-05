'use client'

import { useEffect, useRef, useState } from 'react'

// Monta o FAQ do Fast Store sem o lojista ver HTML: edita na prévia, copia o
// código pronto e cola na página de conteúdo. Também lê o código de um FAQ que
// já está na loja. O rascunho fica no navegador, porque o lojista sai desta
// página para ir ao painel da Loja Integrada.
const CHAVE_RASCUNHO = 'beep-criador-faq-v2'

const TITULO_PADRAO = 'Dúvidas Frequentes'
const ITENS_PADRAO = [
  {
    pergunta: 'Quanto tempo leva para a entrega?',
    resposta: 'A entrega leva até 10 dias úteis para todo o Brasil. O prazo exato aparece no carrinho depois que você informa o CEP.'
  },
  {
    pergunta: 'Quais são as formas de pagamento?',
    resposta: 'Aceitamos Pix, boleto e cartão de crédito em até 12x.'
  },
  {
    pergunta: 'Posso trocar ou devolver um produto?',
    resposta: 'Sim. Você tem até 7 dias após o recebimento para pedir a troca ou a devolução. Fale com o nosso atendimento pelo WhatsApp.'
  }
]

function escaparHtml(texto) {
  return texto.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

// O CSS do tema exige um único filho em .accordion-content (grid 0fr -> 1fr):
// por isso a resposta é sempre um <p> só, e quebra de linha vira <br>.
export function gerarHtml(titulo, itens) {
  const blocos = itens.map(
    ({ pergunta, resposta }, indice) =>
      `<div class="accordion-item"><button aria-expanded="false" id="accordion-button-${indice + 1}">${escaparHtml(pergunta.trim())}</button>
<div class="accordion-content">
<p>${escaparHtml(resposta.trim()).replace(/\n/g, '<br>')}</p>
</div>
</div>`
  )

  return `<div class="container">
<h2 style="text-align: center;">${escaparHtml(titulo.trim())}</h2>

<div class="accordion">
${blocos.join('\n\n')}
</div>
</div>`
}

function textoDe(elemento) {
  const copia = elemento.cloneNode(true)
  copia.querySelectorAll('br').forEach(br => br.replaceWith('\n'))
  return copia.textContent.replace(/ /g, ' ').trim()
}

export function lerFaq(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html')
  const itens = [...doc.querySelectorAll('.accordion-item')].map(item => {
    const conteudo = item.querySelector('.accordion-content')
    const blocos = conteudo ? [...conteudo.querySelectorAll('p, li')] : []
    return {
      pergunta: textoDe(item.querySelector('button') || doc.createElement('button')),
      resposta: blocos.length
        ? blocos.map(textoDe).join('\n')
        : conteudo
          ? textoDe(conteudo)
          : ''
    }
  })

  const h2 = doc.querySelector('h2')
  return {
    titulo: h2 ? textoDe(h2) : '',
    itens,
    temFormatacao: Boolean(
      doc.querySelector(
        '.accordion-content :is(a, img, strong, b, em, i, u, ul, ol)'
      )
    )
  }
}

async function copiarTexto(texto) {
  try {
    await navigator.clipboard.writeText(texto)
    return true
  } catch {
    const campo = document.createElement('textarea')
    campo.value = texto
    campo.style.position = 'fixed'
    campo.style.opacity = '0'
    document.body.append(campo)
    campo.select()
    const copiou = document.execCommand('copy')
    campo.remove()
    return copiou
  }
}

function CampoTexto({ valor, aoMudar, umaLinha = false, ...resto }) {
  const campo = useRef(null)

  // field-sizing cuida da altura nos navegadores novos; aqui é o plano B
  useEffect(() => {
    const el = campo.current
    if (!el || CSS.supports('field-sizing', 'content')) return
    el.style.height = 'auto'
    el.style.height = `${el.scrollHeight}px`
  }, [valor])

  return (
    <textarea
      ref={campo}
      rows={1}
      value={valor}
      onChange={evento => {
        const texto = evento.target.value
        aoMudar(umaLinha ? texto.replace(/\s*\n\s*/g, ' ') : texto)
      }}
      onKeyDown={evento => {
        if (umaLinha && evento.key === 'Enter') evento.preventDefault()
      }}
      {...resto}
    />
  )
}

export function CriadorDeFaq() {
  const proximoId = useRef(1)
  const criarItens = lista => lista.map(item => ({ ...item, id: proximoId.current++ }))

  const [titulo, setTitulo] = useState(TITULO_PADRAO)
  const [itens, setItens] = useState(() => criarItens(ITENS_PADRAO))
  const [abertos, setAbertos] = useState(() => [1])
  const [leituraAberta, setLeituraAberta] = useState(false)
  const [codigoColado, setCodigoColado] = useState('')
  const [aviso, setAviso] = useState(null)
  const [copiado, setCopiado] = useState(false)
  const [rascunhoLido, setRascunhoLido] = useState(false)
  const [focarPergunta, setFocarPergunta] = useState(null)

  const botaoAdicionar = useRef(null)
  const timerCopiado = useRef(null)

  useEffect(() => {
    try {
      const rascunho = JSON.parse(localStorage.getItem(CHAVE_RASCUNHO))
      if (rascunho?.itens?.length) {
        const restaurados = criarItens(rascunho.itens)
        setTitulo(rascunho.titulo ?? TITULO_PADRAO)
        setItens(restaurados)
        setAbertos([restaurados[0].id])
      }
    } catch {
      // Sem acesso ao armazenamento: segue com o modelo padrão
    }
    setRascunhoLido(true)
    return () => clearTimeout(timerCopiado.current)
  }, [])

  useEffect(() => {
    if (!rascunhoLido) return
    try {
      localStorage.setItem(
        CHAVE_RASCUNHO,
        JSON.stringify({
          titulo,
          itens: itens.map(({ pergunta, resposta }) => ({ pergunta, resposta }))
        })
      )
    } catch {
      // Sem acesso ao armazenamento: o FAQ só não fica guardado
    }
  }, [titulo, itens, rascunhoLido])

  useEffect(() => {
    if (focarPergunta === null) return
    document.getElementById(`faq-pergunta-${focarPergunta}`)?.focus()
    setFocarPergunta(null)
  }, [focarPergunta])

  function limparAvisos() {
    setAviso(null)
    setCopiado(false)
  }

  function editarItem(id, campo, valor) {
    limparAvisos()
    setItens(lista => lista.map(item => (item.id === id ? { ...item, [campo]: valor } : item)))
  }

  function abrirItem(id) {
    setAbertos(lista => (lista.includes(id) ? lista : [...lista, id]))
  }

  function alternarItem(id) {
    setAbertos(lista =>
      lista.includes(id) ? lista.filter(aberto => aberto !== id) : [...lista, id]
    )
  }

  function adicionarItem() {
    limparAvisos()
    const [novo] = criarItens([{ pergunta: '', resposta: '' }])
    setItens(lista => [...lista, novo])
    abrirItem(novo.id)
    setFocarPergunta(novo.id)
  }

  function removerItem(id) {
    if (itens.length === 1) return
    limparAvisos()
    setItens(lista => lista.filter(item => item.id !== id))
    setAbertos(lista => lista.filter(aberto => aberto !== id))
    botaoAdicionar.current?.focus()
  }

  function recomecar() {
    if (!window.confirm('Apagar as perguntas daqui e voltar ao modelo inicial?')) return
    const novos = criarItens(ITENS_PADRAO)
    limparAvisos()
    setTitulo(TITULO_PADRAO)
    setItens(novos)
    setAbertos([novos[0].id])
  }

  function montarDoCodigo() {
    const lido = lerFaq(codigoColado)
    if (lido.itens.length === 0) {
      setCopiado(false)
      setAviso({
        tipo: 'erro',
        texto:
          'Não encontramos perguntas nesse conteúdo. Copie tudo o que aparece no Código-fonte da página FAQ e tente de novo.'
      })
      return
    }

    const novos = criarItens(lido.itens)
    setTitulo(lido.titulo || TITULO_PADRAO)
    setItens(novos)
    setAbertos([novos[0].id])
    setCodigoColado('')
    setLeituraAberta(false)
    setCopiado(false)
    setAviso({
      tipo: lido.temFormatacao ? 'erro' : 'ok',
      texto:
        `${novos.length} ${novos.length === 1 ? 'pergunta carregada' : 'perguntas carregadas'}.` +
        (lido.temFormatacao
          ? ' Atenção: links, negrito e listas das respostas viraram texto simples.'
          : ' Agora é só editar.')
    })
  }

  async function copiarCodigo() {
    const validos = itens.filter(item => item.pergunta.trim() || item.resposta.trim())
    if (validos.length === 0) {
      setAviso({ tipo: 'erro', texto: 'Escreva pelo menos uma pergunta antes de copiar.' })
      return
    }

    const copiou = await copiarTexto(gerarHtml(titulo, validos))
    if (!copiou) {
      setCopiado(false)
      setAviso({ tipo: 'erro', texto: 'Não foi possível copiar. Tente de novo em outro navegador.' })
      return
    }

    setCopiado(true)
    clearTimeout(timerCopiado.current)
    timerCopiado.current = setTimeout(() => setCopiado(false), 2500)

    const incompleto = validos.findIndex(item => !item.pergunta.trim() || !item.resposta.trim())
    setAviso(
      incompleto === -1
        ? { tipo: 'ok', texto: 'Código copiado. Agora cole na sua loja seguindo os passos abaixo.' }
        : {
            tipo: 'erro',
            texto: `Código copiado, mas a pergunta ${incompleto + 1} está incompleta: falta a pergunta ou a resposta.`
          }
    )
  }

  return (
    <section className="criador-faq" aria-label="Criador de FAQ" data-pagefind-ignore="all">
      <div className="criador-faq__barra">
        <p className="rotulo">Prévia na sua loja</p>
        <div className="criador-faq__acoes">
          <button
            type="button"
            className="criador-faq__botao"
            aria-expanded={leituraAberta}
            onClick={() => setLeituraAberta(aberta => !aberta)}
          >
            Já tenho FAQ na loja
          </button>
          <button type="button" className="criador-faq__botao" onClick={recomecar}>
            Recomeçar
          </button>
        </div>
      </div>

      {leituraAberta && (
        <div className="criador-faq__leitura">
          <label htmlFor="faq-codigo-colado">
            Cole aqui o que está no <strong>Código-fonte</strong> da sua página FAQ. As perguntas
            que estão nesta tela serão trocadas pelas da sua loja.
          </label>
          <textarea
            id="faq-codigo-colado"
            rows={5}
            value={codigoColado}
            onChange={evento => setCodigoColado(evento.target.value)}
            spellCheck={false}
          />
          <div>
            <button
              type="button"
              className="criador-faq__botao criador-faq__botao--principal"
              disabled={!codigoColado.trim()}
              onClick={montarDoCodigo}
            >
              Montar FAQ
            </button>
          </div>
        </div>
      )}

      <div className="criador-faq__previa">
        <CampoTexto
          className="criador-faq__titulo"
          aria-label="Título da seção"
          placeholder="Título da seção"
          umaLinha
          valor={titulo}
          aoMudar={valor => {
            limparAvisos()
            setTitulo(valor)
          }}
        />

        <ol className="criador-faq__lista">
          {itens.map((item, indice) => {
            const aberto = abertos.includes(item.id)
            return (
              <li key={item.id} className="criador-faq__linha">
                <div className="criador-faq__item">
                  <div className="criador-faq__pergunta">
                    <CampoTexto
                      id={`faq-pergunta-${item.id}`}
                      aria-label={`Pergunta ${indice + 1}`}
                      placeholder="Escreva a pergunta"
                      umaLinha
                      valor={item.pergunta}
                      aoMudar={valor => editarItem(item.id, 'pergunta', valor)}
                      onFocus={() => abrirItem(item.id)}
                    />
                    <button
                      type="button"
                      className="criador-faq__icone"
                      aria-expanded={aberto}
                      aria-label={`${aberto ? 'Fechar' : 'Abrir'} a resposta da pergunta ${indice + 1}`}
                      onClick={() => alternarItem(item.id)}
                    />
                  </div>
                  {aberto && (
                    <CampoTexto
                      className="criador-faq__resposta"
                      aria-label={`Resposta da pergunta ${indice + 1}`}
                      placeholder="Escreva a resposta"
                      valor={item.resposta}
                      aoMudar={valor => editarItem(item.id, 'resposta', valor)}
                    />
                  )}
                </div>
                <button
                  type="button"
                  className="criador-faq__remover"
                  aria-label={`Remover a pergunta ${indice + 1}`}
                  title="Remover pergunta"
                  disabled={itens.length === 1}
                  onClick={() => removerItem(item.id)}
                >
                  <span aria-hidden="true">−</span>
                </button>
              </li>
            )
          })}
        </ol>

        <button
          ref={botaoAdicionar}
          type="button"
          className="criador-faq__adicionar"
          onClick={adicionarItem}
        >
          <span aria-hidden="true">+</span> Adicionar pergunta
        </button>
      </div>

      <div className="criador-faq__rodape">
        <button
          type="button"
          className="criador-faq__botao criador-faq__botao--principal"
          onClick={copiarCodigo}
        >
          {copiado ? 'Copiado!' : 'Copiar código'}
        </button>
        <p className="criador-faq__aviso" data-tipo={aviso?.tipo} role="status">
          {aviso?.texto ?? 'As cores da prévia são um exemplo. Na loja, o FAQ usa as cores do seu tema.'}
        </p>
      </div>
    </section>
  )
}
