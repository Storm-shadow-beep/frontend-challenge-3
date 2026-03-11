let charIndex = 0;
let mistakes = 0;

// Update your setFunc to reset the index when a new level is picked
function setFunc(n) {
    charIndex = 0; // Reset index for new game
    mistakes = 0;
    // ... (your existing code to create spans)
}

window.addEventListener('keydown', (e) => {
    // 1. Get all the spans we created in setFunc
    const characters = para.querySelectorAll('span');
    
    // 2. Prevent tracking if the game hasn't started or text isn't loaded
    if (charIndex >= characters.length || characters.length === 0) return;

    // 3. Logic for the key pressed
    const typedChar = e.key;
    const targetChar = characters[charIndex].innerText;

    // Ignore "Meta" keys like Shift, CapsLock, etc.
    if (typedChar.length !== 1) return;

    if (typedChar === targetChar) {
        // Correct!
        characters[charIndex].classList.add('correct');
        characters[charIndex].style.color = "#4ade80"; // Green
    } else {
        // Wrong!
        mistakes++;
        characters[charIndex].classList.add('incorrect');
        characters[charIndex].style.color = "#ef4444"; // Red
        characters[charIndex].style.textDecoration = "underline";
    }

    // Move to the next character
    charIndex++;

    // 4. Update Accuracy and check for completion
    updateStats(characters.length);

    if (charIndex === characters.length) {
        stopTimer();
        console.log("Finished!");
        // You can trigger your celeb-H section here
    }
});

function updateStats(totalChars) {
    // Accuracy = ((Total - Mistakes) / Total) * 100
    let accuracy = Math.round(((charIndex - mistakes) / charIndex) * 100);
    document.getElementById("acc").innerText = accuracy > 0 ? accuracy : 0;
}

if (e.key === "Backspace" && charIndex > 0) {
    charIndex--;
    characters[charIndex].classList.remove('correct', 'incorrect');
    characters[charIndex].style.color = ""; // Reset color
    characters[charIndex].style.textDecoration = "";
    return; // Don't run the rest of the comparison logic
}