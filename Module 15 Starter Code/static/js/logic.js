let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

d3.json(url).then(function (data) {
    createFeatures(data.features);
  });

  function createFeatures(earthquakeData) {
    function onEachFeature(feature, layer) {
      layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
    
    
    }
    
   function calculateMarkerSize(magnitude) {
       return magnitude * 5;
}

function getColorByDepth(depth) {
  return depth > 300 ? '#FF0000' : // Red for deep earthquakes
  depth > 100 ? '#FFA500' : // Orange for moderate depth
  '#FFFF00'; // Yellow for shallow earthquakes
}

//earthquakeData.forEach(function(earthquake) {
//var markerSize = calculateMarkerSize(earthquake.properties.magnitude);
//var markerColor = getColorByDepth(earthquake.geometry.coordinates[2]);

//var marker = L.circleMarker([earthquake.geometry.coordinates[1], earthquake.geometry.coordinates[0]], {
//radius: markerSize,
//fillColor: markerColor,
//color: '#000',
//weight: 1,
//fillOpacity: 0.8
//}).addTo(map);})

//     marker.bindPopup(`<strong>Magnitude:</strong> ${earthquake.properties.magnitude}<br>
//                       <strong>Depth:</strong> ${earthquake.geometry.coordinates[2]} km<br>
//                       <strong>Location:</strong> ${earthquake.properties.place}<br>
//                       <strong>Time:</strong> ${new Date(earthquake.properties.time)}`);
// });
  
    let earthquakes = L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature
      });
    
      
      createMap(earthquakes);
    }

    function createMap(earthquakes) {

        
        let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        })
      
        let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
          attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
        });
      
        
        let baseMaps = {
          "Street Map": street,
          "Topographic Map": topo
        };
      
        
        let overlayMaps = {
          Earthquakes: earthquakes
        };
      
    
        let myMap = L.map("map", {
          center: [
            37.09, -95.71
          ],
          zoom: 5,
          layers: [street, earthquakes]
        });
      
        L.control.layers(baseMaps, overlayMaps, {
          collapsed: false
        }).addTo(myMap);
      
      }
       