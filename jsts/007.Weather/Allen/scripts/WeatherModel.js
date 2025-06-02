import { config } from "../config_env.js";

export class WeatherModel {
  constructor() {
    this.apiKey = config.OPEN_WEATHER_API_KEY;
    this.baseUrl =
      config.OPEN_WEATHER_API_URL ||
      "https://api.openweathermap.org/data/2.5/weather";

  }

  getCurrentLocation() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            });
          },
          (error) => {
            reject(error);
          }
        );
      } else {
        reject(new Error("Geolocation is not supported by this browser."));
      }
    });
  }

  async getLatAndLonByCity(city) {
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=15&appid=${this.apiKey}&units=metric`;
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

// const weatherModel = new WeatherModel();

// console.log(await weatherModel.getCurrentLocation());

// console.log(
//   await weatherModel.getLatAndLonByCity("新竹")
// );

// console.log(
//   (await weatherModel.getLatAndLonByCity("Hangzhou City"))[0].lat +
//     " " +
//     (await weatherModel.getLatAndLonByCity("Hangzhou City"))[0].lon
// );
// console.log(
//   await weatherModel.getWeatherByLanAndLon(
//     (
//       await weatherModel.getLatAndLonByCity("Hangzhou City")
//     )[0].lat,
//     (
//       await weatherModel.getLatAndLonByCity("Hangzhou City")
//     )[0].lon
//   )
// );

// const currentWeather = await weatherModel.getWeatherByLanAndLon('45.437480528412046', '-73.83902492132476')
// const feelsLike = currentWeather.main.feels_like;
// console.log("Current weather feels like:", feelsLike);
