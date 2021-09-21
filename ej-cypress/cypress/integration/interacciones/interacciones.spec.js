describe('Interacciones', () => {
  xit('click', () => {
    cy.visit('https://www.w3schools.com/html/html_tables.asp')

    cy.get('#accept-choices')
      .click()
  });

  xit('Si introducimos el código correcto (6710) nos muestra en el display el mensaje "CODE OK"', () => {
    cy.visit('http://localhost:8080')

    cy.get('#p6').click()
    cy.get('#p7').click()
    cy.get('#p1').click()
    cy.get('#p0').click()

    cy.get('#pantalla-codigo')
      .should('have.text', 'CODE OK')
  })

  xit('Si pulsamos números y pulsamos el botón de "CLD" los borra', () => {
    cy.visit('http://localhost:8080')

    cy.get('#p6').click()
    cy.get('#p7').click()
    cy.get('#p1').click()

    cy.get('#pclear').click()

    cy.get('#pantalla-codigo')
      .should('be.empty')
      // .should('have.text', '')
      // .should('not.have.text')

    cy.get('#pantalla-codigo')
      .invoke('text')
      .should('have.length', 0)
  })

  xit('Si pulsamos números (opción múltiple) y pulsamos el botón de "CLD" los borra', () => {
    cy.visit('http://localhost:8080')

    cy.get('#p6, #p7, #p1')
      .click({
        multiple: true
      })

    cy.get('#pclear').click()

    cy.get('#pantalla-codigo')
      .should('be.empty')
  })

  xit('Si pulsamos números y pulsamos el botón de "DEL", elimina el último número introducido', () => {
    cy.visit('http://localhost:8080')

    cy.get('#p6, #p7, #p1')
    .click({
      multiple: true
    })

    cy.get('#pdel')
      .click()

    cy.get('#pantalla-codigo')
      .invoke('text')
      .should('have.length', 2)
  })

  xit('Si pulsamos números y pulsamos el botón de "DEL", elimina el último número introducido', () => {
    cy.visit('http://localhost:8080')

    cy.get('#p6').click()
    cy.get('#p7').click()
    // cy.get('#p1').click()
    cy.get('#p1').click()

    cy.get('#pdel')
      .click()

    cy.get('#pantalla-codigo')
      .invoke('text')
      // .then(txt => {
      //   expect(txt[txt.length-1]).to.eq("1")
      // })
      .should('have.length', 2)
      .and('not.include', 1)
      .and('include', 6)
      .and('include', 7)
  })

  it('Si pulsamos números y pulsamos el botón de "DEL", elimina el último número introducido', () => {
    cy.visit('http://localhost:8080')

    const numTeclas = [6, 1, 1]

    numTeclas.forEach((num) => {
      cy.get('#p' + num).click()
    })

    // cy.get('#p6').click()
    // // cy.get('#p7').click()
    // cy.get('#p1').click()
    // cy.get('#p1').click()

    cy.get('#pdel')
      .click()

    cy.get('#pantalla-codigo')
      .then(div => {
        const textoDiv = div.text()
        expect(textoDiv).have.lengthOf(2)

        numTeclas.splice(numTeclas.length-1, 1)
        numTeclas.forEach((num) => {
          expect(textoDiv).contain(num)
        })

        // console.log({textoDiv})
        // expect(textoDiv[textoDiv.length-1]).to.eq("1")
      })
  })

  xit('No deja introducir un código de más de 4 números', () => {
    cy.visit('http://localhost:8080')

    cy.get('#p0, #p3, #p9, #p7')
      .click({
        multiple: true
      })

    cy.get('#p2')
      .click()

    cy.get('#pantalla-codigo')
      .invoke('text')
      .should('have.length', 4)
      .and('not.include', '2')
  })
});