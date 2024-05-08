document.addEventListener("DOMContentLoaded", function () {
  const containerProdutosCarrinho =
    document.getElementById("produtos-carrinho");
  const totalPrecoCarrinho = document.getElementById("total-preco-carrinho");
  const btnEfetuarCompra = document.getElementById("btn-efetuar-compra");
  const compraEfetuadaBox = document.getElementById("compra-efetuada-box");

  if (localStorage.getItem("produtosCarrinho")) {
    let produtosCarrinho = JSON.parse(localStorage.getItem("produtosCarrinho"));
    let carrinhoMap = {};

    produtosCarrinho.forEach(function (produto) {
      if (carrinhoMap[produto.id]) {
        carrinhoMap[produto.id].quantity++;
      } else {
        carrinhoMap[produto.id] = { ...produto, quantity: 1 };
      }
    });

    containerProdutosCarrinho.innerHTML = "";
    let precoTotal = 0;

    Object.values(carrinhoMap).forEach(function (produto) {
      const divProduto = document.createElement("div");
      divProduto.classList.add("produto-carrinho");

      const imagem = document.createElement("img");
      imagem.src = produto.image;
      imagem.alt = produto.title;
      imagem.classList.add("imagem_produto");

      const titulo = document.createElement("h4");
      titulo.textContent = produto.title;

      const preco = document.createElement("p");
      preco.innerHTML = `Preço: $${produto.price}`;

      const quantidade = document.createElement("p");
      quantidade.innerHTML = `Qtd: ${produto.quantity}`;

      const iconDelete = document.createElement("img");
      iconDelete.src = "../img/delete.png";
      iconDelete.alt = "Excluir produto";
      iconDelete.classList.add("delete-icon");

      iconDelete.addEventListener("click", function () {
        removerProdutoCarrinho(produto.id);
      });

      divProduto.appendChild(imagem);
      divProduto.appendChild(titulo);
      divProduto.appendChild(preco);
      divProduto.appendChild(quantidade);
      divProduto.appendChild(iconDelete);

      containerProdutosCarrinho.appendChild(divProduto);

      precoTotal += produto.price * produto.quantity;
    });

    totalPrecoCarrinho.textContent = `Preço Total: $${precoTotal.toFixed(2)}`;
  } else {
    containerProdutosCarrinho.innerHTML = "<p>Nenhum produto no carrinho.</p>";
    totalPrecoCarrinho.textContent = "Preço Total: $0.00";
  }

  btnEfetuarCompra.addEventListener("click", function () {
    compraEfetuadaBox.style.display = "block";
    localStorage.removeItem("produtosCarrinho");
    containerProdutosCarrinho.innerHTML = "<p>Nenhum produto no carrinho.</p>";
    totalPrecoCarrinho.textContent = "Preço Total: $0.00";
  });

  compraEfetuadaBox.addEventListener("click", function () {
    compraEfetuadaBox.style.display = "none";
  });
});

function removerProdutoCarrinho(produtoId) {
  let produtosCarrinho = JSON.parse(localStorage.getItem("produtosCarrinho"));

  produtosCarrinho = produtosCarrinho.filter(function (produto) {
    return produto.id !== produtoId;
  });

  localStorage.setItem("produtosCarrinho", JSON.stringify(produtosCarrinho));
  location.reload();
}
