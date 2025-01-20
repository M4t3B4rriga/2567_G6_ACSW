const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');

let pedidos;
let mensaje;

Given('el pedido {string} está en estado {string}', function (pedido, estado) {
  pedidos = { [pedido]: { estado, items: [] } };
  mensaje = null;
});

When('el mesero modifica el pedido añadiendo {string}', function (item) {
  const pedido = Object.keys(pedidos)[0];
  if (pedidos[pedido].estado === "Pendiente") {
    pedidos[pedido].items.push(item);
  } else {
    mensaje = "No se puede modificar un pedido ya preparado";
  }
});

Then('el sistema debe mostrar el pedido actualizado con {string}', function (itemEsperado) {
  const pedido = Object.keys(pedidos)[0];
  assert.ok(pedidos[pedido].items.includes(itemEsperado));
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
