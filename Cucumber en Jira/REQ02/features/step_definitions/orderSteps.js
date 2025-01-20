
const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');

let pedido;
let mensaje;

Given('el mesero confirma el pedido {string}', function (pedidoNombre) {
  pedido = pedidoNombre;
  mensaje = null;
});

Given('el mesero confirma un pedido vacío', function () {
  pedido = '';
  mensaje = null;
});

When('el pedido es enviado a la cocina', function () {
  if (pedido) {
    mensaje = `${pedido} enviado a la cocina`;
  } else {
    mensaje = "El pedido está vacío";
  }
});

Then('el sistema debe mostrar {string}', function (mensajeEsperado) {
  assert.strictEqual(mensaje, mensajeEsperado);
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
