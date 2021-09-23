describe('Peticiones http y mocks', () => {

  xit('debería pintar el emoji nevado si nieva', () => {

    cy.intercept('/get-weather', { weather: 'nevado' })

    cy.visit('http://localhost:8080')

    cy.get('#tiempo')
      .should('have.text', '🌨')

  });

  xit('debería pintar el emoji del sol si el tiempo es soleado', () => {

    cy.intercept('/get-weather', { weather: 'soleado' })

    cy.visit('http://localhost:8080')

    cy.get('#tiempo')
      .should('have.text', '☀️')

  });

  xit('el usuario 1 debería de llamarse Leanne Graham', () => {
    cy.visit('http://localhost:8080')

    cy.request('http://jsonplaceholder.typicode.com/users/1')
      .then(resp => {
        console.log(resp)
        expect(resp.body.name).to.be.eq('Leanne Graham')
      })

  })

  xit('el usuario 2 debería de llamarse Ervin Howell', () => {
    cy.visit('http://localhost:8080')

    cy.request('http://jsonplaceholder.typicode.com/users')
      .then(resp => {
        console.log(resp)
        const todosLosUsuarios = resp.body

        const usuario2 = todosLosUsuarios.find((usuario) => {
          return usuario.id === 2
        })

        // const usuario2 = todosLosUsuarios[1]

        expect(usuario2.name).to.be.eq('Ervin Howell')
      })

  })



  xit('si te logueas con los datos correctos vas al inicio', () => {
    cy.visit('http://localhost:8080/login')

    cy.fixture('login.json')
      .then(datos => {
        const usuario1 = datos.usuario1

        // cy.get('[name="email"]')
        //   .type(usuario1.email)
        // cy.rellenarCampo('email', usuario1.email)

        // cy.get('[name="password"]')
        //   .type(usuario1.pass)
        // cy.rellenarCampo('password', usuario1.pass)


        // cy.get('[type="submit"]')
        //   .click()
        // cy.submitBtn()

        cy.login(usuario1.email, usuario1.pass)

        cy.get('h1')
          .should('have.text', 'Bienvenido a la página')
      })
  })

  it('si te logueas con los datos correctos vas al inicio', () => {
    cy.visit('http://localhost:8080/login')

    /* ==== Generated with Cypress Studio ==== */
    cy.get('#email').clear();
    cy.get('#email').type('cfalco@gmail.com');
    cy.get('#password').clear();
    cy.get('#password').type('cfalco');
    cy.get('.center').click();
    cy.get('button').click();
    /* ==== End Cypress Studio ==== */
  })

});