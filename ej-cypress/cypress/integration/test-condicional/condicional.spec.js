describe('Condicional', () => {
  it('', () => {
    cy.visit('http://localhost:8080/')

    cy.get('#modoEdicion')
      .then(checkbox => {
        const estaMarcado = checkbox.prop('checked')

        if (estaMarcado) {
          checkbox.trigger('click')
        }
      })

    cy.get('#nombre')
      // .type('Ángel', {force: true})
      .type('Ángel')
      .should('have.value', 'Ángel')

  });
});