import fetchques from "./data.js";
import display from "./displayQues.js";
import {setTime,stopTimer} from "./setTime.js";
import { noOfQuestions, quesCategory, quesDifficulty } from "./customParameters.js";

const defaultBtn = document.querySelector('.default-set');
const customizeBtn = document.querySelector('.customize-set');
const btnContainer = document.querySelector('.btn-container');
const infoContainer = document.querySelector('.info-container');
const customContainer = document.querySelector('.custom-container');
const resultContainer = document.querySelector('.result-container');
const startBtn = document.querySelector('.start');
const quizContainer = document.querySelector('.quiz-container');
const nextBtn = document.querySelector('.next-btn');
const optionsContainer = document.querySelector('.options');
const footer = document.querySelector('.total-ques');
const timer = document.querySelector('.time-left');
const continueBtn = document.querySelector('.continue-btn');

defaultBtn.addEventListener('click', () => {
    btnContainer.style.display = 'none';
    infoContainer.classList.add('active');
})

customizeBtn.addEventListener('click', () => {
    btnContainer.style.display = 'none';
    customContainer.classList.add('active');
})

continueBtn.addEventListener('click',()=>{
    totalQuestions = noOfQuestions;
    category = quesCategory;
    difficulty = quesDifficulty;
    console.log(totalQuestions, category,difficulty);
    customContainer.style.display = 'none';
    infoContainer.classList.add('active');
})


let quesIndex = 0;
let category = 9;
let difficulty = 'easy';
let data;
let correctAnswer = 0;
let time = 10;
let totalQuestions = 10;

const init = async () => {
    data = await fetchques(totalQuestions, category, difficulty);
    setTime();
    display(data.results[quesIndex]);
    displayFooter();
}

const displayResult = () => {
    resultContainer.innerHTML = `<p> You Completed the Quiz </br> You got ${correctAnswer} Out of ${totalQuestions}`;
}

const displayFooter = () => {
    footer.innerHTML = `<p><span>${quesIndex + 1}</span>Out of<span>${totalQuestions}</span></p>`;
}

nextBtn.addEventListener('click', () => {
    quesIndex++;
    stopTimer();
    timer.textContent = '10';
    optionsContainer.classList.remove('disabled');
    if (quesIndex < totalQuestions) {
        setTime();
        display(data.results[quesIndex]);
        displayFooter();
        
        if (quesIndex === totalQuestions-1) {
            nextBtn.textContent = 'Show Result';
        }
    }
    else {
        quizContainer.style.display = 'none';
        resultContainer.classList.add('active');
        displayResult();
    }
})

const checkAnswer = (answer) => {
    if (answer === data.results[quesIndex].correct_answer) {
        return true;
    }
}

optionsContainer.addEventListener('click', (e) => {
    console.log(e.target.textContent);
    const option = document.querySelectorAll('.option');

    if (e.target.classList.contains('option')) {
        stopTimer();
        if (checkAnswer(e.target.textContent)) {
            e.target.classList.add('correct');
            correctAnswer++;
        } else {
            e.target.classList.add('incorrect');
            option.forEach((item) => {
                if (item.textContent.includes(data.results[quesIndex].correct_answer))
                    item.classList.add('correct');
            })
        }
        optionsContainer.classList.add('disabled')
    }
})

startBtn.addEventListener('click', () => {
    infoContainer.classList.remove('active');
    quizContainer.style.display = 'block';
    init();
})
