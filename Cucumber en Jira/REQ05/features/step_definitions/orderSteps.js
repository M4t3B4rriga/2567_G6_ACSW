const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');

let pedidoEstado;
let notificacion;
let error;

Given('el pedido {string} está en estado {string}', function (pedido, estado) {
  pedidoEstado = { [pedido]: estado };
  notificacion = null;
  error = null;
});

Given('no existe el pedido {string}', function (pedido) {
  pedidoEstado = {};
  notificacion = null;
  error = `El pedido no existe`;
});

When('el estado de {string} cambia a {string}', function (pedido, nuevoEstado) {
  if (pedidoEstado[pedido]) {
    pedidoEstado[pedido] = nuevoEstado;
    if (nuevoEstado === "Listo") {
      notificacion = `El pedido ${pedido} está listo`;
    }
  } else {
    error = `El pedido no existe`;
  }
});

Then('el sistema debe notificar al mesero con el mensaje {string}', function (mensajeEsperado) {
  assert.strictEqual(notificacion, mensajeEsperado);
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
