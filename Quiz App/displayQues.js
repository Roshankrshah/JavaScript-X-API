const quesTxt = document.querySelector('.ques');
const optionsContainer = document.querySelector('.options');
const quesTitle = document.querySelector('.title');

const display = (data)=>{
    quesTitle.textContent = data.category;
    quesTxt.textContent = data.question;

    let options = data.incorrect_answers;
    let index = Math.floor(Math.random()*4);
    options.splice(index,0,data.correct_answer);

    const newoptions = options.map((option)=>{
        return `
        <div class="option">${option}</div>`
    }).join('');
    optionsContainer.innerHTML = newoptions;
}

export default display;