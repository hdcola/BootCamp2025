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
let AIgo = false

//让用户能依次下入棋子
boxes.forEach((box) => {
	box.addEventListener('click', () => {
		if (box.textContent === '' && gameActive) {
			box.textContent = currentPlayer
			const index = parseInt(box.id)
			makeAMove(index)
		}
	})
})

function makeAMove(ind) {
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
	bdStatus = Array.from(boxes).map((box) => box.textContent)
	return bdStatus
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

//对战AI助手-----------------------------------------------------------------

//找到空白格的方程
function findEmptyBlock() {
	let emptyBlock = []
	currentbdStatus = getBoardStatus()
	currentbdStatus.forEach((item, position) => {
		if (item === '') {
			emptyBlock.push(position)
		}
	})

	return emptyBlock
}

//随机落子的方程(先中间,再角落,后边边)
function RandomGo() {
	let emptyBlock = []
	let cornerSet = [0, 2, 6, 8]
	let availbleCorner = emptyBlock.filter((value) => cornerSet.includes(value))
	let sideSet = [1, 3, 5, 7]
	let availbleSide = emptyBlock.filter((value) => sideSet.includes(value))
	let GoPosition = -1
	emptyBlock = findEmptyBlock()
	// if (emptyBlock.length === 0) {
	// 	return
	// }
	if (emptyBlock.includes(4)) {
		GoPosition = 4
	}
	if (availbleCorner.length != 0) {
		GoPosition =
			availbleCorner[Math.floor(Math.random() * availbleCorner.length)]
	}
	if (availbleSide.length != 0) {
		GoPosition =
			availbleSide[Math.floor(Math.random() * availbleSide.length)]
	}
	return GoPosition
}

//寻找快要胜利的点位的方程

//统计能达成快要胜利的点位的方程.

//废柴AI: 随机下

//初级AI: 能赢就赢,能堵就堵,其他随机下

//中级AI: 初级AI+先走中间>角落>边边

//预胜利计划: 统计每个点位能形成几个快要胜利的点位

//高级AI:初级AI + 预胜利计划

//顶级AI: 高级AI+ 部分特殊情况的手动处理(应该不超过5个)
