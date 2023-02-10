
import {getWorks} from './works.js';
let works = await getWorks()
const Auth = JSON.parse(localStorage.getItem("Auth"))
const closeButton = document.querySelector(".close-button")
const btnModal = document.querySelector("#modal-mod")
const modal =document.querySelector('#modal')
const gallery = document.querySelector(".img-gallery-modal")



btnModal.addEventListener("click", function(e){
    e.preventDefault
    modal.style.display = "";

   
      for(let work of works){
      const a = document.createElement('img')  
      a.src = work.imageUrl
      a.setAttribute("crossorigin", "anonymous")
      gallery.appendChild(a)
   }
})  

/*/for(let work of works){
        
        const a = work.imageUrl
        console.log(a)
        }*/