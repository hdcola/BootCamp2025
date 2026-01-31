async function getCurrentTab() {
	let queryOptions = { active: true, lastFocusedWindow: true }
	// `tab` will either be a `tabs.Tab` instance or `undefined`.
	let tabs = await chrome.tabs.query(queryOptions)
	let tab = tabs[0]
	return tab
}

async function showPopups() {
	console.log('This is a popup!')
	const tab = await getCurrentTab()
	console.log('Current tab:', JSON.stringify(tab, null, 2))
	console.log(tab.url, tab.title)
}

async function getTabId() {
	const tab = await getCurrentTab()
	console.log('Tab ID:', tab.id)
	return tab?.id
}
function getTitle() {
	return document.title
}

// chrome.scripting
//     .executeScript({
//       target : {tabId : getTabId()},
//       func : getTitle,
//     })
//     .then(() => console.log("injected a function"));

;(async () => {
	await showPopups()
	await getTabId()
	console.log('Popup script executed successfully.')
})()
;(async () => {
	try {
		const tab = await getCurrentTab()
		if (!tab?.id) return

		const url = tab.url || ''
		if (
			url.startsWith('chrome://') ||
			url.startsWith('edge://') ||
			url.startsWith('about:')
		) {
			console.warn('Cannot inject into this page:', url)
			return
		}

		const results = await chrome.scripting.executeScript({
			target: { tabId: tab.id },
			func: () => document.body.innerText,
		})

		const pageText = results?.[0]?.result ?? ''
		console.log(pageText)
	} catch (e) {
		console.error('executeScript failed:', e)
	}
})()
