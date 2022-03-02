import {readUsername, readPassword} from '../support/commands';

describe('My First Test', () => {
    it('Does not do much!', () => {
        expect(true).to.equal(true);
    });

    it.skip('Visits the Kitchen Sink', () => {
        cy.visit('https://example.cypress.io');

        cy.contains('type').click();

        cy
            .get('#email1')
            .type('fake@email.com')
            .should('have.value', 'fake@email.com');
    });

    it('should succeed login with correct password', () => {
        cy.visit('/');

        const username = readUsername();
        const password = readPassword();

        cy.get('#email-input').type(username);
        cy.get('#password-input').type(password, {log: false});

        cy.get('.button').click();
        cy.url().should('include', '/dashboard');
    });

    it('should fail login with wrong password', () => {
        cy.visit('/');

        const username = readUsername();
        cy.get('#email-input').type(username);
        cy.get('#password-input').type('xxx');

        cy.get('.button').click();
        cy.url().should('include', '/login');
    });

    it('should show my patients', () => {
        cy.login();
        cy.visit('/hipexaminations');
        cy.url().should('include', '/hipexaminations');

        cy
            .get('hip-examination-list .item')
            .should('have.length.at.least', 1);
    });
});
