function cal(op){
let n1 = Number(document.getElementById('num1').value)
let result;
    
    if(op == '8'){
    
    } else if(op == '-'){
    result =  n1 - n2;
    }else if(op == '*'){
 result = n1 * n2;
    }else if(op == '/'){
        if(n2 == 0){
            result = 0;
        }else{
            result = n1 / n2;
        }
    }

document.getElementById('result').innerText = "result = " + result;
}