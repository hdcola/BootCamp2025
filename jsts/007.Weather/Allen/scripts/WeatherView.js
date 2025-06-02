export class WeatherView {
  constructor() {
    this.cityEl = document.querySelector("#currentCity");
    this.tempEl = document.querySelector("#currentTemp");
    this.feelsLikeEl = document.querySelector("#feelsLike");
    this.highestEl = document.querySelector("#highestTemp");
    this.lowestEl = document.querySelector("#lowestTemp");
    this.iconEl = document.querySelector("#currentIcon");
    this.searchInput = document.querySelector("#searchInput");
  }

  getIconByMain(main) {
    const icons = {
      clear: `<i class="fa-solid fa-sun weather-icon"></i>`,
      clouds: `<i class="fa-solid fa-cloud weather-icon"></i>`,
      rain: `<i class="fa-solid fa-cloud-rain weather-icon"></i>`,
      snow: `<i class="fa-solid fa-snowflake weather-icon"></i>`,
      wind: `<i class="fa-solid fa-wind weather-icon"></i>`,
      haze: `<i class="fa-solid fa-smog weather-icon"></i>`,
    };
    return (
      icons[main.toLowerCase()] ||
      `<i class="fa-solid fa-cloud weather-icon"></i>`
    );
  }
  updateIconElement(element, main) {
    element.innerHTML = this.getIconByMain(main);
  }

  createElement(tag, className, textContent) {
    const element = document.createElement(tag);
    element.className = className;
    element.textContent = textContent;
    return element;
  }

  updateMainWeatherPanel({ city, temp, feelsLike, tempMax, tempMin }) {
    this.cityEl.textContent = city;
    this.tempEl.textContent = `${Math.round(temp)}°`;
    this.feelsLikeEl.textContent = `体感温度: ${Math.round(feelsLike)}°`;
    this.highestEl.textContent = `最高: ${Math.round(tempMax)}°`;
    this.lowestEl.textContent = `最低: ${Math.round(tempMin)}°`;
  }

  clearSuggestions() {
    const container = document.querySelector("#searchSuggestions");
    container.innerHTML = "";
  }

  showSuggestions(cities, onCitySelect) {
    this.clearSuggestions();
    const container = document.querySelector("#searchSuggestions");

    cities.forEach((city) => {
      const item = this.createElement(
        "button", // 修正拼写 "buttn" → "button"
        "list-group-item list-group-item-action",
        `${city.name}, ${city.state || ""} ${city.country}`
      );
      item.addEventListener("click", () => {
        onCitySelect(city); // 将点击事件交给 Controller 提供的回调函数处理
      });
      container.appendChild(item);
    });
  }
}
