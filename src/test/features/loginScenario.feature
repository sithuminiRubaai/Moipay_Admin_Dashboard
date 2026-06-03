Feature: verify login with scenario outlines

  Scenario Outline: verify login success message
    Given provide valid urls
    When enter email as "<email>"
    And enter password as "<password>"
    Then click on the login button
    Then verify login success message as "<message>"

    Examples:
      | email                       | password     | message                                         |
      | gkk28904@gmail.com          | JK@1234a     |                                                 |

