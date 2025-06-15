const MapModel = {
  location: {
    lat: 51.508742,
    lon: -0.12085,
  },

  ipaddress: null,

  setIpAddress(ip) {
    this.ipaddress = ip;
  },

  setLocation(lat, lon) {
    this.location.lat = lat;
    this.location.lon = lon;
  },

  async getCurrentIP() {
    const response = await fetch("https://api4.my-ip.io/v2/ip.json");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data);
    this.setIpAddress(data.ip);
    this.setLocation(data.location.lat, data.location.lon);
  },

  async getCoordByIP(ip = this.ipaddress) {
    const response = await fetch(`http://ip-api.com/json/${ip}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    this.setLocation(data.lat, data.lon);
  },

  getLocation() {
    return this.location;
  },

  getIpAddress() {
    return this.ipaddress;
  },
};

// (async () => {
//   await MapModel.getCoorByIP();
//   console.log(MapModel.getLocation());
// })();

export default MapModel;
