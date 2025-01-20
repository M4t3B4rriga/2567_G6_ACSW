Feature: Desactivar platos del menú

  Como administrador
  Quiero desactivar platos existentes
  Para ocultarlos temporalmente sin eliminarlos del menú

  Scenario: Desactivar un plato exitosamente
    Given el menú contiene "Plato A"
    When el administrador desactiva "Plato A"
    Then el sistema debe mostrar "Plato A desactivado"

  Scenario: Error al intentar desactivar un plato ya desactivado
    Given el plato "Plato B" ya está desactivado
    When el administrador intenta desactivar "Plato B" nuevamente
    Then el sistema debe mostrar un mensaje de error "El plato ya está desactivado"
