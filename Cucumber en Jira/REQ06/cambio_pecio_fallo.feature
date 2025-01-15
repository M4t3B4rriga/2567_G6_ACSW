Scenario: Intentar establecer precios con valores inválidos
  Given el sistema no tiene precios configurados para las tarrinas
  When el administrador intenta establecer los precios:
      | Tamaño  | Precio  |
      | Pequeña | -2.50   |
      | Mediana | abc     |
    Then el sistema debe mostrar un mensaje de error "Los precios deben ser valores numéricos positivos"
    And no debe guardar ningún precio
