let numArray =[];

function calArray(){
const text = document.getElementById("num1").value;
numArray =[];

const part = text.split(",");

for(let i = 0; i < part.length ; i++){
    numArray.push(Number(part[i]));
}


document.getElementById("result").innerHTML = "";
 document.getElementById("numbers").textContent = "Array " + numArray;

const arrayButtonDiv = document.getElementById("arrayButton");
arrayButtonDiv.innerHTML = `
    <button onclick = "calAverage()">Average</button>
    <button onclick = "Min()">Min</button>
    <button onclick = "Max()">Max</button>
    <button onclick = "Count()">Count</button>;
`
}



function calAverage(){

    if(numArray === 0){
        numbers = "convert array first";
    }
    
    const avg = calculateAverage(numArray);
document.getElementById("result").textContent = "Average " + avg;


}

function calculateAverage(arr){
return (arr.reduce((a,b) => a + b, 0) / arr.length)


}

function Min(){

    document.getElementById("result").textContent = "min =" + Math.min(...numArray)

}


function Max(){

    document.getElementById("result").textContent = "max =" + Math.max(...numArray)

}

function Count(){
        document.getElementById("result").textContent = "count =" + numArray.length;

}


