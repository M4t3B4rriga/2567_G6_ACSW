Feature: Registro de estado de pago
  Como cajero
  Quiero registrar el estado de pago de los pedidos
  Para mantener un control financiero

  Scenario: Marcar pedido como pagado
    Given el pedido "81" tiene estado "Pendiente de pago"
    When el cajero marca el pedido como "Pagado"
    Then el sistema debe actualizar el estado del pedido a "Pagado"
