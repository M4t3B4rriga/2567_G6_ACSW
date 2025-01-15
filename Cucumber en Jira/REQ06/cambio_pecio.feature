Feature: Configuración de precios para tarrinas
  Como administrador
  Quiero configurar los precios de las tarrinas
  Para gestionar adecuadamente los costos según su tamaño

  Scenario: Establecer precios para tamaños de tarrina
    Given el sistema no tiene precios configurados para las tarrinas
    When el administrador establece los precios:
      | Tamaño  | Precio |
      | Pequeña | 2.50   |
      | Mediana | 4.00   |
      | Grande  | 6.00   |
    Then el sistema debe guardar los precios correctamente
    And el sistema debe mostrar un mensaje "Precios configurados exitosamente"
