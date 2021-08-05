mapboxgl.accessToken = "pk.eyJ1IjoiamVhbi1mIiwiYSI6ImNrcXFnYmRjcTFnejUybm84bDhwMXRjbWwifQ.mZ6mXli-8QBySIuJNtLfCw";
   
  const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/mapbox/streets-v11', // style URL
  center: [-8.4229, 41.5518], // starting position [lng, lat]
  zoom: 16 // starting zoom
  });



 const marker1 = new mapboxgl.Marker({color: "#428bca"})
.setLngLat([-8.4229, 41.5518])
.addTo(map)
.setPopup(new mapboxgl.Popup().setHTML("<h5>Web Conference: Rua Barão São Cosme, nº45 - PORTO</h5>"))
 
