describe('Ejemplo', () => {
  it('1', () => {
    cy.visit('https://nodejs.org/en/')
    // <a id="logo" />
    cy.get('#logo')
      .should('have.attr', 'id', 'logo')

    // cy.get('#caja2').find('.btn')
    // cy.get('#caja2 > .btn')
    cy.contains('a', 'Docs')
      .should('exist')
  });
});