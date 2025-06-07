async function fetchWeather() {
	try {
		const response = await fetch(
			'https://api.openweathermap.org/data/2.5/weather?lat=43.852&lon=-79.484&lang=zh&appid=a93c146c4d6357ebf52d9d6b51416517'
		) // 替换成你自己的API
		const data = await response.json()

		const responsez = await fetch(
			'https://api.openweathermap.org/data/3.0/onecall?lat=43.852&lon=-79.484&exclude=minutely&lang=zh_cn&appid=a93c146c4d6357ebf52d9d6b51416517'
		) // 替换成你自己的API
		const data1 = await responsez.json()

		// 温度单位是开尔文，转换成摄氏度
		const tempC = (data.main.temp - 273.15).toFixed(0)
		const feelsC = (data.main.feels_like - 273.15).toFixed(0)
		const maxC = (data.main.temp_max - 273.15).toFixed(0)
		const minC = (data.main.temp_min - 273.15).toFixed(0)
		const weatype = data.weather[0].description

		const iconCode = data.weather[0].icon // e.g. "10d"
		const img = document.getElementById('weather-icon')
		img.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`

		document.getElementById('location').textContent =
			data.name + ', ' + data.sys.country
		document.getElementById('temperture').textContent = tempC + '度'
		document.getElementById('range').textContent =
			'最高 ' + maxC + '度, 最低 ' + minC + '度'
		document.getElementById('feeling').textContent =
			'体感温度: ' + feelsC + '度'
		document.getElementById('weathertype').textContent = weatype

		for (let i = 1; i < 13; i++) {
			document.getElementById(`n${i}temp`).textContent =
				Math.round(data1.hourly[i].temp - 273.15).toFixed(0) + '度 '
		}
		for (let i = 1; i < 13; i++) {
			const d2 = new Date(data1.hourly[i].dt * 1000)

			document.getElementById(`n${i}time`).textContent = String(
				d2.getHours()
			).padStart(2, '0') //需要再学习
		}

		const getIconUrl = (code) =>
			`https://openweathermap.org/img/wn/${code}@2x.png`
		for (let i = 1; i < 13; i++) {
			const iconCode = data1.hourly[i].weather[0].icon // e.g. "10d"
			const iconUrl = getIconUrl(iconCode)

			document.getElementById(
				`n${i}icon`
			).innerHTML = `<img src="${iconUrl}" alt="weather icon">`
		}

		document.getElementById('n0temp').textContent = tempC + '度 '
	} catch (err) {
		console.error('天气数据获取失败:', err)
	}
}

// 初始加载一次
fetchWeather()

// 每5分钟自动刷新
setInterval(fetchWeather, 300000) // 300000ms = 5分钟
