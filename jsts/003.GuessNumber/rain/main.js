let randomNumber = Math.floor(Math.random()*100) + 1
let attempts = document.getElementById("attempts")
const input = document.getElementById('num1')
const hint = document.getElementById('hint')
let history = []

input.addEventListener("keydown", function(event) {

    if(event.key == "Enter"){
        const guess = Number(input.value)
        
        

        if(!guess || guess < 1 || guess > 100){
            hint.textContent ="Error"
        }else if(guess > randomNumber){
            hint.textContent ="Too big"
        }else if(guess < randomNumber){
            hint.textContent ="Too small"
        }else if(guess === randomNumber){
            hint.textContent ="Congrate"
        }
        
        input.value = ""


        history.push(guess)
         attempts.innerHTML = history.join(",")
    }
    
    

   

});

function restart(){
    randomNumber = Math.floor(Math.random()*100) + 1
    attempCount = 0;
    attempts.textContent = ""
    hint.textContent =""
    input.value = ""

}