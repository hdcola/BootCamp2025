async function fetchWeather() {
	try {
		const response = await fetch(
			'https://api.openweathermap.org/data/2.5/weather?lat=43.852&lon=-79.484&lang=zh&appid=a93c146c4d6357ebf52d9d6b51416517'
		) // 替换成你自己的API
		const data = await response.json()

		// 温度单位是开尔文，转换成摄氏度
		const tempC = (data.main.temp - 273.15).toFixed(1)
		const feelsC = (data.main.feels_like - 273.15).toFixed(1)
		const maxC = (data.main.temp_max - 273.15).toFixed(1)
		const minC = (data.main.temp_min - 273.15).toFixed(1)
		const weatype = data.weather[0].description

		document.getElementById('location').textContent =
			data.name + ', ' + data.sys.country
		document.getElementById('temperture').textContent = tempC + '度'
		document.getElementById('range').textContent =
			'最高 ' + maxC + '度, 最低 ' + minC + '度'
		document.getElementById('feeling').textContent =
			'体感温度: ' + feelsC + '度'
		document.getElementById('weathertype').textContent = weatype
	} catch (err) {
		console.error('天气数据获取失败:', err)
	}
}

// 初始加载一次
fetchWeather()

// 每5分钟自动刷新
setInterval(fetchWeather, 300000) // 300000ms = 5分钟
