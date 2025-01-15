Feature: Visualización de pedidos pagados
  Como cajero
  Quiero ver una lista de pedidos pagados
  Para gestionar los cobros

  Scenario: Mostrar pedidos pagados
    Given hay pedidos con estado "Pagados"
    When el cajero accede a la lista de pagados
    Then el sistema debe mostrar todos los pedidos pagados
