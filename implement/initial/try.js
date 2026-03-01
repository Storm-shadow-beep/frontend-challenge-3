import paragraph from '../../data.json' with {type: 'json'};

const para = document.getElementById("para")
const icon = document.getElementById("img")
const head = document.getElementById("celeb-H")
const parag = document.getElementById("celeb-p")

para.style.filter = "blur(2px)"

const buttons = document.querySelectorAll('.bt')


//paragraph level logic
buttons.forEach(button => {
    button.addEventListener('click',()=>{
        const level = button.getAttribute('data-level');
        setFunc(level)
    })
})

function setFunc(n){
    let rando = Math.floor(Math.random()*10)
    let text = "";
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
    const char = text.split('')

    char.forEach(element => {
        const span = document.createElement('span')
        span.innerText = element
        span.classList.add('char')
        para.appendChild(span)
    });
}

//time logic

let startTime;
let timerInterval;
const timeDisplay = document.getElementById("time")

function startTimer() {
    startTime = Date.now();
    
    timerInterval = setInterval(()=>
        { 
            const currentTime = Date.now();
            const elapsedTime = currentTime - startTime;
            const seconds = Math.floor(elapsedTime/1000);
            const milliseconds = Math.floor((elapsedTime % 1000) / 10);
            timeDisplay.innerText = `${seconds}: ${milliseconds.toString().padStart(2,'0')}`;


        },10
);

console.log("started");

}

function stopTimer() {
    clearInterval(timerInterval);
}