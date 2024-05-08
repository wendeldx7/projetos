document.addEventListener("DOMContentLoaded", function () {
  const containerProdutos = document.getElementById("container-produtos");
  const selectCategorias = document.getElementById("categorias");
  const selectOrdem = document.getElementById("ordem");

  let produtosCarrinho = [];

  const carregarProdutos = (categoriaSelecionada, ordem) => {
    let url = "https://fakestoreapi.com/products";
    if (categoriaSelecionada) {
      url = `https://fakestoreapi.com/products/category/${categoriaSelecionada}`;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (ordem === "asc") {
          data.sort((a, b) => a.price - b.price);
        } else if (ordem === "desc") {
          data.sort((a, b) => b.price - a.price);
        }
        exibirProdutos(data);
      })
      .catch((error) => {
        console.error("Erro ao carregar produtos:", error);
      });
  };

  const exibirProdutos = (products) => {
    containerProdutos.innerHTML = "";

    products.forEach((product) => {
      const cardProduto = document.createElement("div");
      cardProduto.classList.add("card-produto");

      const imagem = document.createElement("img");
      imagem.src = product.image;
      imagem.alt = product.title;

      const titulo = document.createElement("h3");
      titulo.textContent = product.title;

      const preco = document.createElement("p");
      preco.classList.add("preco");
      preco.textContent = `Preço: $${product.price}`;

      cardProduto.appendChild(imagem);
      cardProduto.appendChild(titulo);
      cardProduto.appendChild(preco);

      cardProduto.addEventListener("click", () => {
        exibirDetalhesProduto(product);
      });

      containerProdutos.appendChild(cardProduto);
    });
  };

  const adicionarAoCarrinho = (product) => {
    produtosCarrinho.push(product);
    localStorage.setItem("produtosCarrinho", JSON.stringify(produtosCarrinho));
  };

  const exibirDetalhesProduto = (product) => {
    selectCategorias.style.display = "none";
    selectOrdem.style.display = "none";
    containerProdutos.innerHTML = "";

    const cardProduto = document.createElement("div");
    cardProduto.classList.add("detalhes-produto");

    const imagem = document.createElement("img");
    imagem.src = product.image;
    imagem.alt = product.title;

    const titulo = document.createElement("h2");
    titulo.textContent = product.title;

    const descricao = document.createElement("p");
    descricao.textContent = product.description;

    const preco = document.createElement("p");
    preco.classList.add("preco");
    preco.textContent = `Preço: $${product.price}`;

    const btnAdicionar = document.createElement("button");
    btnAdicionar.textContent = "Adicionar ao Carrinho";
    btnAdicionar.classList.add("btn-adicionar");
    btnAdicionar.addEventListener("click", () => {
      adicionarAoCarrinho(product);
    });

    const btnVoltar = document.createElement("p");
    btnVoltar.textContent = "Voltar para Lista de Produtos";
    btnVoltar.classList.add("voltar");
    btnVoltar.addEventListener("click", () => {
      selectCategorias.style.display = "block";
      selectOrdem.style.display = "block";
      carregarProdutos(selectCategorias.value, selectOrdem.value);
    });

    cardProduto.appendChild(imagem);
    cardProduto.appendChild(titulo);
    cardProduto.appendChild(descricao);
    cardProduto.appendChild(preco);
    cardProduto.appendChild(btnAdicionar);
    cardProduto.appendChild(btnVoltar);

    containerProdutos.appendChild(cardProduto);
  };

  selectCategorias.addEventListener("change", () => {
    const categoriaSelecionada = selectCategorias.value;
    const ordemSelecionada = selectOrdem.value;
    carregarProdutos(categoriaSelecionada, ordemSelecionada);
  });

  selectOrdem.addEventListener("change", () => {
    const categoriaSelecionada = selectCategorias.value;
    const ordemSelecionada = selectOrdem.value;
    carregarProdutos(categoriaSelecionada, ordemSelecionada);
  });

  carregarProdutos(null, null);
});
