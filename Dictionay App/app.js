const result = document.getElementById('result');
const sound = document.getElementById('sound');
const btn = document.getElementById('search-btn');
const btnContainer = document.getElementById('btn-container');

btn.addEventListener('click',(e)=>{
    e.preventDefault();
    let inpWord = document.getElementById('inp-word').value;
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${inpWord}`)
    .then((response) => response.json())
    .then((data)=>{
        //console.log(data[0]);

        const partofSpeechs = [];

        for(let i=0;i<data[0].meanings.length;i++){
            partofSpeechs.push(i);
        }
        const partofSpeechBtn = partofSpeechs.map((speech)=>{
            return `<button type='button' class="filter-btn"> ${data[0].meanings[speech].partOfSpeech}
            </button>`
        }).join("");
        console.log(partofSpeechBtn);
        btnContainer.innerHTML = partofSpeechBtn;
    })
    .catch(()=>{
        console.log("fattu");
    })
    
    console.log(inpWord);
})