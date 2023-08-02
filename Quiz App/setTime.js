const timer = document.querySelector('.time-left');
const optionsContainer = document.querySelector('.options');


let myInterval;
export function setTime() {
    let time = 10;
    myInterval = setInterval(myTimer, 1000);
    function myTimer() {
        time--;
        if (time === 0) {
            clearInterval(myInterval);
            optionsContainer.classList.add('disabled');
        }
        timer.innerHTML = time;
    }
}

export function stopTimer (){
    clearInterval(myInterval);
}
