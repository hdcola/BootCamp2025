// console.log('hello wold!!')

import { exec } from 'node:child_process'
exec('ls a-l', (error, stdout, stderr) => {
	if (error) {
		console.error(`exec error: ${error}`)
		return
	}
	console.log(`stdout: ${stdout}`)
	console.error(`stderr: ${stderr}`)
})
