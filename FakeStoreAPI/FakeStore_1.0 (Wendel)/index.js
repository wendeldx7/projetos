document.addEventListener("DOMContentLoaded", function () {
  const containerProdutos = document.getElementById("container-produtos");

  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) => {
      const exibirDetalhesProduto = (product) => {
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

        cardProduto.appendChild(imagem);
        cardProduto.appendChild(titulo);
        cardProduto.appendChild(descricao);
        cardProduto.appendChild(preco);

        containerProdutos.appendChild(cardProduto);
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

      exibirProdutos(data);
    })
    .catch((error) => {
      console.error("Erro ao carregar produtos:", error);
    });
});