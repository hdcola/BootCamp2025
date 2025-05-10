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
	document.getElementById('processing').innerText = 'Game Start'
	show = []
}

function checkGuess() {
	guess0 = -1
	guess0 = document.getElementById('guess').value
	if (guess0 > 999 || guess0 < 0 || guess0 === '') {
		alert('please follow the rule!')
	} else if (guess0 > random_num) {
		show.push(guess0 + 'b')
		document.getElementById('result').innerText = show
		document.getElementById('processing').innerText =
			"It's too big please try again"
	} else if (guess0 < random_num) {
		show.push(guess0 + 's')
		document.getElementById('result').innerText = show
		document.getElementById('processing').innerText =
			"It's too small please try again"
	} else {
		show.push(guess0 + '!')
		document.getElementById('result').innerText = show
		document.getElementById('processing').innerText =
			'Congrats!!! You are correct!'
	}
}

restartGame()
