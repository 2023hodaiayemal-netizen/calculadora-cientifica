const test = require('node:test');
const assert = require('node:assert/strict');
const { calculate } = require('../script.js');

test('resuelve operaciones básicas con números enteros y decimales', () => {
  assert.equal(calculate('add', '2', '3').value, 5);
  assert.equal(calculate('subtract', '2', '5').value, -3);
  assert.equal(calculate('multiply', '-4', '2').value, -8);
  assert.equal(calculate('divide', '7', '2').value, 3.5);
  assert.equal(calculate('add', '1.5', '2.25').value, 3.75);
});

test('resuelve potencia y raíz usando los operandos correctos', () => {
  assert.equal(calculate('power', '2', '3').value, 8);
  assert.equal(calculate('sqrt', '9', '').value, 3);
});

test('rechaza entradas inválidas y resultados engañosos', () => {
  assert.equal(calculate('add', '', '2').ok, false);
  assert.match(calculate('divide', '4', '0').message, /cero/i);
  assert.match(calculate('sqrt', '-1', '').message, /negativo/i);
  assert.equal(calculate('power', '1e308', '2').ok, false);
});
