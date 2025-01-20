const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');

let platosEstado;
let mensajeEstado;

Given('el menú contiene {string}', function (plato) {
  platosEstado = { [plato]: "Activo" };
  mensajeEstado = null;
});

Given('el plato {string} ya está desactivado', function (plato) {
  platosEstado = { [plato]: "Desactivado" };
  mensajeEstado = null;
});

When('el administrador desactiva {string}', function (plato) {
  if (platosEstado[plato] === "Desactivado") {
    mensajeEstado = "El plato ya está desactivado";
  } else {
    platosEstado[plato] = "Desactivado";
    mensajeEstado = `${plato} desactivado`;
  }
});

Then('el sistema debe mostrar {string}', function (mensajeEsperado) {
  assert.strictEqual(mensajeEstado, mensajeEsperado);
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
