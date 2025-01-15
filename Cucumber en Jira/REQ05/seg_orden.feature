Feature: Seguimiento de órdenes
  Como cocinero
  Quiero cambiar el estado de los pedidos
  Para informar a los meseros sobre el estado actualizado de cada plato

  Scenario: Cambiar estado de un pedido a "En preparación"
    Given el pedido "81" está en estado "Pendiente"
    When el cocinero marca el pedido como "En preparación"
    Then el estado del pedido debe cambiar a "En preparación"

  Scenario: Cambiar estado de un pedido a "Listo"
    Given el pedido "81" está en estado "En preparación"
    When el cocinero marca el pedido como "Listo"
    Then el estado del pedido debe cambiar a "Listo"
    And el sistema debe enviar una notificación al mesero con el mensaje "Pedido listo para entregar"
