Feature: Generación de reportes de pedidos
  Como administrador
  Quiero generar reportes diarios de los pedidos realizados
  Para analizar el desempeño del restaurante

  Scenario: Generar reporte de pedidos diarios
    Given hoy se realizaron 3 pedidos
    When el administrador solicita el reporte de pedidos del día
    Then el sistema debe generar un archivo con el resumen de los 3 pedidos
