const questionSlider = document.getElementById('questionSlider');
const questionCount = document.getElementById('questionCount');
const questionSelect = document.getElementById('questionSelect');
const radioButtons = document.querySelectorAll('input[name="questionOption"]');

let noOfQuestions =5;
let quesCategory = 9;
let quesDifficulty = 'easy'
questionCount.textContent = questionSelect.value;
questionSelect.addEventListener('change', () => {
    quesCategory = questionSelect.value;
});

questionCount.textContent = questionSlider.value;
questionSlider.addEventListener('input', () => {
  questionCount.textContent = questionSlider.value;
  noOfQuestions = questionCount.textContent;
});

radioButtons.forEach(radio => {
  radio.addEventListener('change', () => {
    quesDifficulty = radio.value;
  });
});

export {noOfQuestions, quesCategory,quesDifficulty};