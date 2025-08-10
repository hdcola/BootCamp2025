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
let gameHistory = []
let stepNum = 0

//让用户能依次下入棋子
boxes.forEach((box) => {
	box.addEventListener('click', () => {
		if (box.textContent === '' && gameActive) {
			box.textContent = currentPlayer
			const index = parseInt(box.id)
			afterAMove(index)
		}
	})
})

function afterAMove(ind) {
	if (gameHistory.length === 0 || gameHistory.length === stepNum) {
		checkWinner()
		recordMove(ind, currentPlayer)

		currentPlayer = gameHistory[stepNum].player === 'X' ? 'O' : 'X'
		stepNum += 1
		buildHistlist()
		console.log('当前游戏记录：', gameHistory)
		checkGameStatus()

		updateStatus()
	} else {
		gameHistory.length = stepNum
		checkWinner()
		recordMove(ind, currentPlayer)

		currentPlayer = gameHistory[stepNum].player === 'X' ? 'O' : 'X'
		stepNum += 1
		buildHistlist()
		console.log('当前游戏记录：', gameHistory)
		checkGameStatus()
		updateStatus()
	}
}

//用于记录下棋步骤和棋盘状态,存在gameHistory中
function recordMove(index, player) {
	const move = {
		step: gameHistory.length + 1,
		player: player,
		position: index,
		boardStatus: getBoardStatus(),
		gameAct: gameActive,
	}
	gameHistory.push(move)
}

function getBoardStatus() {
	return Array.from(boxes).map((box) => box.textContent)
}
//-------------------------------------------------------------------

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
//--------------------------------------------

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
	stepNum = 0
	gameHistory = []
	document.getElementById('stepshows').innerHTML = ''
	const origon = document.createElement('div')
	origon.textContent = `第0步,游戏开局`
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
		gamestatusDisplay1.textContent = ` Playing.....`
		statusDisplay.textContent = `当前玩家: ${currentPlayer}`
		gameActive = true
		return false
	}
}

function addAGameRecord(themove) {
	const newDiv = document.createElement('div') // 创建 div
	newDiv.textContent = `第${themove.step}步: 玩家${themove.player}` // 添加文字
	newDiv.className = 'stepShow' // 添加 class（可选）

	newDiv.addEventListener('click', () => {
		boxes.forEach((box, index) => {
			box.textContent = themove.boardStatus[index]
		})
		gameActive = themove.gameAct
		stepNum = themove.step
		currentPlayer = themove.player === 'X' ? 'O' : 'X'
	})
	document.getElementById('stepshows').appendChild(newDiv) // 插入
}

function buildHistlist() {
	document.getElementById('stepshows').innerHTML = ''
	const origon = document.createElement('div')
	origon.textContent = `第0步,游戏开局`
	document.getElementById('stepshows').appendChild(origon)
	gameHistory.forEach((hist) => {
		addAGameRecord(hist)
	})
}
