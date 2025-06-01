import { config } from "../config_env.js";

export class WeatherModel {
  constructor(city, currentWeather) {
    this.apiKey = config.OPEN_WEATHER_API_KEY;
    this.baseUrl =
      config.OPEN_WEATHER_API_URL ||
      "https://api.openweathermap.org/data/2.5/weather";
    this.city = city;
    this.currentWeather = currentWeather;
  }

  async getLatAndLonByCity(city) {
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${this.apiKey}&units=metric`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("Latitude and Longitude data:", data);
      return data;
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  }

  async getWeatherByCityAndCountryCode(city, countryCode) {
    const url = `${this.baseUrl}?q=${city},${countryCode}&appid=${this.apiKey}&units=metric`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  }

  async getWeatherByLanAndLon(lat, lon) {
    const url = `${this.baseUrl}?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  }
}

const weatherModel = new WeatherModel();
console.log(await weatherModel.getLatAndLonByCity("Montreal"));

// const currentWeather = await weatherModel.getWeatherByLanAndLon('45.437480528412046', '-73.83902492132476')
// const feelsLike = currentWeather.main.feels_like;
// console.log("Current weather feels like:", feelsLike);
