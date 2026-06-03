Feature: login page validation

@smoke
  Scenario: login with valid username and password
    Given provide valid url
    When provide valid username and password
    Then click on login button
    And verify admin login success

  # Scenario: login with valid username and password with Params
  #   Given provide valid url
  #   When provide valid email as "selvaranjanregana@gmail.com" and password as "NJ$e$9$irvZ@"
  #   Then click on login button
