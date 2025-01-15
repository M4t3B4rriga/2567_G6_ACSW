Scenario: Inicio de sesión fallido
  Given el usuario tiene credenciales inválidas
  When ingresa "admin" y "1234"
  And hace clic en "Iniciar sesión"
  Then el sistema debe mostrar un mensaje de error "Credenciales incorrectas"
  And no debe permitir el acceso al sistema
