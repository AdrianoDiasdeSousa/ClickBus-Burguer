/* =========================
   LOGIN E CADASTRO
========================= */

function fazerLogin(event) {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();

  if (email === "" || senha === "") {
    alert("Preencha todos os campos.");
    return;
  }

  if (email === "admin@clickbus.com" && senha === "admin123") {
    localStorage.setItem("usuarioLogado", email);
    localStorage.setItem("tipoUsuario", "admin");
    localStorage.setItem("nomeUsuario", "Administrador");

    alert("Login de administrador realizado com sucesso!");
    window.location.href = "cardapio.html";
    return;
  }

  const usuarios = JSON.parse(localStorage.getItem("usuariosClickBus")) || [];

  const usuarioEncontrado = usuarios.find(
    (usuario) => usuario.email === email && usuario.senha === senha,
  );

  if (usuarioEncontrado) {
    localStorage.setItem("usuarioLogado", usuarioEncontrado.email);
    localStorage.setItem("tipoUsuario", "cliente");
    localStorage.setItem("nomeUsuario", usuarioEncontrado.nome);
    localStorage.setItem("telefoneUsuario", usuarioEncontrado.telefone);
    localStorage.setItem("enderecoUsuario", usuarioEncontrado.endereco);

    alert("Login realizado com sucesso!");
    window.location.href = "cardapio.html";
    return;
  }

  alert("Email ou senha incorretos. Verifique os dados ou faça seu cadastro.");
}

function fazerCadastro(event) {
  event.preventDefault();

  const nome = document.getElementById("nome")?.value.trim();
  const email = document.getElementById("email")?.value.trim();
  const senha = document.getElementById("senha")?.value.trim();
  const confirmarSenha = document
    .getElementById("confirmarSenha")
    ?.value.trim();
  const endereco = document.getElementById("endereco")?.value.trim();
  const telefone = document.getElementById("telefone")?.value.trim();

  if (!nome || !email || !senha || !confirmarSenha || !endereco || !telefone) {
    alert("Preencha todos os campos.");
    return;
  }

  if (senha !== confirmarSenha) {
    alert("As senhas não conferem.");
    return;
  }

  const usuarios = JSON.parse(localStorage.getItem("usuariosClickBus")) || [];

  const emailJaCadastrado = usuarios.some((usuario) => usuario.email === email);

  if (emailJaCadastrado) {
    alert("Este email já está cadastrado.");
    return;
  }

  const novoUsuario = {
    nome,
    email,
    senha,
    endereco,
    telefone,
    tipo: "cliente",
  };

  usuarios.push(novoUsuario);
  localStorage.setItem("usuariosClickBus", JSON.stringify(usuarios));

  alert("Cadastro realizado com sucesso!");
  window.location.href = "login.html";
}

function enviarRecuperacao(event) {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();

  if (email === "") {
    alert("Digite um email válido.");
    return;
  }

  alert("Instruções de recuperação enviadas para: " + email);
}

/* =========================
   PRODUTOS DO CARDÁPIO
========================= */

const produtosPadrao = [
  {
    id: 1,
    categoria: "lanche",
    nome: "Burguer SIMPLES",
    descricao:
      "Pão, hambúrguer, presunto, mussarela, milho, batata palha, tomate e alface.",
    preco: 15,
    imagem: "img/produtos/burguer-simples.png",
    quantidade: 0,
  },
  {
    id: 2,
    categoria: "lanche",
    nome: "Burguer ESPECIAL",
    descricao:
      "Pão, hambúrguer, presunto, mussarela, salsicha, ovo, milho, batata palha, tomate e alface.",
    preco: 18,
    imagem: "img/produtos/burguer-especial.png",
    quantidade: 0,
  },
  {
    id: 3,
    categoria: "lanche",
    nome: "Burguer BACON",
    descricao:
      "Pão, hambúrguer, presunto, mussarela, salsicha, ovo, bacon, milho, batata palha, tomate e alface.",
    preco: 22,
    imagem: "img/produtos/burguer-bacon.png",
    quantidade: 0,
  },
  {
    id: 4,
    categoria: "lanche",
    nome: "Burguer CALABRESA",
    descricao:
      "Pão, hambúrguer, presunto, mussarela, salsicha, ovo, calabresa, milho, batata palha, tomate e alface.",
    preco: 22,
    imagem: "img/produtos/burguer-calabresa.png",
    quantidade: 0,
  },
  {
    id: 5,
    categoria: "lanche",
    nome: "Burguer FRANGO",
    descricao:
      "Pão, hambúrguer, presunto, mussarela, salsicha, ovo, milho, batata palha, tomate e alface.",
    preco: 20,
    imagem: "img/produtos/burguer-frango.png",
    quantidade: 0,
  },
  {
    id: 6,
    categoria: "lanche",
    nome: "Burguer TUDO",
    descricao:
      "Pão, hambúrguer, presunto, mussarela, salsicha, ovo, bacon, calabresa, milho, batata palha, tomate e alface.",
    preco: 25,
    imagem: "img/produtos/burguer-tudo.png",
    quantidade: 0,
  },
  {
    id: 7,
    categoria: "lanche",
    nome: "Batata Frita",
    descricao: "",
    preco: 5,
    imagem: "img/produtos/porcao-batata.png",
    quantidade: 0,
  },
  {
    id: 8,
    categoria: "lanche",
    nome: "Porção de Batata",
    descricao: "",
    preco: 25,
    imagem: "img/produtos/porcao-batata.png",
    quantidade: 0,
  },
  {
    id: 9,
    categoria: "bebida",
    nome: "Coca Cola 2 LTS",
    descricao: "",
    preco: 15,
    imagem: "img/produtos/coca-2l.png",
    quantidade: 0,
  },
  {
    id: 10,
    categoria: "bebida",
    nome: "Coca Cola 1 LT",
    descricao: "",
    preco: 12,
    imagem: "img/produtos/coca-1l.png",
    quantidade: 0,
  },
  {
    id: 11,
    categoria: "bebida",
    nome: "Guaraná Antarctica 2 LT",
    descricao: "",
    preco: 15,
    imagem: "img/produtos/guarana-2l.png",
    quantidade: 0,
  },
  {
    id: 12,
    categoria: "bebida",
    nome: "Guaraná Antarctica 1 LT",
    descricao: "",
    preco: 12,
    imagem: "img/produtos/guarana-1l.png",
    quantidade: 0,
  },
  {
    id: 13,
    categoria: "bebida",
    nome: "Coca Cola Lata 350 ml",
    descricao: "",
    preco: 7,
    imagem: "img/produtos/coca-lata.png",
    quantidade: 0,
  },
  {
    id: 14,
    categoria: "bebida",
    nome: "Guaraná Antarctica Lata 350 ml",
    descricao: "",
    preco: 7,
    imagem: "img/produtos/guarana-lata.png",
    quantidade: 0,
  },
  {
    id: 15,
    categoria: "bebida",
    nome: "Creme de Cupuaçu 500 ml",
    descricao: "",
    preco: 15,
    imagem: "img/produtos/creme-cupuacu.png",
    quantidade: 0,
  },
  {
    id: 16,
    categoria: "bebida",
    nome: "Creme de Maracujá 500 ml",
    descricao: "",
    preco: 15,
    imagem: "img/produtos/creme-maracuja.png",
    quantidade: 0,
  },
  {
    id: 17,
    categoria: "bebida",
    nome: "Creme de Morango 500 ml",
    descricao: "",
    preco: 15,
    imagem: "img/produtos/creme-morango.png",
    quantidade: 0,
  },
  {
    id: 18,
    categoria: "bebida",
    nome: "Creme de Acerola 500 ml",
    descricao: "",
    preco: 15,
    imagem: "img/produtos/creme-acerola.png",
    quantidade: 0,
  },
  {
    id: 19,
    categoria: "bebida",
    nome: "Suco de Cupuaçu 500 ml",
    descricao: "",
    preco: 12,
    imagem: "img/produtos/suco-cupuacu.png",
    quantidade: 0,
  },
  {
    id: 20,
    categoria: "bebida",
    nome: "Suco de Maracujá 500 ml",
    descricao: "",
    preco: 12,
    imagem: "img/produtos/suco-maracuja.png",
    quantidade: 0,
  },
  {
    id: 21,
    categoria: "bebida",
    nome: "Suco de Morango 500 ml",
    descricao: "",
    preco: 12,
    imagem: "img/produtos/suco-morango.png",
    quantidade: 0,
  },
  {
    id: 22,
    categoria: "bebida",
    nome: "Suco de Acerola 500 ml",
    descricao: "",
    preco: 12,
    imagem: "img/produtos/suco-acerola.png",
    quantidade: 0,
  },
  {
    id: 23,
    categoria: "bebida",
    nome: "Água mineral com Gás 500 ml",
    descricao: "",
    preco: 5,
    imagem: "img/produtos/agua-gas.png",
    quantidade: 0,
  },
  {
    id: 24,
    categoria: "bebida",
    nome: "Água mineral 500 ml",
    descricao: "",
    preco: 4,
    imagem: "img/produtos/agua-mineral.png",
    quantidade: 0,
  },
  {
    id: 25,
    categoria: "bebida",
    nome: "Cerveja Lata Antarctica 269 ml",
    descricao: "",
    preco: 5,
    imagem: "img/produtos/cerveja-antartica.png",
    quantidade: 0,
  },
  {
    id: 26,
    categoria: "bebida",
    nome: "Cerveja Lata Budweiser 269 ml",
    descricao: "",
    preco: 5,
    imagem: "img/produtos/cerveja-budweiser.png",
    quantidade: 0,
  },
];

/* =========================
   FUNÇÕES DO CARDÁPIO
========================= */

function carregarProdutos() {
  const produtosSalvos = localStorage.getItem("produtosClickBus");

  if (produtosSalvos) {
    return JSON.parse(produtosSalvos);
  }

  localStorage.setItem("produtosClickBus", JSON.stringify(produtosPadrao));
  return [...produtosPadrao];
}

function salvarProdutos(produtos) {
  localStorage.setItem("produtosClickBus", JSON.stringify(produtos));
}

function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function usuarioEhAdmin() {
  return localStorage.getItem("tipoUsuario") === "admin";
}

function protegerPaginaCardapio() {
  const estaNoCardapio = window.location.pathname.includes("cardapio.html");

  if (!estaNoCardapio) return;

  const usuarioLogado = localStorage.getItem("usuarioLogado");

  if (!usuarioLogado) {
    alert("Faça login para acessar o cardápio.");
    window.location.href = "login.html";
  }
}

function criarImagemProduto(produto) {
  if (!produto.imagem) {
    return "";
  }

  return `
    <img
      src="${produto.imagem}"
      alt="${produto.nome}"
      onerror="this.style.display='none'"
    />
  `;
}

function renderizarCardapio() {
  const listaLanches = document.getElementById("listaLanches");
  const listaBebidas = document.getElementById("listaBebidas");

  if (!listaLanches || !listaBebidas) return;

  const produtos = carregarProdutos();
  const admin = usuarioEhAdmin();

  listaLanches.innerHTML = "";
  listaBebidas.innerHTML = "";

  const nomeUsuario = localStorage.getItem("nomeUsuario") || "Cliente";
  const saudacao = document.getElementById("saudacaoUsuario");

  if (saudacao) {
    saudacao.textContent = admin
      ? "Olá, Administrador!"
      : `Olá, ${nomeUsuario}!`;
  }

  const areaAdmin = document.getElementById("areaAdmin");

  if (areaAdmin) {
    if (admin) {
      areaAdmin.classList.remove("oculto");
    } else {
      areaAdmin.classList.add("oculto");
    }
  }

  produtos.forEach((produto) => {
    const card = document.createElement("article");
    card.className = "produto";

    card.innerHTML = `
      <div class="produto-info">
        <div class="produto-texto">
          <h3>${produto.nome}</h3>

          ${produto.descricao ? `<p>${produto.descricao}</p>` : ""}

          <strong>${formatarMoeda(Number(produto.preco) || 0)}</strong>

          ${
            produto.categoria === "lanche"
              ? `<button type="button" class="btn-observacoes" onclick="adicionarObservacao(${produto.id})">Observações</button>`
              : ""
          }

          ${
            admin
              ? `
                <div class="admin-acoes">
                  <button type="button" onclick="editarProduto(${produto.id})">Editar produto</button>
                  <button type="button" onclick="editarImagemProduto(${produto.id})">Editar imagem</button>
                </div>
              `
              : ""
          }
        </div>

        <div class="produto-img">
          ${criarImagemProduto(produto)}
        </div>
      </div>

      <div class="produto-qtd">
        <span>Quantidade</span>

        <div class="controle-qtd">
          <button type="button" onclick="alterarQuantidade(${produto.id}, -1)">−</button>

          <input
            type="number"
            min="0"
            value="${Number(produto.quantidade) > 0 ? produto.quantidade : ""}"
            oninput="digitarQuantidade(${produto.id}, this.value)"
          />

          <button type="button" onclick="alterarQuantidade(${produto.id}, 1)">+</button>
        </div>
      </div>
    `;

    if (produto.categoria === "lanche") {
      listaLanches.appendChild(card);
    } else {
      listaBebidas.appendChild(card);
    }
  });

  atualizarTotal();
}

function alterarQuantidade(id, valor) {
  const produtos = carregarProdutos();
  const produto = produtos.find((item) => item.id === id);

  if (!produto) return;

  produto.quantidade = Number(produto.quantidade) || 0;
  produto.quantidade += valor;

  if (produto.quantidade < 0) {
    produto.quantidade = 0;
  }

  salvarProdutos(produtos);
  renderizarCardapio();
}

function digitarQuantidade(id, valor) {
  const produtos = carregarProdutos();
  const produto = produtos.find((item) => item.id === id);

  if (!produto) return;

  if (valor === "") {
    produto.quantidade = 0;
  } else {
    let quantidade = parseInt(valor);

    if (isNaN(quantidade) || quantidade < 0) {
      quantidade = 0;
    }

    produto.quantidade = quantidade;
  }

  salvarProdutos(produtos);
  atualizarTotal();
}

function atualizarTotal() {
  const produtos = carregarProdutos();

  const total = produtos.reduce((soma, produto) => {
    return (
      soma + (Number(produto.preco) || 0) * (Number(produto.quantidade) || 0)
    );
  }, 0);

  const valorTotal = document.getElementById("valorTotal");

  if (valorTotal) {
    valorTotal.textContent = formatarMoeda(total);
  }
}

function adicionarObservacao(id) {
  localStorage.setItem("produtoObservacaoId", id);
  window.location.href = "observacoes.html";
}

function editarProduto(id) {
  if (!usuarioEhAdmin()) {
    alert("Apenas o administrador pode editar produtos.");
    return;
  }

  const produtos = carregarProdutos();
  const produto = produtos.find((item) => item.id === id);

  if (!produto) return;

  const novoNome = prompt("Nome do produto:", produto.nome);
  const novaDescricao = prompt("Descrição do produto:", produto.descricao);
  const novoPreco = prompt("Preço do produto:", produto.preco);

  if (!novoNome || !novoPreco) {
    alert("Nome e preço são obrigatórios.");
    return;
  }

  const precoConvertido = Number(novoPreco.replace(",", "."));

  if (isNaN(precoConvertido) || precoConvertido < 0) {
    alert("Digite um preço válido.");
    return;
  }

  produto.nome = novoNome.trim();
  produto.descricao = novaDescricao ? novaDescricao.trim() : "";
  produto.preco = precoConvertido;

  salvarProdutos(produtos);
  renderizarCardapio();
}

function editarImagemProduto(id) {
  if (!usuarioEhAdmin()) {
    alert("Apenas o administrador pode editar imagens.");
    return;
  }

  const produtos = carregarProdutos();
  const produto = produtos.find((item) => item.id === id);

  if (!produto) return;

  const inputArquivo = document.createElement("input");
  inputArquivo.type = "file";
  inputArquivo.accept = "image/*";

  inputArquivo.addEventListener("change", () => {
    const arquivo = inputArquivo.files[0];

    if (!arquivo) return;

    const leitor = new FileReader();

    leitor.onload = () => {
      produto.imagem = leitor.result;

      salvarProdutos(produtos);
      renderizarCardapio();

      alert("Imagem atualizada com sucesso!");
    };

    leitor.readAsDataURL(arquivo);
  });

  inputArquivo.click();
}

function avancarPedido() {
  const produtos = carregarProdutos();

  const itensSelecionados = produtos.filter(
    (produto) => Number(produto.quantidade) > 0,
  );

  if (itensSelecionados.length === 0) {
    alert("Selecione pelo menos um item antes de avançar.");
    return;
  }

  localStorage.setItem("pedidoAtual", JSON.stringify(itensSelecionados));

  window.location.href = "carrinho.html";
}

function sairDoSistema() {
  localStorage.removeItem("usuarioLogado");
  localStorage.removeItem("tipoUsuario");
  localStorage.removeItem("nomeUsuario");

  window.location.href = "login.html";
}

/* =========================
   PERFIL DA LOJA
========================= */

function verificarStatusLoja() {
  const statusLoja = document.getElementById("statusLoja");

  if (!statusLoja) return;

  const perfil = carregarPerfilLoja();
  const horario = perfil.horario || "18:30 às 23:30";

  const horarios = horario.match(/\d{1,2}:\d{2}/g);

  if (!horarios || horarios.length < 2) {
    statusLoja.textContent = "Fechado";
    statusLoja.classList.remove("aberto");
    statusLoja.classList.add("fechado");
    return;
  }

  const [horaAbertura, horaFechamento] = horarios;

  const agora = new Date();
  const horaAtual = agora.getHours() * 60 + agora.getMinutes();

  const [aberturaHora, aberturaMinuto] = horaAbertura.split(":").map(Number);
  const [fechamentoHora, fechamentoMinuto] = horaFechamento
    .split(":")
    .map(Number);

  const abertura = aberturaHora * 60 + aberturaMinuto;
  const fechamento = fechamentoHora * 60 + fechamentoMinuto;

  const lojaAberta = horaAtual >= abertura && horaAtual <= fechamento;

  if (lojaAberta) {
    statusLoja.textContent = "Aberto";
    statusLoja.classList.remove("fechado");
    statusLoja.classList.add("aberto");
  } else {
    statusLoja.textContent = "Fechado";
    statusLoja.classList.remove("aberto");
    statusLoja.classList.add("fechado");
  }
}
/* =========================
   OBSERVAÇÕES
========================= */

function carregarObservacaoPagina() {
  const campoObservacao = document.getElementById("campoObservacao");

  if (!campoObservacao) return;

  const produtoId = Number(localStorage.getItem("produtoObservacaoId"));
  const produtos = carregarProdutos();
  const produto = produtos.find((item) => item.id === produtoId);

  if (!produto) return;

  campoObservacao.value = produto.observacao || "";
}

function salvarObservacaoPagina() {
  const campoObservacao = document.getElementById("campoObservacao");

  if (!campoObservacao) return;

  const produtoId = Number(localStorage.getItem("produtoObservacaoId"));
  const produtos = carregarProdutos();
  const produto = produtos.find((item) => item.id === produtoId);

  if (!produto) {
    alert("Produto não encontrado.");
    return;
  }

  produto.observacao = campoObservacao.value.trim();

  salvarProdutos(produtos);

  alert("Observação salva com sucesso!");
  window.location.href = "cardapio.html";
}

/* =========================
   CARRINHO
========================= */

function carregarPedidoAtual() {
  return JSON.parse(localStorage.getItem("pedidoAtual")) || [];
}

function salvarPedidoAtual(pedido) {
  localStorage.setItem("pedidoAtual", JSON.stringify(pedido));
}

function renderizarCarrinho() {
  const listaCarrinho = document.getElementById("listaCarrinho");
  const valorTotalCarrinho = document.getElementById("valorTotalCarrinho");
  const totalProdutosCarrinho = document.getElementById(
    "totalProdutosCarrinho",
  );

  if (!listaCarrinho || !valorTotalCarrinho || !totalProdutosCarrinho) return;

  const pedido = carregarPedidoAtual();

  listaCarrinho.innerHTML = "";

  if (pedido.length === 0) {
    listaCarrinho.innerHTML = `
      <p class="mensagem-vazio">Seu carrinho está vazio.</p>
    `;

    valorTotalCarrinho.textContent = "R$ 0,00";
    totalProdutosCarrinho.textContent = "00";
    return;
  }

  pedido.forEach((item) => {
    const linha = document.createElement("div");
    linha.className = "item-carrinho";

    linha.innerHTML = `
      <div class="nome-item">
        <span class="check-item">✓</span>
        <span>${item.nome}</span>
      </div>

      <div class="preco-item">
        ${formatarMoeda(Number(item.preco) || 0)}
      </div>

      <div class="controle-carrinho">
        <button
          type="button"
          class="btn-remover"
          onclick="diminuirItemCarrinho(${item.id})"
        >
          🗑
        </button>

        <span>${Number(item.quantidade) || 0}</span>

        <button type="button" onclick="aumentarItemCarrinho(${item.id})">
          ＋
        </button>
      </div>
    `;

    listaCarrinho.appendChild(linha);
  });

  atualizarResumoCarrinho();
}

function atualizarResumoCarrinho() {
  const pedido = carregarPedidoAtual();

  const totalValor = pedido.reduce((soma, item) => {
    return soma + (Number(item.preco) || 0) * (Number(item.quantidade) || 0);
  }, 0);

  const totalProdutos = pedido.reduce((soma, item) => {
    return soma + (Number(item.quantidade) || 0);
  }, 0);

  const valorTotalCarrinho = document.getElementById("valorTotalCarrinho");
  const totalProdutosCarrinho = document.getElementById(
    "totalProdutosCarrinho",
  );

  if (valorTotalCarrinho) {
    valorTotalCarrinho.textContent = formatarMoeda(totalValor);
  }

  if (totalProdutosCarrinho) {
    totalProdutosCarrinho.textContent = String(totalProdutos).padStart(2, "0");
  }
}

function aumentarItemCarrinho(id) {
  const pedido = carregarPedidoAtual();
  const item = pedido.find((produto) => produto.id === id);

  if (!item) return;

  item.quantidade = Number(item.quantidade) || 0;
  item.quantidade += 1;

  salvarPedidoAtual(pedido);
  sincronizarPedidoComProdutos(pedido);
  renderizarCarrinho();
}

function diminuirItemCarrinho(id) {
  const pedido = carregarPedidoAtual();
  const item = pedido.find((produto) => produto.id === id);

  if (!item) return;

  item.quantidade = Number(item.quantidade) || 0;
  item.quantidade -= 1;

  let pedidoAtualizado = pedido;

  if (item.quantidade <= 0) {
    pedidoAtualizado = pedido.filter((produto) => produto.id !== id);
  }

  salvarPedidoAtual(pedidoAtualizado);
  sincronizarPedidoComProdutos(pedidoAtualizado);
  renderizarCarrinho();
}

function limparCarrinho() {
  const confirmar = confirm("Deseja limpar todo o carrinho?");

  if (!confirmar) return;

  localStorage.removeItem("pedidoAtual");

  const produtos = carregarProdutos();

  produtos.forEach((produto) => {
    produto.quantidade = 0;
  });

  salvarProdutos(produtos);
  renderizarCarrinho();
}

function sincronizarPedidoComProdutos(pedido) {
  const produtos = carregarProdutos();

  produtos.forEach((produto) => {
    const itemPedido = pedido.find((item) => item.id === produto.id);
    produto.quantidade = itemPedido ? Number(itemPedido.quantidade) || 0 : 0;
  });

  salvarProdutos(produtos);
}

function avancarCarrinho() {
  const pedido = carregarPedidoAtual();

  if (pedido.length === 0) {
    alert("Seu carrinho está vazio.");
    return;
  }

  window.location.href = "finalizar-pedido.html";
}

/* =========================
   FINALIZAÇÃO DO PEDIDO
========================= */

function carregarFinalizacaoPedido() {
  const nomeEntrega = document.getElementById("nomeEntrega");
  const telefoneEntrega = document.getElementById("telefoneEntrega");
  const enderecoEntrega = document.getElementById("enderecoEntrega");
  const totalProdutosFinal = document.getElementById("totalProdutosFinal");
  const valorTotalFinal = document.getElementById("valorTotalFinal");

  if (
    !nomeEntrega ||
    !telefoneEntrega ||
    !enderecoEntrega ||
    !totalProdutosFinal ||
    !valorTotalFinal
  ) {
    return;
  }

  const pedido = carregarPedidoAtual();

  const nomeSalvo =
    localStorage.getItem("nomeEntrega") ||
    localStorage.getItem("nomeUsuario") ||
    "Cliente";

  const telefoneSalvo =
    localStorage.getItem("telefoneEntrega") ||
    localStorage.getItem("telefoneUsuario") ||
    "(63) 99999-9999";

  const enderecoSalvo =
    localStorage.getItem("enderecoEntrega") ||
    localStorage.getItem("enderecoUsuario") ||
    "Rua 01 Número 1132 Setor Oeste\nSandolândia - TO";

  nomeEntrega.textContent = nomeSalvo;
  telefoneEntrega.textContent = telefoneSalvo;
  enderecoEntrega.innerHTML = enderecoSalvo.replace(/\n/g, "<br>");

  const totalProdutos = pedido.reduce((soma, item) => {
    return soma + (Number(item.quantidade) || 0);
  }, 0);

  const totalValor = pedido.reduce((soma, item) => {
    return soma + (Number(item.preco) || 0) * (Number(item.quantidade) || 0);
  }, 0);

  totalProdutosFinal.textContent = String(totalProdutos).padStart(2, "0");
  valorTotalFinal.textContent = formatarMoeda(totalValor);
}

function trocarCliente() {
  const nomeAtual =
    localStorage.getItem("nomeEntrega") ||
    localStorage.getItem("nomeUsuario") ||
    "Cliente";

  const telefoneAtual =
    localStorage.getItem("telefoneEntrega") ||
    localStorage.getItem("telefoneUsuario") ||
    "(63) 99999-9999";

  const novoNome = prompt("Digite o nome do destinatário:", nomeAtual);

  if (novoNome === null) return;

  const novoTelefone = prompt(
    "Digite o telefone do destinatário:",
    telefoneAtual,
  );

  if (novoTelefone === null) return;

  localStorage.setItem("nomeEntrega", novoNome.trim());
  localStorage.setItem("telefoneEntrega", novoTelefone.trim());

  carregarFinalizacaoPedido();
}

function cadastrarNovoEndereco() {
  const enderecoAtual =
    localStorage.getItem("enderecoEntrega") ||
    localStorage.getItem("enderecoUsuario") ||
    "Rua 01 Número 1132 Setor Oeste\nSandolândia - TO";

  const novoEndereco = prompt(
    "Digite o novo endereço de entrega:",
    enderecoAtual,
  );

  if (novoEndereco === null || !novoEndereco.trim()) return;

  localStorage.setItem("enderecoEntrega", novoEndereco.trim());
  carregarFinalizacaoPedido();
}

function excluirEnderecoEntrega(event) {
  event.preventDefault();

  localStorage.removeItem("enderecoEntrega");
  carregarFinalizacaoPedido();
}

function confirmarPedido() {
  const pedido = carregarPedidoAtual();

  if (pedido.length === 0) {
    alert("Seu carrinho está vazio.");
    return;
  }

  const formaRecebimento = document.querySelector(
    'input[name="formaRecebimento"]:checked',
  )?.value;

  const formaPagamento = document.querySelector(
    'input[name="formaPagamento"]:checked',
  )?.value;

  const totalProdutos = pedido.reduce((soma, item) => {
    return soma + (Number(item.quantidade) || 0);
  }, 0);

  const totalValor = pedido.reduce((soma, item) => {
    return soma + (Number(item.preco) || 0) * (Number(item.quantidade) || 0);
  }, 0);

  const agora = new Date();

  const pedidoConfirmado = {
    id: "PED-" + Date.now(),
    data: agora.toISOString(),

    email: localStorage.getItem("usuarioLogado") || "",

    cliente:
      localStorage.getItem("nomeEntrega") ||
      localStorage.getItem("nomeUsuario") ||
      "Cliente",

    telefone:
      localStorage.getItem("telefoneEntrega") ||
      localStorage.getItem("telefoneUsuario") ||
      "",

    endereco:
      formaRecebimento === "entrega"
        ? localStorage.getItem("enderecoEntrega") ||
          localStorage.getItem("enderecoUsuario") ||
          "Endereço não informado"
        : "Retirar no estabelecimento",

    formaRecebimento,
    formaPagamento,
    status: "Pedido recebido",
    totalProdutos,
    totalValor,
    itens: pedido,
  };

  const pedidos = carregarPedidos();

  pedidos.push(pedidoConfirmado);

  salvarPedidos(pedidos);

  localStorage.setItem("pedidoConfirmado", JSON.stringify(pedidoConfirmado));

  const produtos = carregarProdutos();

  produtos.forEach((produto) => {
    produto.quantidade = 0;
  });

  salvarProdutos(produtos);
  localStorage.removeItem("pedidoAtual");

  alert("Pedido confirmado com sucesso!");
  window.location.href = "pedidos.html";
}
/* =========================
   LISTA DE PEDIDOS
========================= */

function carregarPedidos() {
  return JSON.parse(localStorage.getItem("pedidosClickBus")) || [];
}

function salvarPedidos(pedidos) {
  localStorage.setItem("pedidosClickBus", JSON.stringify(pedidos));
}

function formatarDataPedido(dataISO) {
  const data = new Date(dataISO);

  return data.toLocaleDateString("pt-BR");
}

function formatarHoraPedido(dataISO) {
  const data = new Date(dataISO);

  return data.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function pegarClasseStatus(status) {
  if (status === "Entregue") return "status-entregue";
  if (status === "Em produção") return "status-producao";
  if (status === "Em rota de entrega") return "status-rota";
  return "status-recebido";
}

function renderizarPedidos() {
  const listaPedidos = document.getElementById("listaPedidos");

  if (!listaPedidos) return;

  const pedidos = carregarPedidos();
  const admin = usuarioEhAdmin();
  const usuarioLogado = localStorage.getItem("usuarioLogado");

  let pedidosVisiveis = pedidos;

  if (!admin) {
    pedidosVisiveis = pedidos.filter(
      (pedido) => pedido.email === usuarioLogado,
    );
  }

  listaPedidos.innerHTML = "";

  if (pedidosVisiveis.length === 0) {
    listaPedidos.innerHTML = `
      <p class="mensagem-sem-pedidos">Nenhum pedido encontrado.</p>
    `;
    return;
  }

  pedidosVisiveis
    .slice()
    .reverse()
    .forEach((pedido) => {
      const item = document.createElement("article");
      item.className = "item-pedido";

      const statusClasse = pegarClasseStatus(pedido.status);

      item.innerHTML = `
        <div class="data-pedido">
          Data do pedido ${formatarDataPedido(pedido.data)}
        </div>

        <div class="hora-pedido">
          ${formatarHoraPedido(pedido.data)}
        </div>

        ${
          admin
            ? `
              <div class="admin-status">
                <span class="status-pedido ${statusClasse}">
                  ${pedido.status}
                </span>

                <select onchange="alterarStatusPedido('${pedido.id}', this.value)">
                  <option value="Pedido recebido" ${
                    pedido.status === "Pedido recebido" ? "selected" : ""
                  }>Pedido recebido</option>

                  <option value="Em produção" ${
                    pedido.status === "Em produção" ? "selected" : ""
                  }>Em produção</option>

                  <option value="Em rota de entrega" ${
                    pedido.status === "Em rota de entrega" ? "selected" : ""
                  }>Em rota de entrega</option>

                  <option value="Entregue" ${
                    pedido.status === "Entregue" ? "selected" : ""
                  }>Entregue</option>
                </select>
              </div>
            `
            : `
              <span class="status-pedido ${statusClasse}">
                ${pedido.status}
              </span>
            `
        }

        <button type="button" class="btn-detalhe" onclick="irParaDetalhePedido('${pedido.id}')">
       🔍 Detalhe do pedido
        </button>
      `;

      listaPedidos.appendChild(item);
    });
}

function alterarStatusPedido(id, novoStatus) {
  if (!usuarioEhAdmin()) {
    alert("Apenas o administrador pode alterar o status.");
    return;
  }

  const pedidos = carregarPedidos();
  const pedido = pedidos.find((item) => item.id === id);

  if (!pedido) return;

  pedido.status = novoStatus;

  salvarPedidos(pedidos);
  renderizarPedidos();
}

function abrirDetalhePedido(id) {
  const pedidos = carregarPedidos();
  const pedido = pedidos.find((item) => item.id === id);

  const modalPedido = document.getElementById("modalPedido");
  const conteudoDetalhePedido = document.getElementById(
    "conteudoDetalhePedido",
  );

  if (!pedido || !modalPedido || !conteudoDetalhePedido) return;

  const itensHTML = pedido.itens
    .map((item) => {
      const quantidade = Number(item.quantidade) || 0;
      const preco = Number(item.preco) || 0;
      const subtotal = quantidade * preco;

      return `
        <div class="item-detalhe">
          <span>${quantidade}x ${item.nome}</span>
          <strong>${formatarMoeda(subtotal)}</strong>
        </div>

        ${
          item.observacao
            ? `<div class="detalhe-linha"><strong>Obs:</strong> ${item.observacao}</div>`
            : ""
        }
      `;
    })
    .join("");

  conteudoDetalhePedido.innerHTML = `
    <div class="detalhe-linha">
      <strong>Cliente:</strong> ${pedido.cliente}
    </div>

    <div class="detalhe-linha">
      <strong>Telefone:</strong> ${pedido.telefone || "Não informado"}
    </div>

    <div class="detalhe-linha">
      <strong>Data:</strong> ${formatarDataPedido(pedido.data)} às ${formatarHoraPedido(pedido.data)}
    </div>

    <div class="detalhe-linha">
      <strong>Status:</strong> ${pedido.status}
    </div>

    <div class="detalhe-linha">
      <strong>Recebimento:</strong> ${pedido.formaRecebimento}
    </div>

    <div class="detalhe-linha">
      <strong>Pagamento:</strong> ${pedido.formaPagamento}
    </div>

    <div class="detalhe-linha">
      <strong>Endereço:</strong> ${pedido.endereco}
    </div>

    <div class="lista-itens-detalhe">
      <strong>Itens do pedido:</strong>
      ${itensHTML}
    </div>

    <div class="detalhe-linha" style="margin-top: 16px; font-size: 22px;">
      <strong>Total:</strong> ${formatarMoeda(Number(pedido.totalValor) || 0)}
    </div>
  `;

  modalPedido.classList.remove("oculto");
}

function fecharDetalhePedido() {
  const modalPedido = document.getElementById("modalPedido");

  if (modalPedido) {
    modalPedido.classList.add("oculto");
  }
}
/* =========================
   PERFIL DA LOJA EDITÁVEL
========================= */

const perfilLojaPadrao = {
  nome: "Bus Burguer",
  categoria: "Hamburgueria",
  endereco: "Avenida Ulisses Guimarães, centro. Em frente a praça central.",
  telefone: "63 999544551",
  horario: "18:30 às 23:30",
  dias: "Segunda à Domingo",
};

function carregarPerfilLoja() {
  const perfilSalvo = localStorage.getItem("perfilLojaClickBus");

  if (perfilSalvo) {
    return JSON.parse(perfilSalvo);
  }

  localStorage.setItem("perfilLojaClickBus", JSON.stringify(perfilLojaPadrao));
  return perfilLojaPadrao;
}

function preencherPerfilLoja() {
  const nomeLoja = document.getElementById("nomeLoja");
  const categoriaLoja = document.getElementById("categoriaLoja");
  const enderecoLoja = document.getElementById("enderecoLoja");
  const telefoneLoja = document.getElementById("telefoneLoja");
  const horarioLoja = document.getElementById("horarioLoja");
  const diasLoja = document.getElementById("diasLoja");
  const btnSalvar = document.getElementById("btnSalvarPerfilLoja");

  if (
    !nomeLoja ||
    !categoriaLoja ||
    !enderecoLoja ||
    !telefoneLoja ||
    !horarioLoja ||
    !diasLoja
  ) {
    return;
  }

  const perfil = carregarPerfilLoja();

  nomeLoja.value = perfil.nome;
  categoriaLoja.value = perfil.categoria;
  enderecoLoja.value = perfil.endereco;
  telefoneLoja.value = perfil.telefone;
  horarioLoja.value = perfil.horario;
  diasLoja.value = perfil.dias;

  const admin = usuarioEhAdmin();

  const campos = [
    nomeLoja,
    categoriaLoja,
    enderecoLoja,
    telefoneLoja,
    horarioLoja,
    diasLoja,
  ];

  campos.forEach((campo) => {
    campo.readOnly = !admin;

    if (admin) {
      campo.classList.add("editavel");
    } else {
      campo.classList.remove("editavel");
    }
  });

  if (btnSalvar) {
    if (admin) {
      btnSalvar.classList.remove("oculto");
    } else {
      btnSalvar.classList.add("oculto");
    }
  }
}

function salvarPerfilLoja(event) {
  event.preventDefault();

  if (!usuarioEhAdmin()) {
    alert("Apenas o administrador pode alterar o perfil da loja.");
    return;
  }

  const perfilAtualizado = {
    nome: document.getElementById("nomeLoja").value.trim(),
    categoria: document.getElementById("categoriaLoja").value.trim(),
    endereco: document.getElementById("enderecoLoja").value.trim(),
    telefone: document.getElementById("telefoneLoja").value.trim(),
    horario: document.getElementById("horarioLoja").value.trim(),
    dias: document.getElementById("diasLoja").value.trim(),
  };

  localStorage.setItem("perfilLojaClickBus", JSON.stringify(perfilAtualizado));

  alert("Perfil da loja atualizado com sucesso!");

  verificarStatusLoja();
}

function irParaDetalhePedido(id) {
  window.location.href = `detalhe-pedido.html?id=${id}`;
}

function carregarDetalhePedidoPagina() {
  const clienteDetalhe = document.getElementById("clienteDetalhe");
  const telefoneDetalhe = document.getElementById("telefoneDetalhe");
  const dataDetalhe = document.getElementById("dataDetalhe");
  const horaDetalhe = document.getElementById("horaDetalhe");
  const statusDetalhe = document.getElementById("statusDetalhe");
  const itensDetalhePedido = document.getElementById("itensDetalhePedido");
  const totalProdutosDetalhe = document.getElementById("totalProdutosDetalhe");
  const valorTotalDetalhe = document.getElementById("valorTotalDetalhe");

  if (
    !clienteDetalhe ||
    !telefoneDetalhe ||
    !dataDetalhe ||
    !horaDetalhe ||
    !statusDetalhe ||
    !itensDetalhePedido ||
    !totalProdutosDetalhe ||
    !valorTotalDetalhe
  ) {
    return;
  }

  const parametros = new URLSearchParams(window.location.search);
  const pedidoId = parametros.get("id");

  const pedidos = carregarPedidos();
  const pedido = pedidos.find((item) => item.id === pedidoId);

  if (!pedido) {
    itensDetalhePedido.innerHTML = `
      <p style="font-size: 22px; text-align: center;">
        Pedido não encontrado.
      </p>
    `;
    return;
  }

  clienteDetalhe.textContent = pedido.cliente || "Cliente não informado";
  telefoneDetalhe.textContent = pedido.telefone || "Telefone não informado";

  dataDetalhe.textContent = `Data do pedido ${formatarDataPedido(pedido.data)}`;
  horaDetalhe.textContent = formatarHoraPedido(pedido.data);

  statusDetalhe.textContent = pedido.status || "Pedido recebido";

  statusDetalhe.className = "status-detalhe";

  if (pedido.status === "Entregue") {
    statusDetalhe.classList.add("status-entregue");
  } else if (pedido.status === "Em produção") {
    statusDetalhe.classList.add("status-producao");
  } else if (pedido.status === "Em rota de entrega") {
    statusDetalhe.classList.add("status-rota");
  } else {
    statusDetalhe.classList.add("status-recebido");
  }

  itensDetalhePedido.innerHTML = "";

  pedido.itens.forEach((item) => {
    const quantidade = Number(item.quantidade) || 0;
    const preco = Number(item.preco) || 0;
    const subtotal = quantidade * preco;

    const linha = document.createElement("div");

    linha.innerHTML = `
      <div class="item-detalhe-pedido">
        <div class="nome-produto-detalhe">
          <span>${item.nome}</span>
          <span class="linha-pontilhada"></span>
        </div>

        <div class="preco-produto-detalhe">
          ${formatarMoeda(subtotal)}
        </div>
      </div>

      ${
        item.observacao
          ? `<div class="observacao-detalhe">Obs: ${item.observacao}</div>`
          : ""
      }
    `;

    itensDetalhePedido.appendChild(linha);
  });

  totalProdutosDetalhe.textContent = String(pedido.totalProdutos).padStart(
    2,
    "0",
  );

  valorTotalDetalhe.textContent = formatarMoeda(Number(pedido.totalValor) || 0);
}

/* =========================
   INICIALIZAÇÃO
========================= */

document.addEventListener("DOMContentLoaded", () => {
  protegerPaginaCardapio();
  renderizarCardapio();
  renderizarCarrinho();
  renderizarPedidos();
  preencherPerfilLoja();
  carregarDetalhePedidoPagina();

  if (typeof carregarObservacaoPagina === "function") {
    carregarObservacaoPagina();
  }

  if (typeof verificarStatusLoja === "function") {
    verificarStatusLoja();
  }

  if (typeof carregarFinalizacaoPedido === "function") {
    carregarFinalizacaoPedido();
  }
});
