const boxes = document.querySelectorAll('.cell')
let currentPlayer = 'X'
const statusDisplay = document.getElementById('game-status')
let gameActive = true
const winningCombination = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6], // 第⼀列
	[1, 4, 7], // 第⼆列
	[2, 5, 8], // 第三列
	[0, 4, 8], // 主对⻆线
	[2, 4, 6], // 副对⻆线
]
let Xinclude = []
let Oinclude = []

//让用户能一次下入棋子
boxes.forEach((box) => {
	box.addEventListener('click', () => {
		if (box.textContent === '' && gameActive) {
			box.textContent = currentPlayer
			checkWinner()
			currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
			updateStatus()
		}
	})
})

//用于可以更新玩家状态, 决定该谁来下棋
function updateStatus() {
	if (gameActive) {
		statusDisplay.textContent = `当前玩家: ${currentPlayer}`
		return
	}
}

//让用户可以重启游戏, 重新开始下棋
function restartGame() {
	boxes.forEach((box) => {
		box.textContent = ''
	})
	currentPlayer = 'X'
	statusDisplay.textContent = `当前玩家: ${currentPlayer}`
	gameActive = true
}

//判断谁赢了,并且某个人获胜之后无法再落子
function checkWinner() {
	for (let combination of winningCombination) {
		const [a, b, c] = combination
		if (
			boxes[a].textContent &&
			boxes[a].textContent === boxes[b].textContent &&
			boxes[a].textContent === boxes[c].textContent
		) {
			statusDisplay.textContent = `${currentPlayer} 获得胜利`
			gameActive = false
			return
		}
	}
	return null
}
