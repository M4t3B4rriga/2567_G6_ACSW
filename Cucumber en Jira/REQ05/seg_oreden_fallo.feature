Scenario: Cambiar el estado de un pedido inexistente
  Given el pedido "999" no existe en el sistema
  When el cocinero intenta cambiar el estado a "En preparación"
  Then el sistema debe mostrar un mensaje de error "Pedido no encontrado"
  And no debe realizar cambios en el estado de los pedidos
