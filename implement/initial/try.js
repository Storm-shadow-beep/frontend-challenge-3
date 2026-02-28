const para = document.getElementById("para")
const icon = document.getElementById("img")
const head = document.getElementById("celeb-H")
const parag = document.getElementById("celeb-p")
para.style.filter = "blur(2px)"
const paragraph = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, voluptate. Doloribus, voluptate. Doloribus, voluptate. Doloribus, voluptate. Doloribus, voluptate. Doloribus, voluptate. Doloribus, voluptate. Doloribus, voluptate. Doloribus, voluptate. Doloribus, voluptate."
const char = paragraph.split('')

char.forEach(element => {
    const span = document.createElement('span')
    span.innerText = element
    span.classList.add('char')
    para.appendChild(span)
});