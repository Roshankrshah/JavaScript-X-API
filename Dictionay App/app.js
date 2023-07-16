const result = document.getElementById('result');
const sound = document.getElementById('sound');
const btn = document.getElementById('search-btn');
const btnContainer = document.getElementById('btn-container');

function syno(synList){
    if(synList.length == 0)
        return "";
    
    let synAns = "Synonyms: ";
    let i = 0;
    for(;i<synList.length-1;i++){
        synAns += synList[i] + "/ ";
    }
    synAns += synList[i];
    return synAns;
}

function anto(antoList){
    if(antoList.length == 0)
        return "";
    
    let antoAns = "Antonyms: ";
    
    let i = 0;
    for(;i<antoList.length-1;i++){
        antoAns += antoList[i] + "/ ";
    }
    antoAns += antoList[i];
    return antoAns;
}

function createContent(data, idx) {
    return `
    <div class="word">
        <h3>${data[0].word}</h3>
        <button onclick="playSound()">
            <i class="fas fa-volume-up"></i>
            </button>
        </div>
        <div class="details">
            <p>${data[0].meanings[idx].partOfSpeech}</p>
            <p>/${data[0].phonetic || ""}/</p>
        </div>
        <p class="word-meaning">
            ${data[0].meanings[idx].definitions[0].definition}
        </p>
        <p class="word-synonym">
            ${syno(data[0].meanings[idx].synonyms)}
        </p>
        <p class="word-antonym">
            ${anto(data[0].meanings[idx].antonyms)}
        </p>
        <p class="word-example">
            ${data[0].meanings[idx].definitions[0].example || ""}
        </p>`;
}

btn.addEventListener('click', (e) => {
    e.preventDefault();
    let inpWord = document.getElementById('inp-word').value;

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${inpWord}`)
        .then((response) => response.json())
        .then((data) => {
            //console.log(data[0]);

            const partofSpeechs = [];

            for (let i = 0; i < data[0].meanings.length; i++) {
                partofSpeechs.push(i);
            }
            const partofSpeechBtn = partofSpeechs.map((speech) => {
                return `<button type='button' class="filter-btn" data-id="${speech}"> ${data[0].meanings[speech].partOfSpeech}
            </button>`
            }).join("");

            //console.log(partofSpeechBtn);

            btnContainer.innerHTML = partofSpeechBtn;
        
            const filterBtns = btnContainer.querySelectorAll(".filter-btn");
            
            let displayDet = createContent(data, 0);
            result.innerHTML = displayDet;

            let soundIdx;
            for(let i=0;i<data[0].phonetics.length;i++){
                if(data[0].phonetics[i].audio){
                    soundIdx = i;
                    break;
                }
            }
            sound.setAttribute("src", `${data[0].phonetics[soundIdx].audio}`);

            filterBtns.forEach((btn) => {
                btn.addEventListener("click", (e) => {
                    const idx = parseInt(e.currentTarget.dataset.id);
                    displayDet = createContent(data, idx);
                    result.innerHTML = displayDet;
                    sound.setAttribute("src", `${data[0].phonetics[soundIdx].audio}`);
                })
            })  
        })
        .catch(() => {
            btnContainer.innerHTML = "";
            if(inpWord.length == 0){
                result.innerHTML = `<h3 class="error">The input field cannot be empty</h3>`;
            }
            else{
                result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
            }
        })
})

function playSound() {
    sound.play();
}