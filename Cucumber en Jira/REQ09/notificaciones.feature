Feature: Notificaciones automáticas
  Como mesero
  Quiero recibir notificaciones automáticas de pedidos listos
  Para atender rápidamente a los clientes

  Scenario: Notificación de pedido listo
    Given el pedido "106" está en estado "Listo"
    When el sistema detecta que el estado cambió a "Listo"
    Then debe enviar una notificación al mesero con el mensaje "Pedido 106 está listo para entregar"
