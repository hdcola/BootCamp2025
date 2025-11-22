let arr = [];

function Add(){
    const input = document.getElementById("num1").value;
    const num = Number(input);

        if(isNaN(num)){
            document.getElementById("num1").value = "";
            return;
        }

        arr.push(num)
        Display()
}

function  Display(){
    document.querySelector('.textArea').textContent = arr.join("\n");
}

function ascend(){
arr.sort((a,b) => a - b );
  Display();
}
function descend(){
arr.sort((a,b) => b - a );
  Display();
}
function delet(){
    const input = document.getElementById("num1").value;
    const num = Number(input);
    arr = arr.filter(n => n !== num)
    Display();
}