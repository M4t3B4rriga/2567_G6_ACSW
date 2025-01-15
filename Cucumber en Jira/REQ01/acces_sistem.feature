Feature: Acceso seguro al sistema
  Como usuario (mesero, cocinero, cajero, administrador)
  Quiero iniciar sesión con credenciales únicas
  Para garantizar la seguridad y limitar el acceso según roles

  Scenario: Inicio de sesión exitoso
    Given el usuario tiene credenciales válidas
    When ingresa "admin" y "admin"
    And hace clic en "Iniciar sesión"
    Then el sistema debe permitir el acceso al panel de usuario
