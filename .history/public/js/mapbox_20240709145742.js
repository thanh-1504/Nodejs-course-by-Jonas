const locations = JSON.parse(document.getElementById("map").dataset.locations);
console.log(locations);
mapboxgl.accessToken =
  "pk.eyJ1IjoidGhhbmgtMTUwNCIsImEiOiJjbHllM2V6ZmEwY3dsMnBzYzJnaG5qNGU4In0.olA5x7nq4LYec2bkhT3-GA";
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/thanh-1504/clye3oorq00im01pffwmc5hvw",
  center: [-118.113491,34.111745]
});
