let arregloPrueba = [1, 2, 3, 4, 5];

function myMap(arreglo, callback) {
  let nuevoArreglo = [];

  for (let i = 0; i < arreglo.length; i++) {
    let nuevoValor = callback(arreglo[i]);

    nuevoArreglo.push(nuevoValor);
  }

  return nuevoArreglo;
}

let nuevoArregloPropio = myMap(arregloPrueba, (x) => x * 2);

console.log(nuevoArregloPropio);
