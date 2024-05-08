
function descryptId(id) {
    return parseInt(id, 36);
}

async function loadCharacter(baseUrl, id){
    try {
        const response = await fetch(`${baseUrl}/${id}`)
        if(!response.ok){
            throw new error('Erro ao carregar o personagem')
        }
        return await response.json()
    } catch (error) {
        console.log(error)
        throw error
    }
}

async function load(){
    const ulrParams = new URLSearchParams(window.location.search)
    const idParam = ulrParams.get('id')

    if(!idParam){
        console.error('ID não encontrado na URL')
        return
    }

    const idDescrypted = descryptId(idParam)
    const ulrBase = `https://rickandmortyapi.com/api/character/`

    try {
        const character = await loadCharacter(ulrBase, idDescrypted)
        console.log('Character:', character)
    } catch (error) {
        console.error('Erro ao carregar o personagem')
    }
}

load()