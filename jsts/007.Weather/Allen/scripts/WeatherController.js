import { WeatherModel } from "./WeatherModel.js";
import { WeatherView } from "./WeatherView.js";

class WeatherController {
  constructor() {
    this.model = new WeatherModel();
    this.view = new WeatherView();
    this.cityEl = document.querySelector("#currentCity");
    this.tempEl = document.querySelector("#currentTemp");
    this.feelsLikeEl = document.querySelector("#feelsLike");
    this.highestEl = document.querySelector("#highestTemp");
    this.lowestEl = document.querySelector("#lowestTemp");
    this.iconEl = document.querySelector("#currentIcon");
    this.searchInput = document.querySelector("#searchInput");
  }

  getSearchInput() {
    return this.searchInput;
  }

  async update(lat, lon) {
    const data = await this.model.getWeatherByLanAndLon(lat, lon);
    this.cityEl.textContent = data.name;
    this.tempEl.textContent = `${Math.round(data.main.temp)}°`;
    this.feelsLikeEl.textContent = `体感温度: ${Math.round(
      data.main.feels_like
    )}°`;
    this.highestEl.textContent = `最高: ${Math.round(data.main.temp_max)}°`;
    this.lowestEl.textContent = `最低: ${Math.round(data.main.temp_min)}°`;
    this.view.updateIconElement(this.iconEl, data.weather[0].main);
  }

  clearSuggestions() {
    const container = document.querySelector("#searchSuggestions");
    container.innerHTML = "";
  }

  showSuggestions(cities) {
    const container = document.querySelector("#searchSuggestions");
    container.innerHTML = "";

    cities.forEach((city) => {
      const item = document.createElement("button");
      item.className = "list-group-item list-group-item-action";
      item.textContent = `${city.name}, ${city.state || ""} ${city.country}`;
      item.addEventListener("click", () => {
        this.searchInput.value = city.name;
        this.clearSuggestions();
        this.update(city.lat, city.lon);
      });
      container.appendChild(item);
    });
  }

  init() {
    this.searchInput.addEventListener("input", async () => {
      const query = this.searchInput.value.trim();
      if (query.length < 2) return this.clearSuggestions();

      try {
        const results = await this.model.getLatAndLonByCity(query); // 你需要写这个函数
        this.showSuggestions(results);
      } catch (err) {
        console.error("Error getting city suggestions", err);
      }
    });

    this.update("45.437480528412046", "-73.83902492132476");
  }
}

const controller = new WeatherController();
controller.init();
