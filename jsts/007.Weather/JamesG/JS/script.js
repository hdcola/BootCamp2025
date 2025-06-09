// // 每5分钟自动刷新
// // setInterval(fetchWeather, 300000) // 300000ms = 5分钟

//全局变量区--持续更新中
let data
let locdata

//调用天气API+程序启动部分
async function fetchWeather() {
	const response = await fetch(
		'https://api.openweathermap.org/data/3.0/onecall?lat=43.852&lon=-79.484&units=metric&exclude=minutely&lang=zh_cn&appid=a93c146c4d6357ebf52d9d6b51416517'
	) // 替换成你自己的API
	data = await response.json()

	const locresponse = await fetch(
		'https://api.openweathermap.org/geo/1.0/reverse?lat=43.85062291808805&lon=-79.4972649533532&appid=a93c146c4d6357ebf52d9d6b51416517'
	)
	locdata = await locresponse.json()

	//刷新页面或者启动各个组
	runAllFunctions()
}

//方程组集合-----持续更新中
function runAllFunctions() {
	currentWeather()
	hourlyForecastWeather()
	dailyForecastWeather()
}
//全局通用方程-------持续更新中
//1.图标自动适配
function matchIconandId(iconCode, elementId) {
	const img = document.getElementById(elementId)
	if (img) {
		img.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`
		img.style.width = '45px' // 可选，设置大小
	}
}

//用于现在天气的方程-------
function currentWeather() {
	const tempC = data.current.temp.toFixed(0)
	const feelsC = data.current.feels_like.toFixed(0)
	const maxC = data.daily[0].temp.max.toFixed(0)
	const minC = data.daily[0].temp.min.toFixed(0)
	const weatype = data.current.weather[0].description

	const iconCode = data.current.weather[0].icon // e.g. "10d"
	matchIconandId(iconCode, 'weather-icon')

	document.getElementById('location').textContent =
		locdata[0]?.name + ', ' + locdata[0]?.country
	document.getElementById('temperture').textContent = tempC + '°'
	document.getElementById('range').textContent =
		'最低 ' + minC + '°, 最高 ' + maxC + '°'
	document.getElementById('feeling').textContent = '体感温度: ' + feelsC + '°'
	document.getElementById('weathertype').textContent = weatype
}

//用于未来24小时的方程
function hourlyForecastWeather() {
	//weather now
	document.getElementById('n0time').textContent = 'Now'
	const iconCode0 = data.current.weather[0].icon
	matchIconandId(iconCode0, 'n0icon')
	const tempC = data.current.temp.toFixed(0)
	document.getElementById('n0temp').textContent = tempC + '°'

	for (let i = 1; i < 25; i++) {
		document.getElementById(`n${i}temp`).textContent =
			data.hourly[i].temp.toFixed(0) + '°'
	}
	for (let i = 1; i < 25; i++) {
		const hours = new Date(data.hourly[i].dt * 1000)
		document.getElementById(`n${i}time`).textContent = String(
			hours.getHours()
		).padStart(2, '0') //需要再学习
	}

	for (let i = 1; i < 25; i++) {
		const iconCodes = data.hourly[i].weather[0].icon // e.g. "10d"
		matchIconandId(iconCodes, `n${i}icon`)
	}
}

//用于未来10天的天气预报方程
function getChineseWeekday(dateObj) {
	const weekdayMap = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
	return weekdayMap[dateObj.getDay()]
}

function dailyForecastWeather() {
	for (let i = 0; i < 10; i++) {
		//生成日期
		const days = new Date(data.daily[i].dt * 1000)
		if (i === 0) {
			document.getElementById(`d${i}time`).textContent = '今天'
		} else {
			document.getElementById(`d${i}time`).textContent =
				getChineseWeekday(days)
		}
		//生成图标
		const iconCoded = data.daily[i].weather[0].icon
		matchIconandId(iconCoded, `d${i}icon`)
		//生成温度区间
		document.getElementById(`d${i}temp`).textContent =
			data.daily[i].temp.min.toFixed(0) +
			'° ~ ' +
			data.daily[i].temp.max.toFixed(0) +
			'°'
	}
}
// 初始加载一次
fetchWeather()
