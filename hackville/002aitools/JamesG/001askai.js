// ### Ask AI a question
import { GoogleGenAI, Type } from '@google/genai'
import { runCommand } from './002runcmd'

const print = console.log

// console.log('hello world!')
// print('hello world')

// Configure the client
const ai = new GoogleGenAI({
	apiKey: '',
})

// Define user prompt
const contents = [
	{
		role: 'user',
		parts: [{ text: '我的⽬录中有多少个⽂件？' }],
	},
]

const response = await ai.models.generateContent({
	model: 'gemini-2.5-flash',
	contents: contents,
})

runCommand()
console.log(response.text)
