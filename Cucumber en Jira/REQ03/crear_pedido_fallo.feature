Scenario: Crear un pedido sin seleccionar platos
  Given el mesero está en la pantalla del menú digital
  When no selecciona ningún plato
  And intenta confirmar el pedido
  Then el sistema debe mostrar un mensaje de error "Debe seleccionar al menos un plato"
  And no debe agregar el pedido a la lista de pedidos activos
