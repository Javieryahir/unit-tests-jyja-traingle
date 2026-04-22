/**
 * Clasificador de Triángulos
 * Referencia: Glenford Myers, "The Art of Software Testing"
 *
 * Clasifica un triángulo según las longitudes de sus tres lados.
 *
 * @param {number} a - Longitud del primer lado
 * @param {number} b - Longitud del segundo lado
 * @param {number} c - Longitud del tercer lado
 * @returns {string} Tipo de triángulo: 'Equilátero', 'Isósceles' o 'Escaleno'
 * @throws {Error} Si los argumentos son inválidos o no forman un triángulo válido
 */
function clasificarTriangulo(a, b, c) {
  // Validar número de argumentos
  if (arguments.length !== 3) {
    throw new Error('Se requieren exactamente tres argumentos');
  }

  // Validar que sean números
  if (typeof a !== 'number' || typeof b !== 'number' || typeof c !== 'number') {
    throw new Error('Los lados deben ser números');
  }

  // Validar que sean enteros
  if (!Number.isInteger(a) || !Number.isInteger(b) || !Number.isInteger(c)) {
    throw new Error('Los lados deben ser números enteros');
  }

  // Validar que sean positivos (mayores a cero)
  if (a <= 0 || b <= 0 || c <= 0) {
    throw new Error('Las longitudes de los lados deben ser mayores que cero');
  }

  // Validar que no excedan el valor máximo permitido (MAX_SAFE_INTEGER)
  const MAX = Number.MAX_SAFE_INTEGER;
  if (a > MAX || b > MAX || c > MAX) {
    throw new Error('Las longitudes de los lados exceden el valor máximo permitido');
  }

  // Validar la desigualdad triangular (condición necesaria para que sea triángulo válido)
  if (a + b <= c || a + c <= b || b + c <= a) {
    throw new Error('Los lados no forman un triángulo válido');
  }

  // Clasificar el triángulo
  if (a === b && b === c) {
    return 'Equilátero';
  }

  if (a === b || b === c || a === c) {
    return 'Isósceles';
  }

  return 'Escaleno';
}

module.exports = { clasificarTriangulo };
