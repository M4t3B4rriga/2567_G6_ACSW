Scenario: Intentar editar un pedido inexistente
  Given el pedido "999" no existe en el sistema
  When el mesero intenta añadir "MiniParrillada"
  Then el sistema debe mostrar un mensaje de error "Pedido no encontrado"
  And no debe realizar cambios
