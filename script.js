// Basic game setting
let min = 1;
let max = 10;
let ans = randomNum(min, max);
let guessLeft = 3;
let greenColor = '#2ecc71';
let redColor = '#e74c3c';
// UI selection
const game = document.querySelector('#game');
const minNum = document.querySelector('.minNum');
const maxNUm = document.querySelector('.maxNum');
const btn = document.querySelector('#guessBtn');
const guess = document.querySelector('#guessInput');
const msg = document.querySelector('.message');
// Information setting
minNum.textContent = min;
maxNUm.textContent = max;
// Set focus on input field when page's DOM is loaded
window.addEventListener('DOMContentLoaded', function() {guess.focus();});
// Event listener for submitting answer
btn.addEventListener('click', function(e) {
    e.preventDefault();
    if (btn.value === 'Try again!') {
        // Reset everything
        guess.disabled = false;
        guess.value = "";
        guess.focus();
        guess.style.borderColor = '';
        msg.style.color = '';
        guessLeft = 3;
        ans = randomNum(min, max);
        console.log(ans);
        msg.textContent = 'Number can only be positive integer';
        btn.value = "Submit";
    } else {
        guess.focus();
        let guessInput = parseInt(guess.value);
        if (isNaN(guessInput) || guessInput < min || guessInput > max) { // When user's input is out of range
            guess.value = "";
            setMessage(`Please enter a number between ${min} and ${max}`, redColor);
        } else if (guessInput === ans) { // When user guess the correct number - Game Over and win
            gameOver(true, `The correct number is ${ans}. You WON!`);
            btn.value = "Try again!"; // Change the button to a reset button
        } else {
            guessLeft--;
            if (guessLeft > 0) { // When user's input is incorrect
                guess.value = "";
                guess.style.borderColor = redColor;
                if (guessLeft > 1) { // When the remaining number of guessing is plural
                    setMessage(`${guessInput} is incorrect, you have ${guessLeft} guesses left`, redColor);
                } else { //when the remaining number of guess is singular
                    setMessage(`${guessInput} is incorrect, you have ${guessLeft} guess left`, redColor);
                }
            } else { // When remaining number of guess is zero - Game Over and lose
                gameOver(false, `Game over, the correct number is ${ans}`);
                btn.value = 'Try again!'
            }
        }
    }
})
// Display the result message below the input field
function setMessage(message, color) {
    msg.textContent = message;
    msg.style.color = color;
}
// Game over situation for both win or lose
function  gameOver(won, message) {
    won ? color = greenColor : color = redColor;
    guess.disabled = true;
    guess.style.borderColor = color;
    setMessage(message, color);
}
// Generate a random number base on the min and max number
function randomNum(min, max) {
    return Math.floor(Math.random() * (max-min+1)) + min;
}