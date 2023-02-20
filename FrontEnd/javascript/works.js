//URLs des API
const apiWorks = 'http://localhost:5678/api/works';
const apiCategories = 'http://localhost:5678/api/categories';

//Récupére les données des œuvres depuis l'API
export async function getWorks() {
    const response = await fetch(apiWorks);
    const dataWorks = await response.json();
    return dataWorks;
}
//Récupére les données des catégories depuis l'API
async function getCategories() {
    const response = await fetch(apiCategories);
    const dataCategories = await response.json();
    return dataCategories;
}

//Affiche les oeuvres dans la galerie
export function displayWorks(works){
    const gallery = document.querySelector(".gallery")
    gallery.innerHTML = "";

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

//Affiche les catégories
function displayCategories(categories) {
    const ul = document.createElement("ul")

    const all = document.createElement("li")
    all.innerText = "Tous"
    all.setAttribute("id", "btn-all")
    all.classList.add("btn-cat")
    all.classList.add("active")
    
    for(let categorie of categories){
        const categories = document.querySelector(".categories")
        
        const li = document.createElement("li")
        li.setAttribute("id", categorie.id)
        li.classList.add("btn-cat")
        li.classList.add("cat-api")
        li.innerText = categorie.name

        categories.appendChild(ul)
        ul.appendChild(all)
        ul.appendChild(li) 
    }
}

//Récupèrent les données de l'API et stock le résultat dans une variable
let dWorks = await getWorks()
let dCategories = await getCategories()

//Affichent les données de l'API utilisant les données du paramètre 
displayWorks(dWorks)
displayCategories(dCategories)


//Affiche toutes les oeuvres en cliquant sur le bouton "tous"
const all = document.getElementById("btn-all");
all.addEventListener("click", function(event) {
    event.preventDefault()
    document.querySelector('.gallery').innerHTML = "";
    
    displayWorks(dWorks);
})

//Affiche les oeuvres de la catégories sélectionnée
const listApi = document.querySelectorAll('.cat-api');
for(let list of listApi){
    list.addEventListener('click', function(event){
        event.preventDefault();
        
            const filterWorks = dWorks.filter(work => work.category.id == list.id);
            
            document.querySelector('.gallery').innerHTML=""
            displayWorks(filterWorks)
            })     
}


//Permet d'ajouter le fond de couleur au bouton sélectionnée uniquement
const onClick = document.querySelectorAll('.btn-cat')
for ( let allCat of onClick){
        allCat.addEventListener('click', function(event){
            event.preventDefault();
                for(let allCatRemove of onClick){
                    allCatRemove.classList.remove('active')
                }
                allCat.classList.add('active')
            })
}

