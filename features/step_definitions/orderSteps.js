
const {Given, When, Then}=require('@cucumber/cucumber');
const assert=require('assert');

// variables para simular la interaccion 
let mesa={};
let pedido={};
let estadoPedido='';

//ESCENARIO UNO
//given
Given('el mesero le asigan una mesa al cliente', function () {
    mesa={};
});

//ESCENARIO DOS
//given
Given('un cliente revisa el menú', function () {
    pedido={};
});

// When
When('selecciona {string} y {string}', function (item1, item2) {
    pedido.items = [item1, item2];
});

// Then
Then('realiza registro de sus datos para el pedido', function () {
    estadoPedido = "En preparación";
  });

Then('Envia el pedido al cocinero', function () {
    estadoPedido = "Por hacer";
});

Then('el estado del pedido debe ser {string}', function (expectedState) {
    assert.strictEqual(estadoPedido, expectedState);
});


//ESCENARIO TRES
