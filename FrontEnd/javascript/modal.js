import { getWorks } from './works.js';
const Auth = JSON.parse(localStorage.getItem("Auth"));
//
const publishButton = document.querySelector(".publier");
const btnModal = document.querySelector("#modal-mod");
const modal = document.querySelector('#modal');
const gallery = document.querySelector(".gallery-modal");
//
let works = [];
let selectedWorks = [];

async function refreshWorks() {
  works = await getWorks();
  selectedWorks = [];
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

  publishButton.addEventListener("click", async function (event){
        event.preventDefault()

    for (const workId of selectedWorks) {
      const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${Auth.token}`
        }
      });
      if (response.ok) {
        console.log(`Travail ${workId} supprimé`);
      } else {
        console.error(`Erreur lors de la suppression du travail ${workId}`);
      }
    }
    closeModal();
  });
}

function closeModal() {
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
