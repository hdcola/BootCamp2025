const boxes = document.querySelectorAll('.cell')
let currentPlayer = 'X'
const statusDisplay = document.getElementById('game-status')
const gamestatusDisplay1 = document.getElementById('game-status1')
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
let gameStatus = ''
let Xinclude = []
let Oinclude = []

//让用户能一次下入棋子
boxes.forEach((box) => {
	box.addEventListener('click', () => {
		if (box.textContent === '' && gameActive) {
			box.textContent = currentPlayer
			checkWinner()
			checkGameStatus()
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
	gamestatusDisplay1.textContent = ` Playing...`
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
			statusDisplay.textContent = `游戏结束`
			gameActive = false
			return boxes[a].textContent
		}
	}
	return null
}

//判断是否下满了
function checkBoardFull() {
	for (const box of boxes) {
		if (box.textContent === '') {
			return false // 直接结束函数并返回 false
		}
	}
	return true
}
//状态判断进行中;X赢;O赢;平局
function checkGameStatus() {
	const winner = checkWinner()
	if (winner) {
		gameStatus = winner === 'X' ? 'X' : 'O'
		gamestatusDisplay1.textContent = ` 玩家 ${winner} 获胜！`
		return true
	}
	if (checkBoardFull()) {
		gamestatusDisplay1.textContent = ` 平局!! 再战!`
		statusDisplay.textContent = `游戏结束`
		gameActive = false
		return true
	} else {
		return false
	}
}
