const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');

let pedidosPago;
let mensajePago;

Given('el pedido {string} está en estado {string}', function (pedido, estado) {
  pedidosPago = { [pedido]: estado };
  mensajePago = null;
});

When('el mesero marca el pedido como {string}', function (nuevoEstado) {
  const pedido = Object.keys(pedidosPago)[0];
  if (pedidosPago[pedido] === "Pagado") {
    mensajePago = "El pedido ya está registrado como pagado";
  } else {
    pedidosPago[pedido] = nuevoEstado;
  }
});

Then('el sistema debe mostrar {string}', function (estadoEsperado) {
  const pedido = Object.keys(pedidosPago)[0];
  assert.strictEqual(`${pedido}: ${pedidosPago[pedido]}`, estadoEsperado);
});

Then('el sistema debe mostrar un mensaje de error {string}', function (mensajeErrorEsperado) {
  assert.strictEqual(mensajePago, mensajeErrorEsperado);
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
