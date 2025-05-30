let mode = 0
let numOfCharacters = 12
let numbc = true
let symbc = false
let capc = false
let fulletter = true
let result = ''
//---------------------------Controller---------------------------------------

function switchtab(x) {
	const tabs = document.querySelectorAll('.tab')
	const contents = document.querySelectorAll('.content')
	mode = x

	if (mode === 0) {
		numOfCharacters = 20
	}
	if (mode === 1) {
		numOfCharacters = 4
	}
	if (mode === 2) {
		numOfCharacters = 6
	}
	tabs.forEach((tab, i) => {
		tab.classList.toggle('active', i === x)
		contents[i].classList.toggle('activity', i === x)
	})
	updataUI()
}

function getvalues(x) {
	numOfCharacters = x
	updataUI()
}

function getchecks() {
	capc = document.getElementById('Upperfirst').checked
	fulletter = document.getElementById('fullword').checked
	numbc = document.getElementById('numbs').checked
	symbc = document.getElementById('symbs').checked

	updataUI()
}

function updataUI() {
	document.getElementsByClassName('box')[mode].value = numOfCharacters
	document.getElementsByClassName('slider')[mode].value = numOfCharacters
	getpassword()
	result = ''
	for (let char of password0) {
		if (/[0-9]/.test(char)) {
			result += `<span style="color:blue">${char}</span>`
		} else if (/[a-zA-Z]/.test(char)) {
			result += `<span style="color:black">${char}</span>`
		} else {
			result += `<span style="color:red">${char}</span>`
		}
	}
	document.getElementById('showpass').innerHTML = result
}

//------------------------------Modle----------------------------------------
const letters = 'abcdefghijklmnopqrstuvwsxyzABCDEFGHIJKHIJKLMNOPQRSTUVWXYZ'

const numbers = '0123456789'

const symbs = '!@#$%^&*()_+-=[]{}<>?'

let passlibrary = letters
let password0 = ''

let wordsBank = []
;(async () => {
	const leng = [3, 4, 5, 6, 7]
	for (let i of leng) {
		const res = await fetch(
			`https://random-word-api.vercel.app/api?words=200&length=${i}`
		)
		const data = await res.json()
		wordsBank.push(...data)
	}
})()

function updatePassLibrary() {
	passlibrary = ''
	if (mode === 0) {
		passlibrary = letters
		if (numbc) {
			passlibrary += numbers
		}
		if (symbc) {
			passlibrary += symbs
		}
	}
	if (mode === 2) {
		passlibrary = numbers
	}
	if (mode === 1) {
		true
	}
}

function getpassword() {
	updatePassLibrary()
	password0 = ''
	if (mode === 0) {
		for (let i = numOfCharacters; i > 0; i--) {
			const str = passlibrary.charAt(
				Math.floor(Math.random() * passlibrary.length)
			)
			password0 += str
		}
		const noLower = /^[^a-z]*$/.test(password0)
		const noUpper = /^[^A-Z]*$/.test(password0)
		const noNumber = /^[^0-9]*$/.test(password0)
		const noSymbol = /^[a-zA-Z0-9]*$/.test(password0)
		if (noLower || noUpper || (numbc && noNumber) || (symbc && noSymbol)) {
			getpassword()
		}
	}
	if (mode === 1) {
		let words = []
		for (let i = 0; i < numOfCharacters; i++) {
			const word0 =
				wordsBank[Math.floor(Math.random() * wordsBank.length)]
			const pp = fulletter
				? word0
				: word0.length <= 4
				? word0
				: word0.slice(0, 4)
			words.push(pp)
		}

		password0 = words.join('-')
		password0 = capc
			? password0.charAt(0).toUpperCase() + password0.slice(1)
			: password0
	}
	if (mode === 2) {
		for (let i = numOfCharacters; i > 0; i--) {
			const str = passlibrary.charAt(
				Math.floor(Math.random() * passlibrary.length)
			)
			password0 += str
		}
	}
}

updataUI()
