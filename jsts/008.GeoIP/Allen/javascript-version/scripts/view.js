const MapView = {
  initMap(containerId, coords) {
    const mapProp = {
      center: new google.maps.LatLng(coords.lat, coords.lon),
      zoom: 14,
    };
    return new google.maps.Map(document.getElementById(containerId), mapProp);
  },
};

export default MapView;
