Scenario: Intentar cancelar un pedido ya enviado
  Given el pedido "103" está en estado "En preparación"
  When el mesero intenta cancelar el pedido
  Then el sistema debe mostrar un mensaje "El pedido no puede ser cancelado porque ya está en preparación"
  And el pedido "103" debe mantenerse en la lista de pedidos activos
