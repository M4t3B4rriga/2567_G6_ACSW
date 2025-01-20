Feature: Historial de cambios en el menú

  Como administrador
  Quiero guardar un historial de cambios en el menú
  Para mantener un registro de todas las modificaciones

  Scenario: Registrar un cambio en el menú exitosamente
    Given el historial de cambios está vacío
    When el administrador agrega "Plato A" al menú
    Then el sistema debe registrar "Plato A añadido al menú" en el historial

  Scenario: Error al intentar acceder al historial vacío
    Given el historial de cambios está vacío
    When el administrador consulta el historial
    Then el sistema debe mostrar "El historial está vacío"
