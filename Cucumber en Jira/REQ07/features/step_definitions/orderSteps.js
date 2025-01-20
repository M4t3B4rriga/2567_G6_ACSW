const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');

let pedidos;
let listaPorCobrar;
let error;

Given('existen los pedidos {string} y {string} con estado {string}', function (pedido1, pedido2, estado) {
  pedidos = {
    [pedido1]: estado,
    [pedido2]: estado,
  };
  listaPorCobrar = [];
  error = null;
});

Given('no hay pedidos con estado {string}', function (estado) {
  pedidos = {};
  listaPorCobrar = [];
  error = null;
});

When('el mesero solicita la lista de pedidos por cobrar', function () {
  listaPorCobrar = Object.keys(pedidos).filter((pedido) => pedidos[pedido] === 'Por cobrar');
  if (listaPorCobrar.length === 0) {
    error = `No hay pedidos por cobrar`;
  }
});

Then('el sistema debe mostrar {string}', function (listaEsperada) {
  assert.strictEqual(listaPorCobrar.join(', '), listaEsperada);
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
