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

// Função para transformar segundos no formato MM:SS
function formatNumberInStringMinute(number) {
    const minutes = Math.trunc(number / 60)
        .toString()
        .padStart(2, '0');

    const seconds = Math.trunc(number % 60)
        .toString()
        .padStart(2, '0');

    return `${minutes}:${seconds}`;
}

const startTimer = () => {
    progressInterval = setInterval(() => {
        timerValue--;
        setInfoCircularProgressBar();
}, 1000);
}

const stopTimer = () => clearInterval(progressInterval);

const resetTimer = () => {
    clearInterval(progressInterval);

    timerValue = (pomodoroType === TIMER_TYPE_POMODORO) 
    ? pomodoroTimeInSeconds 
        : shortBreakTimeInSeconds;

        multiplierFactor = 360 / timerValue;
    setInfoCircularProgressBar();
    audio.stop();

}

function setInfoCircularProgressBar(){

    if(timerValue === 0){
        stopTimer();
        audio.play();
    }

    circularProgressBarNumber.textContent = `${formatNumberInStringMinute(timerValue)}`;

    circularProgressBar.style.background = `conic-gradient(var(--blue) ${timerValue * multiplierFactor}deg, var(--purple) 0deg)`;
}

const setPomodoroType = (type) => {
    pomodoroType = type;

    if(type === TIMER_TYPE_POMODORO){
        buttonTypeShortBreak.classList.remove('active');
        buttonTypePomodoro.classList.add('active');
        
    }else{
        buttonTypePomodoro.classList.remove('active');
        buttonTypeShortBreak.classList.add('active');
    }

    resetTimer();
}

const addTaskButton = document.getElementById("add-task");
const taskInput = document.getElementById("new-task");
const taskList = document.getElementById("task-list");

addTaskButton.addEventListener("click", addTask);
taskList.addEventListener("click", handleTaskClick);

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const li = document.createElement("li");
  li.innerHTML = `
    <span>${taskText}</span>
    <button class="delete-task">🗑️</button>
  `;

  taskList.appendChild(li);
  taskInput.value = "";
}

function handleTaskClick(e) {
  const li = e.target.closest("li");

  if (e.target.classList.contains("delete-task")) {
    li.remove();
  } else {
    li.classList.toggle("completed");
  }
}