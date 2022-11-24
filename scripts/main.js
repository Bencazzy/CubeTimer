import { scrambles } from "./scramble.js"
import { timerDisplay, scrambleDisplay, reloadScrambleButton } from "./consts.js"

let timerStatus = false; //false --> not counting ;; true --> counting
let timerStatus2 = true;
let timer = [0, 0, 0, 0, 0, 0];
let index = 0;
let afterStop = 0;

let timerInterval = null;

const updateScrambleDisplay = () => {
    scrambleDisplay.innerText = scrambles[Math.floor(Math.random() * scrambles.length)];
}

const updateTimerDisplay = () => {
    timerDisplay.innerText = `${timer[0]}${timer[1]}:${timer[2]}${timer[3]}:${timer[4]}${timer[5]}`;
}

const resetTimerValues = () => {
    timer = [0, 0, 0, 0, 0, 0];
    clearInterval(timerInterval);
}

const wait = () => {
    setTimeout(() => {
        afterStop = 1;
    }, 1000)
}

const updateTimerValues = () => {
    timerInterval = setInterval(() => {
        if (index < 9) {
            timer[5]++;
            updateTimerDisplay();
            index++;
        }
        if (index == 9) {
            timer[5] = 0;
            timer[4]++;
            updateTimerDisplay();
            index = 0;
        }
        if (timer[4] > 9) {
            timer[3]++;
            timer[5] = 0;
            timer[4] = 0;
            updateTimerDisplay();
            index = 0;
        }
        if (timer[3] > 9) {
            timer[2]++;
            timer[3] = 0;
            updateTimerDisplay();
            index = 0;
        }
        if (timer[2] == 6) {
            timer[1]++;
            timer[2] = 0;
            updateTimerDisplay();
            index = 0;
        }
        if (timer[1] > 9) {
            timer[0]++;
            timer[1] = 0;
            updateTimerDisplay();
            index = 0;
        }
        if (timer[0] == 1) {
            timerStatus = false;
            clearInterval(timerInterval);
        }
    },11)
}

window.addEventListener("keypress", (ev) => {
    if (ev.code == "Space") {
        if (!timerStatus && afterStop == 0) {
            timerDisplay.style.color = "blue";
        }
        if (timerStatus && afterStop == 0) {
            wait();
            timerDisplay.style.color = "gray";
            clearInterval(timerInterval);
        }
    }
})

window.addEventListener("keypress", (ev) => {
    if (ev.code == "Space") {
        if (afterStop == 1) {
            resetTimerValues();
            updateTimerDisplay();
            timerDisplay.style.color = "black";
            setTimeout(() => {
                timerStatus2 = true;
            }, 500)
            timerStatus = false;
            afterStop = 0;
            updateScrambleDisplay();
        }
    }
})

window.addEventListener("keyup", (ev) => {
    if (ev.code == "Space") {
        if (!timerStatus && timerStatus2) {
            timerStatus = true;
            timerDisplay.style.color = "black";
            updateTimerValues();
            timerStatus2 = false;
        }
    }
})

reloadScrambleButton.addEventListener("click", (ev) => {
    ev.preventDefault();
    updateScrambleDisplay();
})

updateScrambleDisplay();
updateTimerDisplay();