# Reunião 06/10/2026 — [VIPER] Planejamento temas documentação Beep Theme

Participantes: Guilherme Leoni, Endrio Emanuel.
Resumo dos trechos relevantes para a documentação (a transcrição bruta não foi versionada).

## Objetivo

Criar a documentação do novo tema da Loja Integrada (novo renderizador), automatizando a escrita com IA. Ferramenta escolhida: **Nextra** (Markdown → site de documentação), no estilo da documentação da Tray (que usa GitBook). A equipe dita para a IA o que o código não mostra: como a Loja Integrada se comporta (ex.: tamanhos ideais de imagem). Prioridade: enviar a documentação para Seiva e Dantas.

## Comportamentos do tema / Loja Integrada citados

- **Tarja topo**: slide centralizado que roda as mensagens. Origem dos dados ainda não confirmada.
- **Cabeçalho**: logo à esquerda (não centralizado); tem **favoritos**; categorias com hover.
- **Full banner**: funciona com imagem desktop e mobile; não precisa de nome específico, basta a posição.
- **Mini banners**: só a posição Mini banner.
- **Dupla de vitrine**: posição Mini banner, nome com `vitrine`.
- **Banner central**: posição Mini banner, nome começa com `central` (ex.: Central Banner 01). É o que mais depende da imagem mobile (horizontal → vertical).
- **Tarja de benefícios/informativa**: nome `tarja informativa`; imagem = ícone; frase (ex.: "Frete grátis para todo o Brasil") vai no **título do banner**. Ícones em 40×40 ficam ruins — subir em 120×120 mesmo que exiba em 40–50.
- **Ícones de categoria**: palavra-chave `slide categoria`; texto embaixo vai no título do banner. Troca desktop/mobile funciona.
- **Princípio**: travar ao máximo o nome (para o cliente não errar uma letra e o elemento sumir) e dar liberdade nos campos de título/texto.
- **Marcas**: não é possível puxar a imagem — bloqueio da plataforma. Dúvida se mantém a seção.
- **FAQ**: página de conteúdo chamada FAQ; a Beep entrega modelo HTML; cliente cola no código-fonte e edita perguntas e respostas.
- **Visual da loja**: só cor principal, cor complementar e fonte. Fonte normalmente na cor secundária ou preto.
- **Frete grátis**: integrado à configuração da Loja Integrada; o tema informa se há frete grátis.
- **Avaliações**: LI tem avaliação nativa; existe app de avaliação do Google (testar).
- **Compre junto / kit**: não aparece no novo tema (aparecia no antigo). Verificar.
- Seções sem cadastro não são renderizadas.
- Pergunta enviada à LI: é possível adicionar novas opções editáveis no Visual da loja? (Guilherme acredita que não, por enquanto.)

## Outras decisões / ideias

- **Nome do tema**: a definir. Nomes leigos e chamativos convertem mais ("Venda Mais", "Prime Shop"). Explorar velocidade, conversão, "novo motor".
- **Landing page do tema**: página própria (URL do tema, não no site da Beep, que vai passar por rebranding), estilo temas Shopify, para tráfego pago. Usar Seiva e Dantas como cases.
- Concorrentes já estão publicando temas no novo renderizador (um deles tem FAQ na página de produto — ideia para o nosso).
- **Loja teste** no novo renderizador: confirmar liberação para subir o tema.
