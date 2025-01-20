Feature: Envío del pedido a la cocina

  Como mesero
  Quiero enviar el pedido a la pantalla de la cocina en tiempo real
  Para que el personal de cocina pueda prepararlo de inmediato

  Scenario: Enviar un pedido exitosamente
    Given el mesero confirma el pedido "Pedido 1"
    When el pedido es enviado a la cocina
    Then el sistema debe mostrar "Pedido 1 enviado a la cocina"

  Scenario: Error al intentar enviar un pedido vacío
    Given el mesero confirma un pedido vacío
    When intenta enviar el pedido a la cocina
    Then el sistema debe mostrar un mensaje de error "El pedido está vacío"
