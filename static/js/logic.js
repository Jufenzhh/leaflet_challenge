let myMap = L.map("map", {
    center: [0, 0],
    zoom: 2
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

let url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';

d3.json(url).then(function(response) {
    let earthquakes = response.features;

    for (let i = 0; i < earthquakes.length; i++) {
        let earthquake = earthquakes[i];
        let location = earthquake.geometry.coordinates;
        let magnitude = earthquake.properties.mag;
        let depth = location[2];
        let place = earthquake.properties.place;
        let time = new Date(earthquake.properties.time).toLocaleString();

        let color = getColorForDepth(depth);

        L.circleMarker([location[1], location[0]], {
            radius: magnitude * 5,
            fillColor: color,
            color: color,
            weight: 1,
            opacity: 1,
            fillOpacity: 0.7
        }).bindPopup(
            `<h3>${place}</h3><p>Magnitude: ${magnitude}<br>Depth: ${depth}<br>Time: ${time}</p>`
        ).addTo(myMap);
    }

    let legend = L.control({ position: 'bottomright' });

    legend.onAdd = function(map) {
        let div = L.DomUtil.create('div', 'info legend');
        let depths = [-10, 10, 30, 50, 70]; 
        let colors = ['#00FF00', '#66FF00', '#CCFF00', '#FFFF00', '#FFCC00']; 
        let labels = [];

        for (let i = 0; i < depths.length; i++) {
            div.innerHTML +=
                '<i style="background:' + colors[i] + '"></i> ' +
                depths[i] + (depths[i + 1] ? '&ndash;' + depths[i + 1] + '<br>' : '+');
        }

        return div;
    };

    legend.addTo(myMap);
});

function getColorForDepth(depth) {
    if (depth > 70) {
        return '#FFCC00';
    } else if (depth > 50) {
        return '#FFFF00';
    } else if (depth > 30) {
        return '#CCFF00';
    } else if (depth > 10) {
        return '#66FF00';
    } else {
        return '#00FF00';
    }
}



