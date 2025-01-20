Feature: Mostrar el estado de los platos

  Como mesero
  Quiero ver el estado de cada plato
  Para saber cuál está listo y cuál sigue en preparación

  Scenario: Ver el estado de los platos exitosamente
    Given el plato "Plato A" está en estado "En preparación"
    When el mesero consulta el estado de "Plato A"
    Then el sistema debe mostrar "Plato A: En preparación"

  Scenario: Error al consultar un plato inexistente
    Given no está registrado el plato "Plato X"
    When el mesero consulta el estado de "Plato X"
    Then el sistema debe mostrar un mensaje de error "El plato no existe"
