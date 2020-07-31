import * as helpers from './helpers'

Cypress.Commands.add('login', (options = {}) => {
  const loginUser = {
    username: 'admin',
    password: 'pass',
  }
  cy.visit('/login')

  cy.get('main form').within($form => {
    cy.get('#login-username-input')
      .type(loginUser.username)
    cy.get('#login-password-input')
      .type(loginUser.password)
    cy.root()
      .submit()
  })

  // cy.visit('/not-found-page-to-login')
  //   .window()
  //   .then(win => {
  //     win.localStorage.setItem(
  //       Cypress.env('TOKEN_KEY'),
  //       helpers.makeLoginToken(),
  //     )
  //   })
})
