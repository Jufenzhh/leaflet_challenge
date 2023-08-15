# leaflet_challenge
The main script is in the logic.js 
The script starts by initializing the leaflet map. 
"map" refers to the HTML event with the id "map" where the map will be displayed.  
Then the script adds a tile layer from OpenStreetMap servers to the map.
The d3.json function fetches the earthquake data from the URL:https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';
Then the script loops through the earthquake data and extracts data such as magnitude, depth, place, and time. 
It then calculates the value for the colour using the getcolordepth function and creates the circle marker on the map, popups are also added to the circle marker showing the information regarding the earthquake. 
The script then creates the legend and adds it to the map using the function 'onAdd' 
Finally, the script gives the colour value for the depth value of an earthquake. 
