Feature: Creación de pedidos
  Como mesero
  Quiero crear y gestionar pedidos seleccionando platos y bebidas del menú digital
  Para reducir errores y enviar las órdenes a la cocina en tiempo real

  Scenario: Crear un pedido exitosamente
    Given el mesero está en la pantalla del menú digital
    When selecciona "Parrillada Kandela"
    And confirma el pedido
    Then el sistema debe mostrar el pedido con "Parrillada Kandela" en la lista de pedidos activos
    And enviar el pedido a la pantalla de la cocina
