describe('Navegar por el DOM', () => {
  xit('listado de cosas tiene 3 elementos', () => {
    cy.visit('http://localhost:8080')

    cy.get('#listaCosas')
      .children()
      .should('have.length', 3)

    // cy.get('#listaCosas')
    //   .children()
    //   .then(listItems => {
    //     console.log(listItems)
    //   })
    // cy.get('#listaCosas')
    //   .children()
    //   .then(muestraDatos)
  });

  xit('el tercer elemento de listaItems es el Item 3', () => {
    cy.visit('http://localhost:8080')

    cy.get('#listaItems')
      .children()
      .last()
      .should('have.text', 'Item 3')
  })

  xit('la listaItems va desde el Item 1 al Item 3', () => {
    cy.visit('http://localhost:8080')

    cy.get('#listaItems')
      .children() // [li.li1, li.li2, li.li3]
      .each((li, pos) => {
        const numeroItem = pos + 1
        expect(li.text()).to.equal('Item ' + numeroItem)
      })
  })

  it('comprueba que la tabla existe', () => {
    cy.visit('https://www.w3schools.com/html/html_tables.asp')
    cy.get('#customers')
      .should('exist')
  })

  it('comprueba que la tabla tiene 7 filas', () => {
    cy.visit('https://www.w3schools.com/html/html_tables.asp')

    cy.get('#customers > tbody')
      .children()
      .should('have.length', 7)

    cy.get('#customers > tbody > tr')
      .should('have.length', 7)

    cy.get('#customers')
      .children() // tbody
      .children() // tr
      .should('have.length', 7)
  })

  it('comprueba que la última fila tiene el número de celdas correcto', () => {
    cy.visit('https://www.w3schools.com/html/html_tables.asp')

    cy.get('#customers > tbody > tr')
      .last()
      .children()
      .should('have.length', 3)
  })

  it('comprueba que después de la quinta fila, hay dos filas más', () => {
    cy.visit('https://www.w3schools.com/html/html_tables.asp')

    let numFilas = 0
    // cy.get('#customers tr')
    cy.get('#customers > tbody > tr')
      .each((tr, pos) => {
        if (pos > 4) {
          numFilas += 1
        }
      })
      .then(() => {
        expect(numFilas).to.eq(2)
      })
  })

  it('comprueba que todas las celdas tienen contenido', () => {
    cy.visit('https://www.w3schools.com/html/html_tables.asp')

    cy.get('#customers td') // [td1, td2, td3, ...]
      .each((td) => {
        expect(td.text()).not.be.empty;
      })
  })

  it('[retry-ability] encuentra el botón que aparece a los 3.5seg', () => {
    cy.visit('http://localhost:8080')
    cy.get('#btn-lazy-3500')
      .should('be.visible')
      .and('have.text', 'Soy un botón perezoso')
  })

  it('[retry-ability] no encuentra el botón que aparece a los 5.5seg', () => {
    cy.visit('http://localhost:8080')

    cy.get('#btn-lazy-5500')
      .should('not.exist')
  })

  it('[retry-ability] encuentra el botón que aparece a los 5.5seg (aumentando el timeout)', () => {
    cy.visit('http://localhost:8080')

    cy.get('#btn-lazy-5500', {
      timeout: 5800
    })
      .should('exist')
  })

});

// function muestraDatos(param1) {
//   console.log(param1)
// }

// muestraDatos(3)


// then(FUNCTION)
// then(function(param1, param2) {

// })
// then((param1, param2) => {

// })