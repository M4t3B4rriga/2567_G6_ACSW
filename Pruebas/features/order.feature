Feature: Gestión de pedidos en el restaurante parriladas Kandela

Scenario: Asignacion de mesa al cliente
    Given el mesero le asigan una mesa al cliente

Scenario: Cliente Realiza el pedido 
    Given un cliente revisa el menú
    When selecciona "parrillada mmixta" y "Bebida gaseosa"
    Then realiza registro de sus datos para el pedido
    And Envia el pedido al cocinero
    And el estado del pedido de ser "Por hacer"

Scenario: Cocina completa un pedido
    Given un pedido esta "Por hacer"
    When para a realizarse "En proceso"
    When la cocina marca el pedido como "Listo"
    Then el estado del pedido debe cambiar "Listo para servir"
    
Scenario: Entrega del pedido 
    Given un pedido esta en "Listo para servir"
    And la mesera debe verificar que todo el pedido este completo
    Then la mesera debe pasar el pedido al cliente
Scenario: Pago de cuenta 

