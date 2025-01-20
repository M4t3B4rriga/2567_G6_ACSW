const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');

let platosEstado;
let error;

Given('el plato {string} está en estado {string}', function (plato, estado) {
  platosEstado = { [plato]: estado };
  error = null;
});

Given('el plato {string} no está registrado', function (plato) {
  platosEstado = {};
  error = null;
});

When('el mesero cambia el estado de {string} a {string}', function (plato, nuevoEstado) {
  if (platosEstado[plato]) {
    platosEstado[plato] = nuevoEstado;
  } else {
    error = `El plato no existe`;
  }
});

Then('el sistema debe mostrar {string}', function (estadoEsperado) {
  const [plato, estado] = estadoEsperado.split(': ');
  assert.strictEqual(platosEstado[plato], estado);
});

Then('el sistema debe mostrar un mensaje de error {string}', function (mensajeErrorEsperado) {
  assert.strictEqual(error, mensajeErrorEsperado);
});

const reporter = require('cucumber-html-reporter');

const options = {
    theme: 'bootstrap',
    jsonFile: 'results.json',
    output: 'report.html',
    reportSuiteAsScenarios: true,
    launchReport: true,
};

reporter.generate(options);
