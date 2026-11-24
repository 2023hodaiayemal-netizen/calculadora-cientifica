(function () {
  function parseOperand(raw, label) {
    if (raw === null || raw === undefined || String(raw).trim() === '') return { ok: false, message: `Completá el operando ${label}.` };
    const value = Number(raw);
    if (!Number.isFinite(value)) return { ok: false, message: `El operando ${label} debe ser un número válido.` };
    return { ok: true, value };
  }

  function calculate(operation, rawA, rawB) {
    const a = parseOperand(rawA, 'A');
    if (!a.ok) return a;
    if (operation === 'sqrt') {
      if (a.value < 0) return { ok: false, message: 'No se puede calcular la raíz de un número negativo.' };
      return { ok: true, value: Math.sqrt(a.value) };
    }
    const b = parseOperand(rawB, 'B');
    if (!b.ok) return b;
    let value;
    if (operation === 'add') value = a.value + b.value;
    else if (operation === 'subtract') value = a.value - b.value;
    else if (operation === 'multiply') value = a.value * b.value;
    else if (operation === 'divide') {
      if (b.value === 0) return { ok: false, message: 'No se puede dividir por cero.' };
      value = a.value / b.value;
    } else if (operation === 'power') value = a.value ** b.value;
    else return { ok: false, message: 'Elegí una operación válida.' };
    if (!Number.isFinite(value)) return { ok: false, message: 'El resultado no es un número finito.' };
    return { ok: true, value };
  }

  function formatResult(value) {
    return String(Number(value.toPrecision(12)));
  }

  function init() {
    const inputA = document.querySelector('#operando-a');
    const inputB = document.querySelector('#operando-b');
    const output = document.querySelector('#resultado');
    const message = document.querySelector('#mensaje');
    function run(operation) {
      const result = calculate(operation, inputA.value, inputB.value);
      output.textContent = result.ok ? formatResult(result.value) : '—';
      message.textContent = result.ok ? '' : result.message;
    }
    document.querySelectorAll('[data-operation]').forEach((button) => button.addEventListener('click', () => run(button.dataset.operation)));
    [inputA, inputB].forEach((input) => input.addEventListener('keydown', (event) => { if (event.key === 'Enter') { event.preventDefault(); run('add'); } }));
    document.querySelector('#limpiar').addEventListener('click', () => { inputA.value = ''; inputB.value = ''; output.textContent = '—'; message.textContent = ''; inputA.focus(); });
  }

  if (typeof module !== 'undefined') module.exports = { calculate, formatResult };
  if (typeof document !== 'undefined') document.addEventListener('DOMContentLoaded', init);
}());
