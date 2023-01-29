//Stock API
const apiWorks = 'http://localhost:5678/api/works';
const apiCategories = 'http://localhost:5678/api/categories';

//Stock Function
let works = await getWorks()
let categories = await getCategories()

// API recovery
async function getWorks() {
    const response = await fetch(apiWorks);
    const works = await response.json();
    return works ;

}

async function getCategories() {
    const response = await fetch(apiCategories);
    const categories = await response.json();
    return categories;
}


//Gallery display in the DOM
function displayWorks(works){
    const gallery = document.querySelector(".gallery")
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


//Categories display in the DOM
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

// 
displayWorks(works)
displayCategories(categories)

//Add click for "Tous"
const all = document.getElementById("btn-all");
all.addEventListener("click", function() {
    document.querySelector('.gallery').innerHTML = "";
    displayWorks(works);
    
})

//Add click for other categories
const list = document.querySelectorAll('.btn-cat');
for(let li of list){
    li.addEventListener('click', function(event){
        event.preventDefault(event)  
            const filterWorks = works.filter(work => work.category.id === Number(li.id));
            document.querySelector('.gallery').innerHTML=""
            displayWorks(filterWorks)
    })
}

