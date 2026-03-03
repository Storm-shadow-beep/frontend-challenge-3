import paragraph from '../../data.json' with {type: 'json'};

//nodes from the dom and other variables
const para = document.getElementById("para")
const icon = document.getElementById("img")
const head = document.getElementById("celeb-H")
const parag = document.getElementById("celeb-p")

let charIndex = 0
let mistakes = 0
let text = paragraph.easy[0].text
let char = text.split('')

para.style.filter = "blur(3px)"

const buttons = document.querySelectorAll('.bt')

char.forEach(element => {
        const span = document.createElement('span')
        span.innerText = element
        span.classList.add('char')
        para.appendChild(span)
});

//paragraph level logic
buttons.forEach(button => {
    button.addEventListener('click',()=>{
        const level = button.getAttribute('data-level');
        setFunc(level)
    })
})

function setFunc(n){
    charIndex = 0
    mistakes = 0
    let rando = Math.floor(Math.random()*10)
    text = "";
    if (n === 'easy') {
        text = paragraph.easy[rando].text
    }
    else if (n === 'medium') {
        text = paragraph.medium[rando].text
    }
    else{
        text = paragraph.hard[rando].text
    }

    para.innerHTML = "";
    char = text.split('')

    char.forEach(element => {
        const span = document.createElement('span')
        span.innerText = element
        span.classList.add('char')
        para.appendChild(span)
    });
}

//time logic
let start = document.querySelector('#start')
let startTime;
let timerInterval;
const timeDisplay = document.getElementById("time")

start.addEventListener('click',()=>{
    const who = document.querySelector('.who')
    who.style.display = "none"
    para.style.filter = "blur(0px)"
    startTimer();
})

function startTimer() {
    startTime = Date.now();
    
    timerInterval = setInterval(()=>
        { 
            const currentTime = Date.now();
            const elapsedTime = currentTime - startTime;
            const seconds = Math.floor(elapsedTime/1000);
            const milliseconds = Math.floor((elapsedTime % 1000) / 10);
            timeDisplay.innerText = `${seconds}: ${milliseconds.toString().padStart(2,'0')}`;


        },100
);

console.log("started");

}

function stopTimer() {
    clearInterval(timerInterval);
}

//typing logic

window.addEventListener('keydown',(e)=>{
    const characters = para.querySelectorAll('span')

    if (charIndex >= characters.length || characters.length === 0) {
        return
    }

    const typedChar = e.key
    const targetChar = characters[charIndex].innerText

    if(typedChar.length !== 1) return;

    if (typedChar === targetChar) {
        characters[charIndex].style.color = "green"
    }else{
        mistakes++
        characters[charIndex].style.color = "red"
    }

    charIndex++

    updateStats(characters.length)

    if(charIndex === characters.length){
        stopTimer()
        console.log('stopped')
    }
});

function updateStats(totalChars){
    let accuracy = Math.round(((charIndex - mistakes) / charIndex) * 100)
    document.getElementById('acc').innerText = accuracy > 0? accuracy:0;
}