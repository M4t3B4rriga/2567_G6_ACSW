Feature: Edición de pedidos
  Como mesero
  Quiero editar un pedido antes de enviarlo a la cocina
  Para corregir errores o añadir más platos

  Scenario: Editar un pedido para añadir platos
    Given el pedido "101" contiene "Parrillada Kandela"
    When el mesero añade "MiniParrillada"
    And confirma los cambios
    Then el pedido "101" debe incluir "Parrillada Kandela" y "MiniParrillada"
