// // 每5分钟自动刷新
// // setInterval(fetchWeather, 300000) // 300000ms = 5分钟

//全局变量区--持续更新中
let data
let locdata
const apiKey = 'a93c146c4d6357ebf52d9d6b51416517'

//调用天气API+程序启动部分
async function fetchWeather(lat1 = 43.852, lon1 = -79.484) {
	const response = await fetch(
		`https://api.openweathermap.org/data/3.0/onecall?lat=${lat1}&lon=${lon1}&units=metric&exclude=minutely&lang=zh_cn&appid=${apiKey}`
	) // 替换成你自己的API
	data = await response.json()

	const locresponse = await fetch(
		`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat1}&lon=${lon1}&appid=${apiKey}`
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
	getFeelsLike()
	getUVIndex()
	getHumidity()
	getWind()
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
		const iconCode1 = data.hourly[i].weather[0].icon
		document.getElementById(`hourly-forecast`).innerHTML += `
			<div class="mx-2">
				<div id="n${i}time">Date(data.hourly[${i}].dt * 1000</div>
				<img id="n${i}icon" />
				<div id="n${i}temp">${data.hourly[i].temp.toFixed(0)}°</div>
			</div>
		`
		matchIconandId(iconCode1, `n${i}icon`)
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
	for (let i = 0; i < 8; i++) {
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

// 体感温度的方程
function getFeelsLike() {
	try {
		const feelsLike = data.current.feels_like.toFixed(0)
		document.getElementById('feels-like-temp').textContent = `${feelsLike}°`
	} catch (e) {
		console.error('Error in getFeelsLike:', e)
	}
}

// 紫外线指数的方程
function getUVIndex() {
	try {
		const uvIndex = data.current.uvi.toFixed(1)
		document.getElementById('uv-index').textContent = `${uvIndex} `
	} catch (e) {
		console.error('Error in getUVIndex:', e)
	}
}

// 湿度的方程
function getHumidity() {
	try {
		const humidity = data.current.humidity
		document.getElementById('humidity').textContent = `${humidity}%`
	} catch (e) {
		console.error('Error in getHumidity:', e)
	}
}

// 风的方程
function getWind() {
	try {
		const windSpeed = data.current.wind_speed.toFixed(1)
		const windDeg = data.current.wind_deg
		const windDirection = (() => {
			if (windDeg >= 337.5 || windDeg < 22.5) return '北风'
			if (windDeg >= 22.5 && windDeg < 67.5) return '东北风'
			if (windDeg >= 67.5 && windDeg < 112.5) return '东风'
			if (windDeg >= 112.5 && windDeg < 157.5) return '东南风'
			if (windDeg >= 157.5 && windDeg < 202.5) return '南风'
			if (windDeg >= 202.5 && windDeg < 247.5) return '西南风'
			if (windDeg >= 247.5 && windDeg < 292.5) return '西风'
			if (windDeg >= 292.5 && windDeg < 337.5) return '西北风'
		})()
		document.getElementById('wind-speed').textContent = `${(
			windSpeed * 3.6
		).toFixed(1)} km/h`
		document.getElementById('wind-direction').textContent = windDirection
		document.getElementById('wind-gust').textContent = `${(
			data.current.wind_gust * 3.6
		).toFixed(1)} km/h`
	} catch (e) {
		console.error('Error in getWind:', e)
	}
}

//搜索框, 抄的G老师------------------------------还在理解消化中
// ===== 工具：防抖 =====
function debounce(fn, delay = 100) {
	let timer
	return (...args) => {
		clearTimeout(timer)
		timer = setTimeout(() => fn.apply(this, args), delay)
	}
}

// ===== 主要逻辑 =====
const input = document.getElementById('cityInput')
const listBox = document.getElementById('suggestions')

async function fetchCities(q) {
	if (!q) return [] // 空输入不查
	const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
		q
	)}&limit=5&appid=${apiKey}`
	try {
		const res = await fetch(url)
		return res.ok ? await res.json() : []
	} catch (e) {
		console.error(e)
		return []
	}
}

function renderList(cities) {
	listBox.innerHTML = cities
		.map(
			(c) => `<li class="list-group-item"
                 data-lat="${c.lat}"
                 data-lon="${c.lon}">
              ${c.name}, ${c.state || ''} ${c.country}
            </li>`
		)
		.join('')
	listBox.classList.toggle('d-none', cities.length === 0)
}

// 输入事件（防抖）
input.addEventListener(
	'input',
	debounce(async (e) => {
		const data = await fetchCities(e.target.value.trim())
		renderList(data)
	}, 400)
)

// 选中城市
listBox.addEventListener('click', (e) => {
	if (e.target.matches('.list-group-item')) {
		// 1. 写回输入框
		input.value = e.target.textContent.trim()

		// 2. 取出坐标（字符串 → 数字）
		const { lat, lon } = e.target.dataset
		const latitude = Number(lat)
		const longitude = Number(lon)

		// 3. 收起下拉
		listBox.classList.add('d-none')

		// 4. 调用你的天气函数
		fetchWeather(latitude, longitude) // 自定义
	}
})

// 点击空白处收起
document.addEventListener('click', (e) => {
	if (!e.target.closest('#cityInput')) listBox.classList.add('d-none')
})

// 初始加载一次
fetchWeather()
