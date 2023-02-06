const openModalBtn = document.querySelector('#modale-mod');
const myModal = document.querySelector('#myModal');
const closeBtn = document.querySelector('.close');

openModalBtn.addEventListener('click', function() {
  myModal.style.display = 'block';
});

closeBtn.addEventListener('click', function() {
  myModal.style.display = 'none';
});

window.addEventListener('click', function(e) {
  if (e.target === myModal) {
    myModal.style.display = 'none';
  }
});