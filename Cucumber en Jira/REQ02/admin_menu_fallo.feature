
Scenario: Agregar un plato con datos incompletos
  Given el administrador está en la pantalla de gestión del menú
  When ingresa un nuevo plato sin precio
  And confirma la adición
  Then el sistema debe mostrar un mensaje de error "Datos incompletos"
  And no debe agregar el plato al menú
