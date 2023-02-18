//fichier works.js
import { getWorks } from './works.js';
 import { displayWorks } from './works.js';
// données de la clée de connexion
const Auth = JSON.parse(localStorage.getItem("Auth"));


//DOM
const publishButton = document.querySelector(".publier");
const btnModal = document.querySelector("#modal-mod");
const modal = document.querySelector('#modal');
const gallery = document.querySelector(".gallery-modal");

let selectedWorks = [];
const works = await getWorks();



async function refreshWorks() {
 

  gallery.innerHTML = "";
  for (const work of works) {
    const imageWrapper = document.createElement('div');
    imageWrapper.setAttribute('class', 'image-wrapper');

    const img = document.createElement('img');
    img.src = work.imageUrl;
    img.setAttribute("crossorigin", "anonymous");

    const bin = document.createElement('img');
    bin.setAttribute('class', 'bin');
    bin.src = "assets/images/bin.png";
    bin.setAttribute("crossorigin", "anonymous");

    const enlarge = document.createElement('img');
    enlarge.setAttribute('class', 'enlarge');
    enlarge.src = "assets/images/Move.Png";

    const editor = document.createElement('span');
    editor.innerHTML = "éditer";

    imageWrapper.appendChild(img);
    imageWrapper.appendChild(bin);
    imageWrapper.appendChild(editor);
    imageWrapper.appendChild(enlarge);
    gallery.appendChild(imageWrapper);

    bin.addEventListener("click", event => {
      event.preventDefault()
      selectedWorks.push(work.id);
      imageWrapper.remove();
      
    });
  }
}




if (Auth && Auth.token) {
  btnModal.addEventListener("click", event => {
    event.preventDefault();
    modal.style.display = "";
    refreshWorks();
    
    
  });

  
  publishButton.addEventListener("click", async function (e){
   e.preventDefault()
   
    for (const id of selectedWorks) {
      const response = await fetch(`http://localhost:5678/api/works/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${Auth.token}`
        }
        
      });
      if (response.ok) {
        const index = works.findIndex(work => work.id === id);
        if (index !== -1) {
          works.splice(index, 1);
        }
      closeModal();
      } else {
        console.error(`Erreur lors de la suppression du travail ${id}`);
      }
        
 refreshWorks();
 
    }
    const updatedWorks = await getWorks();

  // Affiche les éléments restants
  displayWorks(updatedWorks);
  
  });
      
 
}  



function closeModal(){
  modal.style.display = "none";
}

const closeButton = document.querySelector("#modal .close");
closeButton.addEventListener("click", event=>{
  event.preventDefault()

  closeModal() 
});

document.addEventListener("keydown", function(event) {
  event.preventDefault()
  if (event.key === "Escape") {
    closeModal();

  }
});

modal.addEventListener("click", function(event) {
  event.preventDefault()
  if (event.target === modal) {
    closeModal();

  }
});
