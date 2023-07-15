const result = document.getElementById('result');
const sound = document.getElementById('sound');
const btn = document.getElementById('search-btn');

btn.addEventListener('click',(e)=>{
    e.preventDefault();
    let inpWord = document.getElementById('inp-word').value;
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${inpWord}`)
    .then((response) => response.json())
    .then((data)=>{
        
    })
    .catch(()=>{
        console.log("fattu");
    })
    
    console.log(inpWord);
})