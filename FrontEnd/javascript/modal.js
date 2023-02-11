
import {getWorks} from './works.js';
let works = await getWorks()
const Auth = JSON.parse(localStorage.getItem("Auth"))
const closeButton = document.querySelector(".close-button")
const btnModal = document.querySelector("#modal-mod")
const modal =document.querySelector('#modal')
const gallery = document.querySelector(".gallery-modal")



btnModal.addEventListener("click", function(e){
    e.preventDefault
    modal.style.display = "";

   
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
         
      gallery.appendChild(imageWrapper)
      imageWrapper.appendChild(img)
      imageWrapper.appendChild(bin)
      }
})  

/*/for(let work of works){
        
        const a = work.imageUrl
        console.log(a)
        }*/