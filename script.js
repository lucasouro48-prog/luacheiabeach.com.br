let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

function salvar() {
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function adicionar(nome, preco) {
  let item = carrinho.find(i => i.nome === nome);
  if (item) {
    item.qtd++;
  } else {
    carrinho.push({ nome, preco, qtd: 1 });
  }
  salvar();
  alert("Item adicionado ao carrinho");
}

function remover(index) {
  carrinho.splice(index, 1);
  salvar();
  carregarCarrinho();
}

function alterarQtd(index, valor) {
  carrinho[index].qtd += valor;
  if (carrinho[index].qtd <= 0) {
    remover(index);
  } else {
    salvar();
    carregarCarrinho();
  }
}

function limparCarrinho() {
  if (confirm("Deseja limpar o carrinho?")) {
    carrinho = [];
    salvar();
    carregarCarrinho();
  }
}

function carregarCarrinho() {
  let lista = document.getElementById("lista");
  let total = 0;
  lista.innerHTML = "";

  carrinho.forEach((item, index) => {
    let subtotal = item.preco * item.qtd;
    total += subtotal;

    lista.innerHTML += `
      <div class="card">
        <div>
          <strong>${item.nome}</strong><br>
          R$ ${item.preco.toFixed(2)} x ${item.qtd}
        </div>
        <div>
          <button onclick="alterarQtd(${index},1)">+</button>
          <button onclick="alterarQtd(${index},-1)">−</button>
          <button onclick="remover(${index})">🗑️</button>
        </div>
      </div>
    `;
  });

  document.getElementById("total").innerText =
    "Total: R$ " + total.toFixed(2);
}

function finalizarPedido() {
  let nome = document.getElementById("cliente").value;
  let obs = document.getElementById("obs").value;

  let msg = `🌙 *Pedido Lua Cheia*%0A`;
  if (nome) msg += `👤 Cliente/Mesa: ${nome}%0A%0A`;

  carrinho.forEach(i => {
    msg += `• ${i.qtd}x ${i.nome} — R$ ${(i.preco * i.qtd).toFixed(2)}%0A`;
  });

  let total = carrinho.reduce((s, i) => s + i.preco * i.qtd, 0);
  msg += `%0A💰 *Total:* R$ ${total.toFixed(2)}`;

  if (obs) msg += `%0A%0A📝 Obs: ${obs}`;

  window.location.href =
    "https://wa.me/5584991694313?text=" + msg;
}

/* TRADUÇÃO SIMPLES */
const traducoes = {
  en: { "Adicionar":"Add", "Finalizar Pedido":"Checkout" },
  es: { "Adicionar":"Agregar", "Finalizar Pedido":"Finalizar" }
};

function traduzir(lang){
  document.querySelectorAll("[data-t]").forEach(el=>{
    el.innerText = traducoes[lang][el.innerText] || el.innerText;
  });
}

function toggleMenu(){
  document.getElementById("menu").classList.toggle("show");
}