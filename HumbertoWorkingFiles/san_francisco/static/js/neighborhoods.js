// Creating map object
var myMap = L.map("map", {
    center: [37.7653526,-122.4636452],
    zoom: 12
  });
  
  // Adding tile layer
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);
  
  // Use this link to get the geojson data.
  var link = "static/data/SF Find Neighborhoods.geojson";
  
  // Grabbing our GeoJSON data..
  d3.json(link, function(data) {
    // Creating a geoJSON layer with the retrieved data
    L.geoJson(data, {
      // Style each feature 
      style: function(feature) {
        return {
          color: "black",
          fillColor: "gray",
          fillOpacity: 0,
          weight: 1.5
        };
      },
      // Called on each feature
      onEachFeature: function(feature, layer) {
        // Set mouse events to change map styling
        layer.on({
          // Highlight mouse over section
          mouseover: function(event) {
            layer = event.target;
            layer.setStyle({
              fillOpacity: 0.9
            });
          },
          // revert back to original 
          mouseout: function(event) {
            layer = event.target;
            layer.setStyle({
              fillOpacity: 0
            });
          },
          // Enlarge section when clicked
          click: function(event) {
            myMap.fitBounds(event.target.getBounds());
          }
        });
        
  
      }
    }).addTo(myMap);
  });
  
  
  
  