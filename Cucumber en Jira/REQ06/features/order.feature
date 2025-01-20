Feature: Cambiar el estado de los platos

  Como mesero
  Quiero cambiar el estado de los platos individualmente
  Para reflejar su progreso en la preparación

  Scenario: Cambiar el estado de un plato exitosamente
    Given el plato "Plato A" está en estado "En preparación"
    When el mesero cambia el estado de "Plato A" a "Listo"
    Then el sistema debe mostrar "Plato A: Listo"

  Scenario: Error al cambiar el estado de un plato inexistente
    Given el plato "Plato X" no está registrado
    When el mesero intenta cambiar el estado de "Plato X" a "Listo"
    Then el sistema debe mostrar un mensaje de error "El plato no existe"
