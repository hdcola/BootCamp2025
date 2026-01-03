let count = 0;
const numberDisplay = document.getElementById('numbers');

function increase(){
    count++;
    numberDisplay.textContent = count;
}

function decrease(){
    count--;
    numberDisplay.textContent = count;
}