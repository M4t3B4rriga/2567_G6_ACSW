Scenario: Intentar ver pedidos pagados cuando no hay ninguno
  Given no hay pedidos con estado "Pagados"
  When el cajero accede a la lista de pagados
  Then el sistema debe mostrar un mensaje "No hay pedidos pagados disponibles"
