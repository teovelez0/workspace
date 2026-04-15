let csv = "manzana,pera,uva,mango,banano";

let frutas = csv.split(",");

console.log("Cantidad de elementos:", frutas.length);

let resultado = frutas.join(" - ");
console.log("Array unido:", resultado);