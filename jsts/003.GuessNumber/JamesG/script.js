function greet() {
	alert('你好，主人！')
}

function showTime() {
	const now = new Date()
	document.getElementById('time').innerText =
		'现在是：' + now.toLocaleTimeString()
}

function restartGame() {
	random_num = Math.floor(Math.random() * 1000)
	document.getElementById('result').innerText = random_num
}

function checkGuess() {
	guess0 = -1
	guess0 = document.getElementById('guess').value
	document.getElementById('result').innerText = guess0
}
