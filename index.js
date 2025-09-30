const circularProgressBar = document.querySelector('#circularProgressBar');
const circularProgressBarNumber = document.querySelector('#circularProgressBar .progress-value');
const buttonTypePomodoro = document.querySelector('#buttonTypePomodoro');
const buttonTypeShortBreak = document.querySelector('#buttonTypeShortBreak');

const audio = new Audio('alarm.mp3');
const pomodoroTimeInSeconds = 1500; //  60 seconds * 25 minutes
const shortBreakTimeInSeconds = 300; // 60 seconds * 5 minutes
const TIMER_TYPE_POMODORO = 'POMODORO';
const TIMER_TYPE_SHORT_BREAK = 'SHORT_BREAK';

let progressInterval; // Variavel que guarda o setInterval;
let pomodoroType = TIMER_TYPE_POMODORO; // Variavel que guarda o tipo do pomodoro
let timerValue =  pomodoroTimeInSeconds; // Variavel que guarda o tempo do pomodoro
let multiplierFactor = 360 / timerValue; // Variavel que guarda o fator de multiplicação para o progresso do circulo
 

// Função para trasnformar segundos no formato MM:SS

function formatNumberInStringMinute(number){

    const minutes = Math.trunc(number / 60);
                    .toString()
                    .padStart(2, '0');

    const seconds = math.trunc(number % 60);
                    .toString()
                    .padStart(2, '0');             

     return `${minutes}: ${seconds}`;               
}

const startTimer = () => {
    progressInterval = setInterval(() => {
        timerValue--;
}, 1000);
}

const stopTimer = () => clearInterval(progressInterval);

function setInfoCircularProgressBar(){

    if(timerValue === 0){
        stopTimer();
        audio.play();
    }

    circularProgressBarNumber.textContent = `${formatNumberInStringMinute(timerValue)}`;

    circularProgressBar.style.background = `${timerValue * multiplierFactor}`
}
