Feature: Modificar o cancelar pedidos

  Como mesero
  Quiero modificar o cancelar pedidos antes de ser preparados
  Para corregir errores o cambios solicitados por los clientes

  Scenario: Modificar un pedido exitosamente
    Given el pedido "Pedido 1" está en estado "Pendiente"
    When el mesero modifica el pedido añadiendo "Plato C"
    Then el sistema debe mostrar el pedido actualizado con "Plato C"

  Scenario: Error al intentar modificar un pedido ya preparado
    Given el pedido "Pedido 2" está en estado "Listo"
    When el mesero intenta modificar el pedido añadiendo "Plato C"
    Then el sistema debe mostrar un mensaje de error "No se puede modificar un pedido ya preparado"
