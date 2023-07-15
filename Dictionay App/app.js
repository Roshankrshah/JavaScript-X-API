const result = document.getElementById('result');
const sound = document.getElementById('sound');
const btn = document.getElementById('search-btn');
const btnContainer = document.getElementById('btn-container');

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
            console.log(filterBtns)

            filterBtns.forEach((btn) => {
                btn.addEventListener("click", (e) => {
                    const idx = parseInt(e.currentTarget.dataset.id);
                    console.log(idx);
                    let displayDet = createContent(data, idx);
                    result.innerHTML = displayDet;
                    sound.setAttribute("src", `${data[0].phonetics[idx].audio}`);
                })
            })  
        })
        .catch(() => {
            console.log("fattu");
        })

    console.log(inpWord);
})

function playSound() {
    sound.play();
}