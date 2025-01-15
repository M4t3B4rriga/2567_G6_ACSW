Feature: Administración del menú
  Como administrador
  Quiero agregar, editar o eliminar platos del menú
  Para mantener actualizado el menú y garantizar la disponibilidad de los platos

  Scenario: Agregar un nuevo plato al menú
    Given el administrador está en la pantalla de gestión del menú
    When ingresa los datos del nuevo plato "MiniParrillada"
    And confirma la adición
    Then el sistema debe agregar "MiniParrillada" al menú disponible

  Scenario: Editar un plato existente en el menú
    Given el administrador selecciona "Plato A" en el menú
    When cambia el precio de "Plato A" a $10
    And confirma la modificación
    Then el sistema debe actualizar el precio de "Plato A" en el menú