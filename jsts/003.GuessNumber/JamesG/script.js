// function greet() {
// 	alert('你好，主人！')
// }

// function showTime() {
// 	const now = new Date()
// 	document.getElementById('time').innerText =
// 		'现在是：' + now.toLocaleTimeString()
// }

function restartGame() {
	random_num = Math.floor(Math.random() * 1000)
	document.getElementById('result').innerText = 'please guess'
}

function checkGuess() {
	guess0 = -1
	guess0 = document.getElementById('guess').value
	if (guess0 > random_num) {
		document.getElementById('result').innerText = guess0 + ' too big'
	} else if (guess0 < random_num) {
		document.getElementById('result').innerText = guess0 + ' too small'
	} else {
		document.getElementById('result').innerText =
			guess0 + ' you are right!!'
	}
}
