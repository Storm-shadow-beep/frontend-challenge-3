import paragraph from '../../data.json' with {type: 'json'};

const para = document.getElementById("para")
const icon = document.getElementById("img")
const head = document.getElementById("celeb-H")
const parag = document.getElementById("celeb-p")
const rando = Math.floor(Math.random()*10)
para.style.filter = "blur(2px)"
let text;

const buttons = document.querySelectorAll('.bt')

buttons.forEach(button => {
    button.addEventListener('click',()=>{
        const level = button.getAttribute('data-level');
        setFunc(level)
    })
})

function setFunc(n){
    if (n === 'easy') {
        text = paragraph.easy[rando].text
    }
    else if (n === 'medium') {
        text = paragraph.medium[rando].text
    }
    else{
        text = paragraph.hard[rando].text
    }
    const char = text.split('')

    char.forEach(element => {
        const span = document.createElement('span')
        span.innerText = element
        span.classList.add('char')
        para.appendChild(span)
    });
}
