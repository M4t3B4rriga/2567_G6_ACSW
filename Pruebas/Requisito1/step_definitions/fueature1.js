// Feature 1: Creación de pedidos por meseros
const { Given, When, Then } = require('@cucumber/cucumber');

// Variables para simular la interacción
let menuSeleccionado = [];
let pedidoConfirmado = false;
let notificacion = "";

Given('el mesero está en la pantalla del menú digital', function () {
  menuSeleccionado = [];
});

When('selecciona {string} y {string}', function (plato, bebida) {
  menuSeleccionado.push(plato, bebida);
});

When('confirma el pedido', function () {
  if (menuSeleccionado.length > 0) {
    pedidoConfirmado = true;
  }
});

Then('el sistema debe mostrar el pedido con {string} y {string} en la lista de pedidos activos', function (plato, bebida) {
  if (!menuSeleccionado.includes(plato) || !menuSeleccionado.includes(bebida)) {
    throw new Error('El pedido no contiene los platos seleccionados');
  }
});

Then('enviar el pedido a la pantalla de la cocina', function () {
  if (!pedidoConfirmado) {
    throw new Error('El pedido no fue confirmado');
  }
});