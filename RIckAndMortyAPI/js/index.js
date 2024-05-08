//"characters": "https://rickandmortyapi.com/api/character",
//"locations": "https://rickandmortyapi.com/api/location",
//"episodes": "https://rickandmortyapi.com/api/episode"

const page = 5;
const baseUrl = 'https://rickandmortyapi.com/api'

//end-point necessários 
//requisição  de character
const loadCharacter = async () => {
  const res = await fetch(`${baseUrl}/character?page=${page}`);
  const data = await res.json()
  const limitdata = data.results.slice(0, 6)
  return { results: limitdata }

}
//requisição  de location
const loadLocation = async () => {
  const res = await fetch(`${baseUrl}/location`);
  return await res.json()
}
//requisição  de episode 
const loadEpisode = async () => {
  const res = await fetch(`${baseUrl}/episode`);
  return await res.json()
}

//função para executar todas as funções acima 

const loadAllWithPromiseAll = async () => {
  //criar uma array para todas as funções acima, ele vai esperar todas os paramentros 
  const [character, location, episode] = await Promise.all([
    loadCharacter(),
    loadLocation(),
    loadEpisode()
  ])
  //console para chamar todas funções, promisse.all - chamar todas as funções async criadas 
  //'console.log("Character:",character.results)' //results, esse results vem no console onde vamos puxar as informações - 
  //chamar somente os nomes dos personagens

  showCharacter(character.results) //função para executar todas as promisse do resultado
  console.log("Location:", location.results)
  console.log("Episode:", episode.results)

}

loadAllWithPromiseAll()

//função para os personagem - precisa recber a lista dos caracteres (results)
function showCharacter(characters) {
  //pegou o id para aparecer no html - na tela 
  const charactercontainer = document.getElementById("character-container")
  //character.map para listar todos os nomes 
  //characters.map((characters) => console.log(character))
  //MAP LISTAR TODOS OS NOMES 
  characters.map((character) => {
    //fazendo isso, podemos misturar o html no JS  criando um elemento, nesse caso é a div 
    const divCharacter = document.createElement('div')
    divCharacter.id = `character-${character.id}`
    divCharacter.innerHTML = `
          <img src="${character.image}" alt="Imagem do personagem"/>

          <article class="character-info">
            <div class="h1info">
              <h3>${character.name}</h3>
              <span class = "${character.status}">${character.status} - ${character.species}</span>
            </div>
            <div class="info">
              <span class="location">Location :<br></span>
              <a href="${character.location.url}">${character.location.name}</a>
            </div>
            <div class="info">
              <span class="origin">Origin :<br></span>
              <a href="${character.origin.url}">${character.origin.name}</a>
              </div>
          </article>
        `;
    //chamamos a div, atribuimos uma class e chamos ela para expor na tela do site
    divCharacter.classList.add('character-box')
    charactercontainer.appendChild(divCharacter)
    divCharacter.addEventListener('click', async() =>{
      characterDetails(character.id)
    })
  });
}
function characterDetails(id){
  const idCrypted = encryptID(id)
  window.location.href = `./pages/character.html?id=${idCrypted}`
}
function encryptID(id){
  return id.toString(36)
}
async function showLocation(character){

}