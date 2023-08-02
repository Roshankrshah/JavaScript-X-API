const defaultBtn = document.querySelector('.default-set');
const customizeBtn = document.querySelector('.customize-set');
const btnContainer = document.querySelector('.btn-container');
const infoContainer = document.querySelector('.info-container');

defaultBtn.addEventListener('click',()=>{
    btnContainer.style.display = 'none';
    infoContainer.style.display = 'block';
})

customizeBtn.addEventListener('click',()=>{
    btnContainer.style.display = 'none';
    infoContainer.style.display = 'block';
})
