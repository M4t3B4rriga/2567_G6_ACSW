Feature: Cancelación de pedidos
  Como mesero
  Quiero cancelar un pedido en caso de errores o cambios de última hora
  Para evitar enviar pedidos incorrectos a la cocina

  Scenario: Cancelar un pedido antes de enviarlo
    Given el pedido "102" está en estado "Pendiente"
    When el mesero cancela el pedido
    Then el pedido "102" debe ser eliminado de la lista de pedidos activos
