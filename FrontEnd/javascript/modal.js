
import {getWorks} from './works.js';
let works = await getWorks()
const Auth = JSON.parse(localStorage.getItem("Auth"))



const publishButton = document.querySelector(".publier")

const btnModal = document.querySelector("#modal-mod")
const modal =document.querySelector('#modal')
const gallery = document.querySelector(".gallery-modal")


btnModal.addEventListener("click", event =>{
    event.preventDefault
    //la modal apparaît
    modal.style.display = "";
    //La galerie s'affiche q'une fois à chaque clic
    gallery.innerHTML =""
      //boucle pour afficher tous les works
      for(let work of works){
      
      const imageWrapper = document.createElement('div')
      imageWrapper.setAttribute('class', 'image-wrapper')

      const img = document.createElement('img')  
      img.src = work.imageUrl
      img.setAttribute("crossorigin", "anonymous")

      const bin = document.createElement('img')
      bin.setAttribute('class', 'bin')
      bin.src ="assets/images/bin.png"
      bin.setAttribute("crossorigin", "anonymous")

      const enlarge = document.createElement('img')
      enlarge.setAttribute('class', 'enlarge')
      enlarge.src = "assets/images/Move.Png"

      const editor = document.createElement('span')
      editor.innerHTML ="éditer"

      gallery.appendChild(imageWrapper)

      imageWrapper.appendChild(img)
      imageWrapper.appendChild(bin)
      imageWrapper.appendChild(editor)
      imageWrapper.appendChild(enlarge)

      bin.addEventListener("click", function() {
        // Suppression de l'imageWrapper parent
        imageWrapper.remove();
      });

      document.querySelector(".remove-gallery")
      .addEventListener("click", function() {
        // Suppression de l'imageWrapper parent
        imageWrapper.remove();
      });

      
      }
})  

function closeModal() {
  modal.style.display = "none";

}

const closeButton = document.querySelector("#modal .close");
closeButton.addEventListener("click", function() {
  closeModal();
});

document.addEventListener("keydown", function(event) {
  if (event.key === "Escape") {
    closeModal();
  }
});


modal.addEventListener("click", function(event) {
  if (event.target === modal) {
    closeModal();
  }
});

