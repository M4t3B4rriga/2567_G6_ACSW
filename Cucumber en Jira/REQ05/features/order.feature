Feature: Notificación de pedidos listos

  Como mesero
  Quiero recibir notificaciones cuando un pedido esté listo
  Para poder servirlo a los clientes rápidamente

  Scenario: Notificar un pedido listo exitosamente
    Given el pedido "Pedido 1" está en estado "En preparación"
    When el estado de "Pedido 1" cambia a "Listo"
    Then el sistema debe notificar al mesero con el mensaje "El pedido Pedido 1 está listo"

  Scenario: Error al intentar notificar un pedido no existente
    Given no existe el pedido "Pedido 99"
    When el mesero intenta cambiar el estado de "Pedido 99" a "Listo"
    Then el sistema debe mostrar un mensaje de error "El pedido no existe"
