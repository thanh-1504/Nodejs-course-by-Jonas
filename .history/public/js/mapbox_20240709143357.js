const locations = JSON.parse(document.getElementById("map").dataset.locations);
console.log(locations);
mapboxgl.accessToken =
  "pk.eyJ1IjoidGhhbmgtMTUwNCIsImEiOiJjbHllMnpuYjEwOWloMmxvb3M1bGJhZWw3In0.njTTQc3sxGymvQduShKajA";
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
});
