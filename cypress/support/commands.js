// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// -- This is a parent command --
Cypress.Commands.add('login', () => {
    const username = readUsername();
    const password = readPassword();
    cy.request({
        method: 'POST',
        url: '/auth/token',
        body: {
            email: username,
            password: password,
        }
    }).then((resp) => {
        window.localStorage.setItem('token', resp.body.token);
    });
});

// see https://glebbahmutov.com/blog/keep-passwords-secret-in-e2e-tests/

export function readUsername() {
    const username = Cypress.env('username');
    expect(username, 'username was set').to.be.a('string').and.not.be.empty;
    return username;
}

export function readPassword() {
    const password = Cypress.env('password');
    if (typeof password !== 'string' || !password) {
        throw new Error('Missing password value, set using CYPRESS_password=...')
    }
    return password;
}

//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
