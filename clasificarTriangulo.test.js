/**
 * Pruebas Unitarias - Clasificador de Triángulos
 * Referencia: Glenford Myers, "The Art of Software Testing"
 *
 * Cubre:
 *  - Clases de equivalencia válidas e inválidas
 *  - Condiciones de borde especificadas
 *  - Principio AAA (Arrange, Act, Assert)
 */

const { clasificarTriangulo } = require('./clasificarTriangulo');

// ─────────────────────────────────────────────────────────────────────────────
// 1. CLASES DE EQUIVALENCIA VÁLIDAS
// ─────────────────────────────────────────────────────────────────────────────
describe('Clases de equivalencia válidas', () => {

  // 1a. Equilátero
  describe('Triángulo Equilátero', () => {
    test('Tres lados iguales (3, 3, 3) → Equilátero', () => {
      // Arrange
      const a = 3, b = 3, c = 3;
      const expected = 'Equilátero';

      // Act
      const result = clasificarTriangulo(a, b, c);

      // Assert
      expect(result).toBe(expected);
    });

    test('Tres lados iguales grandes (100, 100, 100) → Equilátero', () => {
      // Arrange
      const a = 100, b = 100, c = 100;

      // Act
      const result = clasificarTriangulo(a, b, c);

      // Assert
      expect(result).toBe('Equilátero');
    });
  });

  // 1b. Isósceles – las tres permutaciones
  describe('Triángulo Isósceles (todas las permutaciones)', () => {
    test('a === b ≠ c  (5, 5, 3) → Isósceles', () => {
      // Arrange
      const a = 5, b = 5, c = 3;

      // Act
      const result = clasificarTriangulo(a, b, c);

      // Assert
      expect(result).toBe('Isósceles');
    });

    test('b === c ≠ a  (3, 5, 5) → Isósceles', () => {
      // Arrange
      const a = 3, b = 5, c = 5;

      // Act
      const result = clasificarTriangulo(a, b, c);

      // Assert
      expect(result).toBe('Isósceles');
    });

    test('a === c ≠ b  (5, 3, 5) → Isósceles', () => {
      // Arrange
      const a = 5, b = 3, c = 5;

      // Act
      const result = clasificarTriangulo(a, b, c);

      // Assert
      expect(result).toBe('Isósceles');
    });
  });

  // 1c. Escaleno
  describe('Triángulo Escaleno', () => {
    test('Tres lados distintos (3, 4, 5) → Escaleno', () => {
      // Arrange
      const a = 3, b = 4, c = 5;

      // Act
      const result = clasificarTriangulo(a, b, c);

      // Assert
      expect(result).toBe('Escaleno');
    });

    test('Tres lados distintos (7, 10, 5) → Escaleno', () => {
      // Arrange
      const a = 7, b = 10, c = 5;

      // Act
      const result = clasificarTriangulo(a, b, c);

      // Assert
      expect(result).toBe('Escaleno');
    });
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 2. CLASES DE EQUIVALENCIA INVÁLIDAS
// ─────────────────────────────────────────────────────────────────────────────
describe('Clases de equivalencia inválidas', () => {

  // 2a. Imposible – no satisface la desigualdad triangular
  describe('Lados que no forman un triángulo válido', () => {
    test('a ≥ b+c  (10, 3, 3) → lanza error', () => {
      // Arrange
      const a = 10, b = 3, c = 3;

      // Act & Assert
      expect(() => clasificarTriangulo(a, b, c))
        .toThrow('Los lados no forman un triángulo válido');
    });

    test('b ≥ a+c  (3, 10, 3) → lanza error', () => {
      // Arrange
      const a = 3, b = 10, c = 3;

      // Act & Assert
      expect(() => clasificarTriangulo(a, b, c))
        .toThrow('Los lados no forman un triángulo válido');
    });

    test('c ≥ a+b  (3, 3, 10) → lanza error', () => {
      // Arrange
      const a = 3, b = 3, c = 10;

      // Act & Assert
      expect(() => clasificarTriangulo(a, b, c))
        .toThrow('Los lados no forman un triángulo válido');
    });
  });

  // 2b. Un lado de longitud 0
  describe('Un lado de longitud cero', () => {
    test('a = 0  (0, 3, 3) → lanza error', () => {
      // Arrange
      const a = 0, b = 3, c = 3;

      // Act & Assert
      expect(() => clasificarTriangulo(a, b, c))
        .toThrow('Las longitudes de los lados deben ser mayores que cero');
    });

    test('b = 0  (3, 0, 3) → lanza error', () => {
      // Arrange
      const a = 3, b = 0, c = 3;

      // Act & Assert
      expect(() => clasificarTriangulo(a, b, c))
        .toThrow('Las longitudes de los lados deben ser mayores que cero');
    });

    test('c = 0  (3, 3, 0) → lanza error', () => {
      // Arrange
      const a = 3, b = 3, c = 0;

      // Act & Assert
      expect(() => clasificarTriangulo(a, b, c))
        .toThrow('Las longitudes de los lados deben ser mayores que cero');
    });
  });

  // 2c. Lados negativos
  describe('Lados negativos', () => {
    test('a negativo  (-1, 3, 3) → lanza error', () => {
      // Arrange
      const a = -1, b = 3, c = 3;

      // Act & Assert
      expect(() => clasificarTriangulo(a, b, c))
        .toThrow('Las longitudes de los lados deben ser mayores que cero');
    });

    test('Todos negativos  (-3, -3, -3) → lanza error', () => {
      // Arrange
      const a = -3, b = -3, c = -3;

      // Act & Assert
      expect(() => clasificarTriangulo(a, b, c))
        .toThrow('Las longitudes de los lados deben ser mayores que cero');
    });
  });

  // 2d. Lados de punto flotante
  describe('Lados de punto flotante (no enteros)', () => {
    test('Flotante  (3.5, 4, 5) → lanza error', () => {
      // Arrange
      const a = 3.5, b = 4, c = 5;

      // Act & Assert
      expect(() => clasificarTriangulo(a, b, c))
        .toThrow('Los lados deben ser números enteros');
    });

    test('Flotante  (1, 1, 1.1) → lanza error', () => {
      // Arrange
      const a = 1, b = 1, c = 1.1;

      // Act & Assert
      expect(() => clasificarTriangulo(a, b, c))
        .toThrow('Los lados deben ser números enteros');
    });
  });

  // 2e. Número incorrecto de parámetros
  describe('Número incorrecto de parámetros', () => {
    test('Solo dos argumentos  (3, 3) → lanza error', () => {
      // Arrange / Act & Assert
      expect(() => clasificarTriangulo(3, 3))
        .toThrow('Se requieren exactamente tres argumentos');
    });

    test('Un solo argumento  (3) → lanza error', () => {
      // Arrange / Act & Assert
      expect(() => clasificarTriangulo(3))
        .toThrow('Se requieren exactamente tres argumentos');
    });

    test('Sin argumentos  () → lanza error', () => {
      // Arrange / Act & Assert
      expect(() => clasificarTriangulo())
        .toThrow('Se requieren exactamente tres argumentos');
    });

    test('Argumento de tipo cadena  ("3", 3, 3) → lanza error', () => {
      // Arrange / Act & Assert
      expect(() => clasificarTriangulo('3', 3, 3))
        .toThrow('Los lados deben ser números');
    });
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 3. CONDICIONES DE BORDE
// ─────────────────────────────────────────────────────────────────────────────
describe('Condiciones de borde', () => {

  // 3.1 Isósceles casi Equilátero
  describe('Isósceles casi equilátero', () => {
    test('(10, 10, 11) → Isósceles', () => {
      // Arrange
      const a = 10, b = 10, c = 11;

      // Act
      const result = clasificarTriangulo(a, b, c);

      // Assert
      expect(result).toBe('Isósceles');
    });

    test('(10, 11, 10) → Isósceles', () => {
      // Arrange
      const a = 10, b = 11, c = 10;

      // Act
      const result = clasificarTriangulo(a, b, c);

      // Assert
      expect(result).toBe('Isósceles');
    });

    test('(11, 10, 10) → Isósceles', () => {
      // Arrange
      const a = 11, b = 10, c = 10;

      // Act
      const result = clasificarTriangulo(a, b, c);

      // Assert
      expect(result).toBe('Isósceles');
    });
  });

  // 3.2 Escaleno casi Isósceles / Equilátero
  describe('Escaleno casi isósceles o equilátero', () => {
    test('(10, 11, 12) → Escaleno', () => {
      // Arrange
      const a = 10, b = 11, c = 12;

      // Act
      const result = clasificarTriangulo(a, b, c);

      // Assert
      expect(result).toBe('Escaleno');
    });
  });

  // 3.3 Triángulos muy pequeños
  describe('Triángulos muy pequeños', () => {
    test('Mínimo entero válido  (1, 1, 1) → Equilátero', () => {
      // Arrange
      const a = 1, b = 1, c = 1;

      // Act
      const result = clasificarTriangulo(a, b, c);

      // Assert
      expect(result).toBe('Equilátero');
    });

    test('(1, 1, 2) no forma triángulo → lanza error', () => {
      // Arrange
      const a = 1, b = 1, c = 2;

      // Act & Assert
      expect(() => clasificarTriangulo(a, b, c))
        .toThrow('Los lados no forman un triángulo válido');
    });
  });

  // 3.4 Triángulos muy grandes
  describe('Triángulos muy grandes', () => {
    test('(1000000, 1000000, 1000000) → Equilátero', () => {
      // Arrange
      const a = 1000000, b = 1000000, c = 1000000;

      // Act
      const result = clasificarTriangulo(a, b, c);

      // Assert
      expect(result).toBe('Equilátero');
    });

    test('(999999, 1000000, 1000001) → Escaleno', () => {
      // Arrange
      const a = 999999, b = 1000000, c = 1000001;

      // Act
      const result = clasificarTriangulo(a, b, c);

      // Assert
      expect(result).toBe('Escaleno');
    });
  });

  // 3.5 Combinaciones de lados muy largos y muy cortos
  describe('Combinaciones de lados muy largos y muy cortos', () => {
    test('(1, 1000000, 1000000) → Isósceles', () => {
      // Arrange
      const a = 1, b = 1000000, c = 1000000;

      // Act
      const result = clasificarTriangulo(a, b, c);

      // Assert
      expect(result).toBe('Isósceles');
    });

    test('(1000000, 1, 1000000) → Isósceles', () => {
      // Arrange
      const a = 1000000, b = 1, c = 1000000;

      // Act
      const result = clasificarTriangulo(a, b, c);

      // Assert
      expect(result).toBe('Isósceles');
    });

    test('(1000000, 1000000, 1) → Isósceles', () => {
      // Arrange
      const a = 1000000, b = 1000000, c = 1;

      // Act
      const result = clasificarTriangulo(a, b, c);

      // Assert
      expect(result).toBe('Isósceles');
    });

    test('Lado muy corto que invalida el triángulo  (1, 1000000, 1000002) → lanza error', () => {
      // Arrange – 1 + 1000000 = 1000001 < 1000002, no cumple la desigualdad triangular
      const a = 1, b = 1000000, c = 1000002;

      // Act & Assert
      expect(() => clasificarTriangulo(a, b, c))
        .toThrow('Los lados no forman un triángulo válido');
    });
  });

  // 3.6 Lados fuera de rango (mayor que MAX_SAFE_INTEGER)
  describe('Lados fuera de rango (> MAX_SAFE_INTEGER)', () => {
    test('a > MAX_SAFE_INTEGER → lanza error', () => {
      // Arrange
      const a = Number.MAX_SAFE_INTEGER + 1, b = 3, c = 3;

      // Act & Assert
      expect(() => clasificarTriangulo(a, b, c))
        .toThrow('Las longitudes de los lados exceden el valor máximo permitido');
    });
  });

  // 3.7 Un lado igual a la suma de los otros dos (todas las permutaciones)
  describe('Un lado igual exactamente a la suma de los otros dos (triángulo degenerado)', () => {
    test('a = b + c  (6, 4, 2) → lanza error', () => {
      // Arrange
      const a = 6, b = 4, c = 2;

      // Act & Assert
      expect(() => clasificarTriangulo(a, b, c))
        .toThrow('Los lados no forman un triángulo válido');
    });

    test('b = a + c  (4, 6, 2) → lanza error', () => {
      // Arrange
      const a = 4, b = 6, c = 2;

      // Act & Assert
      expect(() => clasificarTriangulo(a, b, c))
        .toThrow('Los lados no forman un triángulo válido');
    });

    test('c = a + b  (4, 2, 6) → lanza error', () => {
      // Arrange
      const a = 4, b = 2, c = 6;

      // Act & Assert
      expect(() => clasificarTriangulo(a, b, c))
        .toThrow('Los lados no forman un triángulo válido');
    });
  });

  // 3.8 Un lado levemente MENOR a la suma de los otros dos (triángulo válido por un margen mínimo)
  describe('Un lado apenas menor que la suma de los otros dos (válido por margen mínimo)', () => {
    test('a = (b+c)-1  (5, 4, 2) → Escaleno', () => {
      // Arrange
      const a = 5, b = 4, c = 2;

      // Act
      const result = clasificarTriangulo(a, b, c);

      // Assert
      expect(result).toBe('Escaleno');
    });

    test('b = (a+c)-1  (4, 5, 2) → Escaleno', () => {
      // Arrange
      const a = 4, b = 5, c = 2;

      // Act
      const result = clasificarTriangulo(a, b, c);

      // Assert
      expect(result).toBe('Escaleno');
    });

    test('c = (a+b)-1  (4, 2, 5) → Escaleno', () => {
      // Arrange
      const a = 4, b = 2, c = 5;

      // Act
      const result = clasificarTriangulo(a, b, c);

      // Assert
      expect(result).toBe('Escaleno');
    });
  });

  // 3.9 Un lado levemente MAYOR a la suma de los otros dos (imposible)
  describe('Un lado apenas mayor que la suma de los otros dos (inválido por margen mínimo)', () => {
    test('a = (b+c)+1  (7, 4, 2) → lanza error', () => {
      // Arrange
      const a = 7, b = 4, c = 2;

      // Act & Assert
      expect(() => clasificarTriangulo(a, b, c))
        .toThrow('Los lados no forman un triángulo válido');
    });

    test('b = (a+c)+1  (4, 7, 2) → lanza error', () => {
      // Arrange
      const a = 4, b = 7, c = 2;

      // Act & Assert
      expect(() => clasificarTriangulo(a, b, c))
        .toThrow('Los lados no forman un triángulo válido');
    });

    test('c = (a+b)+1  (4, 2, 7) → lanza error', () => {
      // Arrange
      const a = 4, b = 2, c = 7;

      // Act & Assert
      expect(() => clasificarTriangulo(a, b, c))
        .toThrow('Los lados no forman un triángulo válido');
    });
  });
});
