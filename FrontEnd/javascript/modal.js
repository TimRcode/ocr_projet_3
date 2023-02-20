//Importation des modules
import { getWorks } from './works.js';
import { displayWorks } from './works.js';

//MODAL DELETE

const gallery = document.querySelector(".gallery-modal");
const publishButton = document.querySelector(".publier");
const btnModal = document.querySelector("#modal-mod");
const modal = document.querySelector('#modal');

//Récupération des oeuvres
const works = await getWorks();

let selectedWorks = [];


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
    //Suppression de l'oeuvre de la modal
    bin.addEventListener("click", event => {
      event.preventDefault()
      //Ajoute l'oeuvre supprimer au tableau
      selectedWorks.push(work.id);

      imageWrapper.remove();
    });
  }
}



const Auth = JSON.parse(localStorage.getItem("Auth"));
// Vérifier que l'utilisateur est authentifié
if (Auth && Auth.token) {
  btnModal.addEventListener("click", event => {
    event.preventDefault();
    modal.style.display = "";
    refreshWorks();
  });

  //
  publishButton.addEventListener("click", async function (e){
    e.preventDefault()
    //Pour chaque oeuvre sélectionnée, envoyer une requête DELETE au serveur
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
        console.log(index)
        if (index !== -1) {
          works.splice(index, 1);
        }
      closeModal()
      console.log(` suppression du travail ${id}`);
      } else {
        console.error(`Erreur lors de la suppression du travail ${id}`);
      }
    }
  displayWorks(works);
  });
}  

//fonction pour fermer la modal
function closeModal(){
  modal.style.display = "none";
  modalPost.style.display = "none";
    selectedWorks = [];
}

const closeButton = document.querySelectorAll(".close");
for(let a of closeButton){
a.addEventListener("click", event=>{
  event.preventDefault();
  closeModal();
});
}


modal.addEventListener("click", function(event) {
  event.preventDefault()
  if (event.target === modal) {
    closeModal();
  }
});




document.addEventListener("keydown", function(event) {
  event.preventDefault()
  if (event.key === "Escape") {
    closeModal();
  }
});


//MODAL POST

const addImage = document.querySelector("#add-image")
const modalPost = document.querySelector("#modal-post")

addImage.addEventListener("click" ,event =>{
  event.preventDefault
  modalPost.style.display="";
  modal.style.display="none";

})
modalPost.addEventListener("click", function(event) {
  event.preventDefault()
  if (event.target === modalPost) {
    closeModal();
  }
});

