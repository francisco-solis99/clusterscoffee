import { agrupaciones } from './HCM.js';

//Api key for map
const mapbox_token = 'pk.eyJ1IjoiamF2aWVyMDgiLCJhIjoiY2ttZWRyNWM1MDFiajJubXFkODZncG0wMiJ9.XcXiv_5mKvvxnenI1s2Agg';

//get the map
mapboxgl.accessToken = mapbox_token;

//draw the map and make some styles of config
let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    zoom: 1.5
});

//Draw our clusters of data into map
const colors = ['red', 'yellow', 'green'];
for (let i = 0; i < agrupaciones.length; i += 1) {
    for (let j = 0; j < agrupaciones[i].datos.length; j += 1) {
        new mapboxgl.Marker({
                color: colors[i]
            }).setLngLat([agrupaciones[i].longitud[j], agrupaciones[i].latitud[j]]).setPopup(new mapboxgl.Popup().setHTML(
                `<h1>Cluster ${i}</h1>
                 <h2>${agrupaciones[i].nombre[j]} </h2> 
                 <p>${agrupaciones[i].datos[j]} toneladas </p>`))
            .addTo(map);
    }
}