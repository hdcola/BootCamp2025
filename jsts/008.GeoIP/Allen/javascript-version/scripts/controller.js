import MapModel from "./model.js";
import MapView from "./view.js";
import { config } from "./config_env.js";

function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

const MapController = {
  mapInstance: null,
  async init() {
    await MapModel.getCurrentIP();
    const coords = MapModel.getLocation();
    console.log(coords);
    this.mapInstance = MapView.initMap("googleMap", coords);
  },

  getIpAddress() {
    const ipInput = document.getElementById("ipaddress");
    if (ipInput) {
      ipInput.addEventListener(
        "input",
        debounce(async (event) => {
          const ip = event.target.value;
          MapModel.setIpAddress(ip);
          console.log("IP 已更新到模型中：", MapModel.getIpAddress());

          try {
            await MapModel.getCoordByIP(ip);
            const newCoords = MapModel.getLocation();
            this.mapInstance = MapView.initMap("googleMap", newCoords);
          } catch (err) {
            console.error("无法根据 IP 获取坐标：", err);
          }
        }, 800)
      );
    }
  },
};

window.myMap = () => {
  MapController.init();
  MapController.getIpAddress();
};

const script = document.createElement("script");
script.src = `https://maps.googleapis.com/maps/api/js?key=${config.GOOGLE_API_KEY}&callback=myMap`;
script.async = true;
document.head.appendChild(script);
