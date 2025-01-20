Feature: Mostrar pedidos por cobrar

  Como mesero
  Quiero ver una lista de pedidos por cobrar
  Para identificar rápidamente los pedidos pendientes de pago

  Scenario: Ver pedidos por cobrar exitosamente
    Given existen los pedidos "Pedido 1" y "Pedido 2" con estado "Por cobrar"
    When el mesero solicita la lista de pedidos por cobrar
    Then el sistema debe mostrar "Pedido 1, Pedido 2"

  Scenario: Error al solicitar una lista vacía de pedidos por cobrar
    Given no hay pedidos con estado "Por cobrar"
    When el mesero solicita la lista de pedidos por cobrar
    Then el sistema debe mostrar un mensaje de error "No hay pedidos por cobrar"
