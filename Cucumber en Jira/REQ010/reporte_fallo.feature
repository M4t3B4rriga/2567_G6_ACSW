Scenario: Intentar generar un reporte sin pedidos
  Given no se han realizado pedidos hoy
  When el administrador solicita el reporte de pedidos del día
  Then el sistema debe mostrar un mensaje "No hay pedidos para reportar"
  And no debe generar ningún archivo
