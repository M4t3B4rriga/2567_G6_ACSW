const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');

let menu;
let mensajeMenu;

Given('el menú actual no contiene {string}', function (plato) {
  menu = [];
  mensajeMenu = null;
});

Given('el menú actual contiene {string}', function (plato) {
  menu = [plato];
  mensajeMenu = null;
});

When('el administrador agrega {string} al menú', function (plato) {
  if (menu.includes(plato)) {
    mensajeMenu = "El plato ya existe en el menú";
  } else {
    menu.push(plato);
    mensajeMenu = `${plato} añadido al menú`;
  }
});

Then('el sistema debe mostrar {string}', function (mensajeEsperado) {
  assert.strictEqual(mensajeMenu, mensajeEsperado);
});

Then('el sistema debe mostrar un mensaje de error {string}', function (mensajeErrorEsperado) {
  assert.strictEqual(mensajeMenu, mensajeErrorEsperado);
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
