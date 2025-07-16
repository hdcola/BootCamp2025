import { WeatherModel } from "./WeatherModel.js";
import { WeatherView } from "./WeatherView.js";

export class WeatherController {
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
    this.view.updateMainWeatherPanel({
      city: data.name,
      temp: data.main.temp,
      feelsLike: data.main.feels_like,
      tempMax: data.main.temp_max,
      tempMin: data.main.temp_min,
    });
    this.view.updateIconElement(this.iconEl, data.weather[0].main);
  }

  async init() {
    this.searchInput.addEventListener("input", async () => {
      const query = this.searchInput.value.trim();
      if (query.length < 2) return this.view.clearSuggestions();

      try {
        const results = await this.model.getLatAndLonByCity(query);
        this.view.showSuggestions(results, async (city) => {
          this.searchInput.value = city.name;
          this.view.clearSuggestions();
          await this.update(city.lat, city.lon);
        });
      } catch (err) {
        console.error("Error getting city suggestions", err);
      }
    });

    const loc = await this.model.getCurrentLocation();
    if (loc) {
      this.update(loc.lat, loc.lon);
    } else {
      console.error("Unable to get current location");
      // Default to Toronto if location is not available
      this.update(43.7, -79.42); // Toronto coordinates
    }
  }
}

const controller = new WeatherController();
await controller.init();
