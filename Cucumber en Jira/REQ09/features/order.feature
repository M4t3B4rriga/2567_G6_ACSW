Feature: Agregar nuevos platos al menú

  Como administrador
  Quiero agregar nuevos platos al menú
  Para mantener el menú actualizado y variado

  Scenario: Agregar un nuevo plato exitosamente
    Given el menú actual no contiene "Plato Nuevo"
    When el administrador agrega "Plato Nuevo" al menú
    Then el sistema debe mostrar "Plato Nuevo añadido al menú"

  Scenario: Error al intentar agregar un plato ya existente
    Given el menú actual contiene "Plato Existente"
    When el administrador intenta agregar "Plato Existente" al menú
    Then el sistema debe mostrar un mensaje de error "El plato ya existe en el menú"
