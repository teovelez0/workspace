// =====================================
// CALCULADORA CON FUNCIONES
// =====================================

// Función suma
function sumar(a, b) {
  return a + b;
}

// Función resta
function restar(a, b) {
  return a - b;
}

// Función multiplicación
function multiplicar(a, b) {
  return a * b;
}

// Función división
function dividir(a, b) {
  if (b === 0)   
    return "Error: No se puede dividir por cero.";
  }

function potencia(a, b) {
    return a ** b ;

}
function mayor(a, b) {
  return a > b ? a : b;
}
// =====================================
// LLAMADO DE FUNCIONES
// =====================================

console.log("Resultado suma:");
console.log(sumar(10, 5)); // 15

console.log("----------------");

console.log("Resultado resta:");
console.log(restar(10, 5)); // 5

console.log("----------------");

console.log("Resultado multiplicación:");
console.log(multiplicar(10, 5)); // 50

console.log("----------------");

console.log("Resultado división:");
console.log(dividir(10, 5)); // 2

console.log("Resultado potencia:");
console.log(potencia(2, 3)); // 8

console.log("Resultado mayor:");
console.log(mayor(8, 9)); //  9