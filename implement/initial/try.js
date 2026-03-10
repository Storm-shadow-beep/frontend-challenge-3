import paragraph from '../../data.json' with {type: 'json'};

//nodes from the dom and other variables
const para = document.getElementById("para")
const icon = document.getElementById("img")
const head = document.getElementById("celeb-H")
const parag = document.getElementById("celeb-p")
const wpm = document.getElementById("wpm")
const initPage = document.getElementById("init")
const ath = document.getElementById("ATH")
const wpm1 = document.getElementById("wpm1")
const acc1 = document.getElementById("acc1")
const words = document.getElementById("words")
const best = document.getElementById("best")
const restart = document.getElementById("restart")
const dv_restart = document.getElementById("div_restart")
const dv_bt = document.getElementById("div")

//Other variables
let charIndex = 0
let mistakes = 0
let text;
let scores = []
let accuracy
let storedBest = 0
let char = false

para.style.filter = "blur(3px)"

const buttons = document.querySelectorAll('.bt')

window.onload = () => {
    storedBest = sessionStorage.getItem('myBest') || '0'
    if (storedBest) {
        best.innerHTML = storedBest
    }
    if (scores) {       
        scores = sessionStorage.getItem('storedArr') || '[]'
        scores = JSON.parse(scores)
    }
}
// char.forEach(element => {
    //         const span = document.createElement('span')
    //         span.innerText = element
    //         span.classList.add('char')
    //         para.appendChild(span)
    // });
    

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
    let char = text.split('')

    char.forEach(element => {
        const span = document.createElement('span')
        span.innerText = element
        span.classList.add('char')
        para.appendChild(span)
    });
}

//time logic
let WPM;
let start = document.querySelector('#start')
let startTime;
let timerInterval;
const timeDisplay = document.getElementById("time")
let seconds

start.addEventListener('click',()=>{
    if (char) {
        window.alert("Select a level first")
    }
    else{
        const who = document.querySelector('.who')
        who.style.display = "none"
        para.style.filter = "blur(0px)"
        dv_restart.style.display = "flex"
        startTimer();
    }
})

function startTimer() {
    startTime = Date.now();
    
    timerInterval = setInterval(()=>
        { 
            const currentTime = Date.now();
            const elapsedTime = currentTime - startTime;
            seconds = Math.floor(elapsedTime/1000);
            const milliseconds = Math.floor((elapsedTime % 1000) / 10);
            timeDisplay.innerText = `${seconds}: ${milliseconds.toString().padStart(2,'0')}`;
        },100
);

console.log("started");

}


//typing logic

window.addEventListener('keydown',(e)=>{
    const characters = para.querySelectorAll('span')

    if (charIndex >= characters.length || characters.length === 0) {
        return
    }

    char = true
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

function updateStats(score){
    document.getElementById('acc').innerText = accuracy > 0? accuracy:0;
}

function checkScore(score,acc) {
    let highest = false
    initPage.style.display = "none"
    ath.style.display = "flex"
    if (scores.length === 0) {
        scores.push(score);
    }
    else{
        for (let index = 0; index < scores.length; index++) {
            console.log(scores[index]);
            
            if (score < scores[index]) {
                highest = false
                break
            }
            else if (scores[index] < score) {
                scores[index] = score
                highest = true
                console.log("1st")
                console.log("scores "+ scores[index]);
                
            }
            
        }
        if (highest) {
            icon.src = "../../assets/images/icon-new-pb.svg"
            head.innerHTML = "High Score Smashed!"
            parag.innerHTML = "You're getting faster. That was incredible typing."
            console.log("highest");
            
        }
        else{
            head.innerHTML = "Test Complete!"
            parag.innerHTML = "Solid run. Keep pushing to beat your high score."
            console.log("nice");
            
        }
    }
    wpm1.innerHTML = score
    acc1.innerHTML = acc
    words.innerHTML = charIndex + "/5"
    best.innerHTML = `${scores[0]} WPM`
    storedBest = score? sessionStorage.setItem("myBest",scores[0] + " WPM") : 0;
    sessionStorage.setItem("storedArr",JSON.stringify(scores))

}

function stopTimer() {
    clearInterval(timerInterval);
    console.log(charIndex);
    let minutes = seconds/60
    console.log(seconds)
    WPM = Math.floor((charIndex/5)/minutes)
    wpm.innerText = WPM
    accuracy = Math.round(((charIndex - mistakes) / charIndex) * 100)
    checkScore(WPM,accuracy)
    
}

restart.addEventListener('click',()=>{
    window.location.reload();
})

dv_bt.addEventListener('click',()=>{
    window.location.reload();
})
