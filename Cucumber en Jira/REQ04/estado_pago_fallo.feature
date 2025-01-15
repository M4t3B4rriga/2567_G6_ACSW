Scenario: Marcar un pedido inexistente como pagado
  Given el pedido "999" no existe en el sistema
  When el cajero intenta marcar el pedido como "Pagado"
  Then el sistema debe mostrar un mensaje de error "Pedido no encontrado"
  And no debe realizar cambios en el estado de los pedidos
