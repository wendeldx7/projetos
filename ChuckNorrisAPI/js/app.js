document.addEventListener('DOMContentLoaded', ()=>{
    const url = 'https://api.chucknorris.io/jokes/categories'

    fetch(url)
    .then((response)=>{
        if(!response.ok){
            throw new Error('Erro ao receber os dados')
        }
        return response.json()
    })
    .then((data)=>{
        gerarCategory(data)
    })
    .catch((err)=>console.error(err))
});

function gerarCategory(categorias){
    const select = document.getElementById('select')
    categorias.map((categoria) => {
        const options = document.createElement('option')
        options.innerHTML = (categoria + '')
        options.value = categoria   

        select.appendChild(options)
    })
}
const btn = document.getElementById('btn')
btn.addEventListener('click', ()=>{
    const select = document.getElementById('select').value;
    const url = 'https://api.chucknorris.io/jokes/random?category='+select;
    fetch(url)
    .then((response)=>{
        if(!response.ok){
            throw new Error('erro ao selecionar uma piada')
        }
        return response.json()
    })
    .then((data)=>{
        gerarPiada(data)
    })
    .catch((err)=>console.error(err))
});
function gerarPiada(piada){
    const joke = document.getElementById('joke')
    joke.innerHTML = piada.value
}