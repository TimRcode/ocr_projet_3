const apiWorks = "http://localhost:5678/api/works"

async function getWorks(){

    const response =  await fetch(apiWorks)
    const datas = await response.json()

    const gallery = document.querySelector(".gallery")

    for(let data of datas)
    console.log(gallery)
}

getWorks()