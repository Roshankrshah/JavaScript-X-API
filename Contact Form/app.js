const form = document.getElementById('form');
const name = document.getElementById('name');
const email = document.getElementById('email');
const message = document.getElementById('message');

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    console.log("hi")
    form.reset();
})
