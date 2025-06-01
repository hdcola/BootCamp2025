const cloud_rain = `<i class="fa-solid fa-cloud-rain weather-icon"></i>`;
const snowflake = `<i class="fa-solid fa-snowflake weather-icon"></i>`;
const sun = `<i class="fa-solid fa-sun weather-icon"></i>`;
const cloud = `<i class="fa-solid fa-cloud weather-icon"></i>`;
const wind = `<i class="fa-solid fa-wind weather-icon"></i>`;

export class WeatherView {
  constructor() {
    // Future state like time-of-day, theme, etc. can be added here
  }
  getIconByMain(main) {
    const icons = {
      clear: `<i class="fa-solid fa-sun weather-icon"></i>`,
      clouds: `<i class="fa-solid fa-cloud weather-icon"></i>`,
      rain: `<i class="fa-solid fa-cloud-rain weather-icon"></i>`,
      snow: `<i class="fa-solid fa-snowflake weather-icon"></i>`,
      wind: `<i class="fa-solid fa-wind weather-icon"></i>`,
    };
    return (
      icons[main.toLowerCase()] ||
      `<i class="fa-solid fa-cloud weather-icon"></i>`
    );
  }
  updateIconElement(element, main) {
    element.innerHTML = this.getIconByMain(main);
  }
}
