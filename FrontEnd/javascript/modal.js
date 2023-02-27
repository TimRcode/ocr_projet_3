


//Importation des modules
import { getWorks } from './works.js';
import { displayWorks } from './works.js';

//Récupération des oeuvres
const dWorks = await getWorks();
console.log(dWorks)
//Initialisation d'un tableau pour récupérer les "travaux" au clic de la corbeille
let selectedWorks = [];

const gallery = document.querySelector(".gallery-modal");

//fonction pour afficher les travaux dans la modal
 function refreshWorks() {
  gallery.innerHTML = "";
  for (const work of dWorks) {
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

const publishButton = document.querySelector(".publier");
const btnModal = document.querySelector("#modal-mod");
const modal = document.querySelector('#modal');

const Auth = JSON.parse(localStorage.getItem("Auth"));
// Vérifier que l'utilisateur est connecté
if (Auth && Auth.token) {
  btnModal.addEventListener("click", event => {
    event.preventDefault();
    modal.style.display = "";
    refreshWorks();
  });

  publishButton.addEventListener("click", async function (event){
    event.preventDefault()
    //Pour chaque oeuvre sélectionnée, envoyer une requête DELETE au serveur
    for (const id of selectedWorks) {
      console.log(id)
      const response = await fetch(`http://localhost:5678/api/works/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${Auth.token}`
        }
      });
      if (response.ok) {
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
                    const filterWorks = dWorks.filter(work => work.categoryId == list.id );
                    document.querySelector('.gallery').innerHTML=""
                    displayWorks(filterWorks)
                })     
        }
        //Parcourt les éléments du tableau dWorks
        //Si un des éléments de dWorks est égal au tableau selectedWorks, l'élément est supprimé
        const index = dWorks.findIndex(work => work.id === id);
        console.log(index)
        if (index !== -1) {
          dWorks.splice(index, 1);
        }
        
      } else {
        console.error(`Erreur lors de la suppression du travail ${id}`);
      }
    }
  closeModal();  
  displayWorks(dWorks);
  });
}  



//Partie qui ajoute les travaux
const imagePreview = document.getElementById('image-preview');
const openModalPost = document.querySelector("#add-image")
const modalPost = document.querySelector("#modal-post")
const fileInput = document.getElementById('file-input');
const p = document.querySelector('#form-img p');
console.log(p)
//Ouvre la modal qui permet d'ajouter des travaux
openModalPost.addEventListener("click" , event =>{
      event.preventDefault()
      modalPost.style.display="";
      modal.style.display="none";
      //Affiche l'image dans le input-file
      fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
          imagePreview.style.display="";
          const fileSize = file.size / 1024 / 1024; // Conversion de la taille en Mo
          if (fileSize > 4) {
            alert('Le fichier sélectionné est trop volumineux. Veuillez sélectionner un fichier de moins de 4 Mo.');
          } else {
            p.style.display="none"
            const imageUrl = URL.createObjectURL(file);
            imagePreview.src = imageUrl;
          }
        }
      });
})
      const form = document.getElementById('form-post');
      form.addEventListener('submit', async function(event) {
        event.preventDefault(); 
        //Récupère les valeurs des inputs
        const title = document.getElementById('form-title').value;
        const category = document.getElementById('categories-form').value;
        const imageFile = document.getElementById('file-input').files[0];
       
          
         
        if (title.length === 0 || category === '' || !imageFile) {
          console.error('erreur');
          return
        }
  
        const formData = new FormData();
        formData.append('title', title);
        formData.append('category', category);
        formData.append('image', imageFile);
      
        const response = await fetch("http://localhost:5678/api/works", {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${Auth.token}`
          },
          body: formData
          });
        
        if (response.ok) {
          let newWork = await response.json();
          dWorks.push(newWork)  

          const all = document.getElementById("btn-all");
          all.addEventListener("click", function(event) {
              event.preventDefault()
              document.querySelector('.gallery').innerHTML = "";
              displayWorks(dWorks);
          })

        const listApi = document.querySelectorAll('.cat-api');
        for(let list of listApi){
          list.addEventListener('click', function(event){
            event.preventDefault();
              const filterWorks = dWorks.filter(work => work.categoryId == list.id );
              document.querySelector('.gallery').innerHTML=""
              displayWorks(filterWorks);
            })     
          }

        displayWorks(dWorks)
        closeModal()
        }
      });


//Partie qui permet de fermer les différentes modal

//fonction pour fermer la modal
function closeModal(){
  modal.style.display = "none";
  modalPost.style.display = "none";
  imagePreview.style.display = 'none'; // Masquer l'aperçu de l'image
  fileInput.value = ''; // Réinitialiser le champ input-file
  document.getElementById('form-title').value='';
  document.getElementById('categories-form').value='';

  p.style.display=""
  selectedWorks = [];
}

document.addEventListener("keydown", function(event) {
  if (event.key === "Escape") {
    closeModal();
  }
});

const closeButton = document.querySelectorAll(".close");
for(let cross of closeButton){
cross.addEventListener("click", event=>{
  event.preventDefault();
  fileInput.value = ''; // Réinitialiser le champ input-file
  imagePreview.style.display = 'none'; // Masquer l'aperçu de l'image
  closeModal();

});
}


modal.addEventListener("click", function(event) {
  event.preventDefault()
  if (event.target === modal) {
    closeModal();
  }
});

modalPost.addEventListener("click", function(event) {
  if (event.target === modalPost) {
    
    closeModal();
  }
});

const backArrow = document.querySelector(".arrow-back")
backArrow.addEventListener("click", event =>{
  event.preventDefault()
  fileInput.value = ''; // Réinitialiser le champ input-file
  imagePreview.style.display = 'none'; // Masquer l'aperçu de l'image
  modalPost.style.display="none"
  modal.style.display=""
  p.style.display=""
  document.getElementById('form-title').value='';
  document.getElementById('categories-form').value='';


})
