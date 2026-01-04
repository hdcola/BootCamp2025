async function getCurrentTab() {
	let queryOptions = { active: true, currentWindow: true }
	// `tab` will either be a `tabs.Tab` instance or `undefined`.
	let [tab] = await chrome.tabs.query(queryOptions)
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
	return tab.id
}
function getTitle() { return document.title; }

chrome.scripting
    .executeScript({
      target : {tabId : getTabId()},
      func : getTitle,
    })
    .then(() => console.log("injected a function"));

    
;(async () => {
	await showPopups()
	await getTabId()
	console.log('Popup script executed successfully.')
})()
