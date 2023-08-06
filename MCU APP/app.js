import { ts, public_key, hash_key } from './data.js';
let input = document.getElementById('input-box');
let button = document.getElementById('submit-button');
let showContainer = document.getElementById('show-container');
let listContainer = document.querySelector('.list');

function removeElement() {
    listContainer.innerHTML = "";
}

input.addEventListener('keyup', async () => {
    removeElement();
    if (input.value.length < 4) {
        return false;
    }

    const url = `http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${public_key}&hash=${hash_key}&nameStartsWith=${input.value}`;

    const response = await fetch(url);
    const characters = await response.json();
    //console.log(characters.data["results"]);
    characters.data['results'].forEach((character) => {
        let name = character.name;
        let div = document.createElement("div");
        div.style.cursor = "pointer";
        div.classList.add("autocomplete-items");
        div.setAttribute("data-id", character.name);
        let word = "<b>" + name.substr(0, input.value.length) + "</b>";
        word += name.substr(input.value.length);
        div.innerHTML = `<p class="item">${word}</p>`;
        listContainer.appendChild(div);
    });

    const listEle = document.querySelectorAll('.autocomplete-items');
    listEle.forEach((ele) => {
        ele.addEventListener('click', (e) => {
            input.value = e.currentTarget.dataset.id;
            removeElement();
            display();
        })
    })
});

async function display(){
    removeElement();
    let value = input.value.trim();
    if(value.length<1){
        alert("Please Provide Input Value");
        return;
    }
    showContainer.innerHTML ="";

    const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${public_key}&hash=${hash_key}&name=${value}`

    try{
        const response = await fetch(url);
        const character = await response.json();
        
        showContainer.innerHTML = `
        <div class="card-container">
            <div class="container-character-image img">
                <img src= "${character.data.results[0].thumbnail.path}.${character.data.results[0].thumbnail.extension}"/>
            </div>
            <div class="character-name">${character.data.results[0].name}</div>
        <div class="character-description">${character.data.results[0].description}</div>`;
    }catch(error){
        showContainer.innerHTML = '<div class="error">Your search did not matched any character<br/>Hint: You can choose similar character from dropdown option</div>'
    }
}
button.addEventListener('click',display);

window.addEventListener('DOMContentLoaded',display);