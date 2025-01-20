Feature: Registro del estado de pago de los pedidos

  Como mesero
  Quiero registrar el estado de pago de cada pedido
  Para mantener un control claro de los pedidos cobrados y pendientes

  Scenario: Registrar un pedido como pagado exitosamente
    Given el pedido "Pedido 1" está en estado "Pendiente de pago"
    When el mesero marca el pedido como "Pagado"
    Then el sistema debe mostrar "Pedido 1: Pagado"

  Scenario: Error al intentar registrar un pedido como pagado que ya está pagado
    Given el pedido "Pedido 2" está en estado "Pagado"
    When el mesero intenta marcar el pedido como "Pagado" nuevamente
    Then el sistema debe mostrar un mensaje de error "El pedido ya está registrado como pagado"
