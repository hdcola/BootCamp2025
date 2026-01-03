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
let isAIOn = true
let aiSide = 'O'
let aiThinking = false

//让用户能依次下入棋子
boxes.forEach((box) => {
	box.addEventListener('click', () => {
		if (
			box.textContent === '' &&
			gameActive &&
			currentPlayer !== aiSide && // 人类回合才允许点
			!aiThinking // AI 思考时禁点
		) {
			const index = parseInt(box.id)
			makeAMove(index) // ✅ DOM 改动统一在 makeAMove
		}
	})
})

function makeAMove(ind) {
	if (!gameActive) return

	// ✅ 在这里落子（无论人/AI）
	boxes[ind].textContent = currentPlayer

	if (gameHistory.length === 0 || gameHistory.length === stepNum) {
		checkWinner()
		recordMove(ind, currentPlayer)

		currentPlayer = gameHistory[stepNum].player === 'X' ? 'O' : 'X'
		maybePlayAI()
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
		maybePlayAI()
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
	const bdStatus = Array.from(boxes).map((box) => box.textContent)
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
		maybePlayAI()
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
function findEmptyBlocks() {
	let emptyBlocks = []
	const currentbdStatus = getBoardStatus()
	currentbdStatus.forEach((item, position) => {
		if (item === '') {
			emptyBlocks.push(position)
		}
	})

	return emptyBlocks
}

//找到某个棋子的位置------------------------------没用上,具体删不删一会再看
// function findTheBlock(thatone) {
// 	let thatSet = []
// 	const currentbdStatus = getBoardStatus()
// 	currentbdStatus.forEach((item, position) => {
// 		if (item === thatone) {
// 			thatSet.push(position)
// 		}
// 	})
// 	return thatSet
// }

//小规律落子的方程(先中间,再角落,后边边)
function midCornerSide() {
	let emptyBlocks = findEmptyBlocks()
	const cornerSet = [0, 2, 6, 8]
	const availbleCorner = emptyBlocks.filter((value) =>
		cornerSet.includes(value)
	)
	const sideSet = [1, 3, 5, 7]
	const availbleSide = emptyBlocks.filter((value) => sideSet.includes(value))
	if (emptyBlocks.length === 0) return -1
	if (emptyBlocks.includes(4)) return 4

	if (availbleCorner.length != 0) {
		return availbleCorner[Math.floor(Math.random() * availbleCorner.length)]
	}
	if (availbleSide.length != 0) {
		return availbleSide[Math.floor(Math.random() * availbleSide.length)]
	}
	return emptyBlocks[Math.floor(Math.random() * emptyBlocks.length)]
}

//让AI落子: AI能落子,且轮到AI落子,
function maybePlayAI() {
	if (isAIOn && gameActive && currentPlayer === aiSide && !aiThinking) {
		aiThinking = true

		setTimeout(() => {
			const aiIndex = midAIGo() // 只算位置的纯函数
			// 二次校验，防止期间被重开/回退
			if (gameActive && currentPlayer === aiSide && aiIndex !== -1) {
				makeAMove(aiIndex) // 或 makeAMove(aiIndex)（取决于你最终封装）
			}
			aiThinking = false
		}, 200)
	}
}

//寻找快要胜利的点位的方程
function findWinningMove(board, player) {
	for (let combo of winningCombination) {
		let [a, b, c] = combo

		let values = [board[a], board[b], board[c]]
		// 统计某个player的数量 和 空格的数量
		let playerCount = values.filter((v) => v === player).length
		let emptyCount = values.filter((v) => v === '').length

		if (playerCount === 2 && emptyCount === 1) {
			// 返回空格的位置
			if (board[a] === '') return a
			if (board[b] === '') return b
			if (board[c] === '') return c
		}
	}
	return null // 没有找到
}

//废柴AI: 中间 - 角落 - 边边

function StupidAIGo() {
	let emptyBlocks = findEmptyBlocks()
	const a = Math.random() * 2
	if (a <= 1.5) {
		return midCornerSide()
	}
	if (a > 1.5) {
		return emptyBlocks[Math.floor(Math.random() * emptyBlocks.length)]
	}
}

//初级AI: 能赢就赢,能堵就堵,其他随机下

function easyAIGo() {
	let emptyBlocks = findEmptyBlocks()
	const board = getBoardStatus()
	return (
		findWinningMove(board, aiSide) ??
		findWinningMove(board, aiSide === 'X' ? 'O' : 'X') ??
		emptyBlocks[Math.floor(Math.random() * emptyBlocks.length)]
	)
}

//中级AI: 初级AI+先走中间>角落>边边

function midAIGo() {
	const board = getBoardStatus()
	return (
		findWinningMove(board, aiSide) ??
		findWinningMove(board, aiSide === 'X' ? 'O' : 'X') ??
		StupidAIGo()
	)
}

//统计能达成快要胜利的点位的方程.

function seniorFindWinMove(board, player) {
	const emptyBlocks = findEmptyBlocks()

	for (goes of emptyBlocks.length - 1) {
		emptyBlocks[goes] = player === 'X' ? 'O' : 'X'
		seniorFindWinMove()
	}

	// for (let combo of winningCombination) {
	// 	let [a, b, c] = combo

	// 	let values = [board[a], board[b], board[c]]
	// 	// 统计某个player的数量 和 空格的数量
	// 	let playerCount = values.filter((v) => v === player).length
	// 	let emptyCount = values.filter((v) => v === '').length

	// 	if (playerCount === 1 && emptyCount === 2) {
	// 		// 返回空格的位置
	// 		if (board[a] === '') return a
	// 		if (board[b] === '') return b
	// 		if (board[c] === '') return c
	// 	}
	// }
	// return null // 没有找到
}

//预胜利计划: 统计每个点位能形成几个快要胜利的点位

//高级AI:初级AI + 预胜利计划

//顶级AI: 高级AI+ 部分特殊情况的手动处理(应该不超过5个)
