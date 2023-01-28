/*//stocker l'API
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
        figure.setAttribute("id", data.id)
        
        const img = document.createElement('img')
        img.src = data.imageUrl
        img.setAttribute("crossorigin", "anonymous")

        const figCaption = document.createElement('figcaption')
        figCaption.innerText = data.title
        
        gallery.appendChild(figure)

        figure.appendChild(img)
        figure.appendChild(figCaption)     
        
    }
    return datas

}



async function getCategories(){

    const response = await fetch(apiCategories)
    const datas = await response.json() 

    const ul = document.createElement("ul")

    const all = document.createElement("li")
    all.setAttribute("class", "btn-all")
    
    all.innerText = "Tous"


        for(let categorie of datas){
            const categories = document.querySelector(".categories")
        

        
        const li = document.createElement("li")
        li.setAttribute("id", categorie.id)
        

        li.innerText = categorie.name
            
        categories.appendChild(ul)
        ul.appendChild(all)
        ul.appendChild(li)
        
    }
 return datas
}
 
*/

let works = await getWorks()
let categories = await getCategories()

async function getWorks() {
    const response = await fetch('http://localhost:5678/api/works');
    const works = await response.json();
    return works ;

}

async function getCategories() {
    const response = await fetch('http://localhost:5678/api/categories');
    const categories = await response.json();
    return categories;
}

const gallery = document.querySelector(".gallery")
function displayWorks(works){

    for(let work of works){

        
        
        const figure = document.createElement('figure')
        
        
        const img = document.createElement('img')
        img.src = work.imageUrl
        img.setAttribute("crossorigin", "anonymous")

        const figCaption = document.createElement('figcaption')
        figCaption.innerText = work.title
        
        gallery.appendChild(figure)

        figure.appendChild(img)
        figure.appendChild(figCaption)
    }   
}
displayWorks(works)


function displayCategories(categories) {

    const ul = document.createElement("ul")

    const all = document.createElement("li")
    all.setAttribute("id", "btn-all")
    

    all.innerText = "Tous"


        for(let categorie of categories){
            const categories = document.querySelector(".categories")
        

        
        const li = document.createElement("li")
        li.setAttribute("id", categorie.id)
        li.setAttribute("class", "btn-cat")
        

        li.innerText = categorie.name
            
        categories.appendChild(ul)
        ul.appendChild(all)
        ul.appendChild(li)
        
    }
}
//btn§all
displayCategories(categories)



const all = document.getElementById("btn-all");
all.addEventListener("click", function() {
    document.querySelector('.gallery').innerHTML = "";
    displayWorks(works);

})

 const list = document.querySelectorAll('.btn-cat');

for(let li of list){
    li.addEventListener('click', function(event){
        event.preventDefault()  
          
 
            
            const filterWorks = works.filter(work => work.category.id === Number(li.id));
            gallery.innerHTML=""
            displayWorks(filterWorks)
            
        
    })
}

