import { coffeeData } from './data.js';
console.log(coffeeData);


let numClusters = 3;

// console.log(clusters[0].datos);
// console.log(clusters[0].datos.length);
export let agrupaciones = init(numClusters);

function init(numClusters) {
    let clusters = createCluster(numClusters);
    let copia = JSON.parse(JSON.stringify(clusters));
    console.log(copia);
    HCMclassify(clusters);
    console.log(copia);
    console.log(clusters);
    return clusters;
}

function HCMclassify(clusters) {
    // Centroides
    let promedios = [];
    let count = 0;
    for (let i = 0; i < numClusters; i += 1) {
        let suma = 0;
        for (let j = 0; j < clusters[i].datos.length; j += 1) {
            suma += clusters[i].datos[j];
        }
        promedios.push(suma / clusters[i].datos.length);
    }
    console.log('PROMEDIOS');
    console.table(promedios);

    // Diferencias
    for (let i = 0; i < numClusters; i += 1) {
        for (let j = 0; j < clusters[i].datos.length; j += 1) {
            let diferencias = [],
                min, minPosition;
            let dato = clusters[i].datos[j];
            let positionDato = clusters[i].datos.indexOf(dato);

            for (let k = 0; k < promedios.length; k += 1) {
                diferencias.push(Math.abs(dato - promedios[k]));
            }
            console.table(diferencias);

            min = Math.min(...diferencias);
            minPosition = diferencias.indexOf(min);
            // console.log(`El cluster en en que estoy es el ${i}`);
            // console.log(`La posicion en la que estaba mi numero antes del minimo es ${posicion}`);
            // console.log(`La nueva posicion en la que esta mi numero despues del minimo es ${newPosicion}`);
            if (i !== minPosition) {
                console.log('Se ejecuta en ' + i + 'vs' + minPosition);
                changePosition(clusters, minPosition, i, dato, positionDato);
                count += 1;
            }

        }
    }

    console.log('El contador va en ' + count);
    if (count == 0) {
        return 0;
    } else {
        HCMclassify(clusters);
    }

}


function changePosition(clusters, newCluster, numCluster, dato, positionDato) {
    // let copia = Array.from(clusters);
    let removed = clusters[numCluster].datos.splice(positionDato, 1);
    let nombreRemoved = clusters[numCluster].nombre.splice(positionDato, 1);
    let latitudRemoved = clusters[numCluster].latitud.splice(positionDato, 1);
    let longitudRemoved = clusters[numCluster].longitud.splice(positionDato, 1);
    console.log(removed);
    clusters[newCluster].datos.push(dato);
    clusters[newCluster].nombre.push(nombreRemoved.toString());
    clusters[newCluster].latitud.push(parseFloat(latitudRemoved.toString(), 10));
    clusters[newCluster].longitud.push(parseFloat(longitudRemoved.toString(), 10));

}



function putDataRandom(coffeeData, clusters) {
    for (let i = 0; i < coffeeData.length; i += 1) {
        let randomNumber = Math.floor(Math.floor(Math.random() * clusters.length));
        clusters[randomNumber].datos.push(coffeeData[i].toneladas);
        clusters[randomNumber].nombre.push(coffeeData[i].pais);
        clusters[randomNumber].latitud.push(coffeeData[i].latitud);
        clusters[randomNumber].longitud.push(coffeeData[i].longitud);

    }
    return clusters;
}


function createCluster(numClusters) {
    let clusters = [];
    for (let i = 0; i < numClusters; i += 1) {
        clusters.push({
            agrupacion: i,
            nombre: [],
            datos: [],
            latitud: [],
            longitud: []
        })
    }
    let dataClusters = putDataRandom(coffeeData, clusters);
    return dataClusters;
}




/*Pasos del algoritmo HCM
-> Definir tus grupos, ppor lo menos deben ser 2 grupos, maximo n datos - 1
 1.- Asignar datos al azar
2.- Calcular medias
3.- Diferencias de cada uno de los datos con cada uno de las medias
4.- Detectar el minimo entre cada columna
5.- Detectar los que cambiaron
6.- Realizar los cambios correspondientes en cada columna
7.- Verificar si ya no hay cambios, si los hay regresar a paso 3
8.- Si ya no hubo cambios, presentar los grupos o clusters resultantes en pantalla

- Si ya no hubo cambios, presentar los grupos o clusters resultantes en pantalla
*/