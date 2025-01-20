const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');

let historial;
let mensajeHistorial;

Given('el historial de cambios está vacío', function () {
  historial = [];
  mensajeHistorial = null;
});

When('el administrador agrega {string} al menú', function (cambio) {
  historial.push(`${cambio} añadido al menú`);
});

When('el administrador consulta el historial', function () {
  if (historial.length === 0) {
    mensajeHistorial = "El historial está vacío";
  }
});

Then('el sistema debe registrar {string} en el historial', function (cambioEsperado) {
  assert.ok(historial.includes(cambioEsperado));
});

Then('el sistema debe mostrar {string}', function (mensajeEsperado) {
  assert.strictEqual(mensajeHistorial, mensajeEsperado);
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
