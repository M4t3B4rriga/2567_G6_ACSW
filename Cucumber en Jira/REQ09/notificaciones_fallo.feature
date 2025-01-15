Scenario: Pedido sin notificación
  Given el pedido "107" está en estado "En preparación"
  When el sistema detecta que no hay cambios de estado
  Then no debe enviar notificaciones
