Feature: Creación de pedidos
  Como mesero
  Quiero crear y gestionar pedidos seleccionando platos y bebidas del menú digital
  Para reducir errores y enviar las órdenes a la cocina en tiempo real

  Scenario: Crear un pedido exitosamente
    Given el mesero está en la pantalla del menú digital
    When selecciona "Plato A" y "Bebida B"
    And confirma el pedido
    Then el sistema debe mostrar el pedido con "Plato A" y "Bebida B" en la lista de pedidos activos
    And enviar el pedido a la pantalla de la cocina

  Scenario: Error al crear un pedido sin seleccionar platos
    Given el mesero está en la pantalla del menú digital
    When intenta confirmar el pedido sin seleccionar platos ni bebidas
    Then el sistema debe mostrar un mensaje de error "Debe seleccionar al menos un plato o bebida"