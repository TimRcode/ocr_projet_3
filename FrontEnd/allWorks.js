//stocker l'API
const apiWorks = "http://localhost:5678/api/works"

const apiCategories = "http://localhost:5678/api/categories"


async function getWorks(){

//recupère l'API
    const response =  await fetch(apiWorks)
    const datas = await response.json()

    //boucle pour afficher les éléments de l'API(Works)
    for(let data of datas){

        const gallery = document.querySelector(".gallery")

        const figure = document.createElement('figure')
        
        const img = document.createElement('img')
        img.src = data.imageUrl
        img.setAttribute("crossorigin", "anonymous")

        const figCaption = document.createElement('figcaption')
        figCaption.innerText = data.title
        
        gallery.appendChild(figure)

        figure.appendChild(img)
        figure.  appendChild(figCaption)     
        
    }

}

getWorks()


async function getCategories(){

    const response = await fetch(apiCategories)
    const datas = await response.json() 

    const ul = document.createElement("ul")

    const all = document.createElement("li")
    all.innerText = "Tous"


        for(let categorie of datas){
            const categories = document.querySelector(".categories")
        

        
        const li = document.createElement("li")
        li.innerText = categorie.name
            
        categories.appendChild(ul)
        ul.appendChild(all)
        ul.appendChild(li)
        
    }
 }

getCategories()


a