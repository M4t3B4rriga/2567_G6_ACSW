const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');

let platos;
let mensaje;

Given('el plato {string} está en estado {string}', function (plato, estado) {
  platos = { [plato]: estado };
  mensaje = null;
});

Given('no está registrado el plato {string}', function (plato) {
  platos = {};
  mensaje = null;
});

When('el mesero consulta el estado de {string}', function (plato) {
  if (platos[plato]) {
    mensaje = `${plato}: ${platos[plato]}`;
  } else {
    mensaje = "El plato no existe";
  }
});

Then('el sistema debe mostrar {string}', function (estadoEsperado) {
  assert.strictEqual(mensaje, estadoEsperado);
});

Then('el sistema debe mostrar un mensaje de error {string}', function (mensajeErrorEsperado) {
  assert.strictEqual(mensaje, mensajeErrorEsperado);
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
