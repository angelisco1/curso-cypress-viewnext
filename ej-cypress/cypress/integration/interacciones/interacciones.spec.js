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

  xit('Si pulsamos números y pulsamos el botón de "DEL", elimina el último número introducido', () => {
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

  xit('debería cambiar el color de fondo cuando se hace dobleclick', () => {
    cy.visit('http://localhost:8080')

    // cy.get('#caja-doble-click')
    //   .dblclick()

    // cy.get('#caja-doble-click')
    //   .should('have.css', 'background-color', 'rgb(255, 255, 0)')

    cy.get('#caja-doble-click')
      .dblclick()
      .should('have.css', 'background-color', 'rgb(255, 255, 0)')
  })

  xit('deberia de escribir hola mundo', () => {
    cy.visit('https://es.wikipedia.org/wiki/Wikipedia:Portada')

    cy.get('[name="search"]')
      .type('Hola mundo')

    cy.get('#searchform')
      .submit()

    cy.get('#firstHeading')
      .should('have.text', 'Hola mundo')

    // Devuelve el titulo de la pestaña del navegador
    cy.title()
      .should('eq', 'Hola mundo - Wikipedia, la enciclopedia libre')
      .and('contain', 'Hola mundo -')
  })

  xit('Añadir 3 tareas y deberían de mostrarse las 3 además de los botones de activas y completadas', () => {
    cy.visit('https://todomvc.com/examples/vue/')

    cy.get('.new-todo')
      .type('Tarea 1{enter}')
      .type('Tarea 2{enter}')
      .type('Tarea 3{enter}')

    // cy.get('.todo-list')
    //   .children()
    cy.get('.todo')
      .should('have.length', 3)
      .find('label')
      .each((label, pos) => {
        const numTarea = pos + 1
        expect(label.text()).to.eq('Tarea ' + numTarea)
      })

    cy.contains('a', 'Active')
      .should('exist')
    cy.get('a[href="#/completed"]')
      .should('exist')
  })

  xit('Añadir 3 tareas y marcar 1 como completada', () => {
    cy.visit('https://todomvc.com/examples/vue/')

    cy.get('.new-todo')
      .type('Tarea 1{enter}')
      .type('Tarea 2{enter}')
      .type('Tarea 3{enter}')

    cy.get('.toggle')
      .eq(1)
      // .click()
      .check()
      .parent()
      .parent()
      .should('have.class', 'completed')
      .find('label')
      .should('have.css', 'text-decoration-line', 'line-through')

    cy.get('.toggle')
      .eq(1)
      .uncheck()
      // .click()
      // .click()

  })

  xit('Añadir 3 tareas, completar todas y eliminar las completadas', () => {
    cy.visit('https://todomvc.com/examples/vue/')

    cy.get('.new-todo')
      .type('Tarea 1{enter}')
      .type('Tarea 2{enter}')
      .type('Tarea 3{enter}')

    cy.get('.toggle')
      // .check({ multiple: true })
      .each((check) => {
        check.trigger('click')
      })

    cy.get('.clear-completed')
      .click()

    cy.get('.todo')
      .should('not.exist')

    cy.get('.todo-list')
      .children()
      .should('have.length', 0)
  })

  xit('Añadir 3 tareas, completar 2, eliminar las completadas y comprobar que queda 1', () => {
    cy.visit('https://todomvc.com/examples/vue/')

    cy.get('.new-todo')
      .type('Tarea 1{enter}')
      .type('Tarea 2{enter}')
      .type('Tarea 3{enter}')

    cy.get('.toggle')
      // .check({ multiple: true })
      .each((check, pos) => {
        if (pos != 0) {
          check.trigger('click')
        }
      })

    cy.get('[type="checkbox"]:checked.toggle')
      .should('have.length', 2)

    cy.get('[type="checkbox"]:not(:checked).toggle')
      .should('have.length', 1)

    cy.get('.clear-completed')
      .click()

    cy.get('.todo')
      .should('have.length', 1)
  })

  xit('selecciona la opción de tesla', () => {
    cy.visit('http://localhost:8080')

    cy.get('#select-coches-electricos')
      .select('tesla-model-3')
      .should('have.value', 'tesla-model-3')

    cy.get('option:selected')
      .should('have.text', 'Tesla Model 3')
  })

  xit('selecciona la opción de xpeng', () => {
    cy.visit('http://localhost:8080')

    cy.get('#select-coches-electricos')
      .select('Xpeng P7')
      .should('have.value', 'xpeng-p7')

    cy.get('option:selected')
      .should('have.text', 'Xpeng P7')
  })

  xit('selecciona las opciones de xpeng y nio', () => {
    cy.visit('http://localhost:8080')

    cy.get('#select-coches-electricos-multiple')
      .select(['xpeng-p7', 'nio-et7'])
      // .should('have.value', "\'[ 'nio-et7', 'xpeng-p7' ]\'")

    cy.get('#select-coches-electricos-multiple > option:selected')
      .each((option) => {
        expect(['Nio eT7', 'Xpeng P7']).contain(option.text())
      })
  })

  xit('drag and drop', () => {
    cy.visit('http://cookbook.seleniumacademy.com/DragDropDemo.html')

    // PARA SACAR LAS COORDENADAS USAR EN EL NAVEGADOR EL SIGUIENTE SCRIPT
    // document.addEventListener('mousemove', (e) => {
    //   console.log(e.clientX, e.clientY)
    // })

    cy.get('#draggable')
      .trigger('mousedown', { which: 1 })
      .trigger('mousemove', { pageX: 185, pageY: 70 })
      .trigger('mouseup')
  })

  xit('creamos cookie y comprobamos que se ha creado', () => {
    cy.visit('http://localhost:8080')

    cy.setCookie('mi-cookie', '1234')
    cy.setCookie('mi-segunda-cookie', '5678')

    cy.getCookie('mi-cookie')
      .should('have.a.property', 'value', '1234')

    cy.clearCookie('mi-cookie')

    cy.getCookies()
      .should('have.length', 1)

    cy.getCookies()
      .then((cookies) => {
        const cookie = cookies[0]
        expect(cookie.value).to.be.eq('5678')
      })
  })

  xit('el mensaje del alert es Hola mundo!!!', () => {
    cy.visit('http://localhost:8080')

    cy.get('#btn-alert')
      .click()

    cy.on('window:alert', (texto) => {
      expect(texto).to.be.eq('Hola mundo!!!')
    })
  })

  xit('debería eleminirse el mensaje si aceptamos el popup', () => {
    cy.visit('http://localhost:8080')

    cy.get('#btn-confirm')
      .click()

    cy.on('window:confirm', () => {
      return true // Engañamos al navegador y cambiamos la funcionalidad del confirm por esta función que devuelve un true (equivale a pulsar el botón de Aceptar)
    })

    cy.get('#confirm-nombre')
      .should('be.empty')
  })

  xit('debería mostrarse nuestro nombre cuando lo escribimos en el popup prompt', () => {
    cy.window()
      .then((win) => {
        cy.stub(win, 'prompt').returns('Ángel')
      })

    cy.get('#btn-prompt')
      .click()

    cy.get('#prompt-nombre')
      .should('have.text', 'Ángel')

    cy.screenshot('aplicacion')

    cy.get('#caja-nombre')
      .screenshot('informacion-nombre', {
        blackout: ['#prompt-nombre', '#mensaje-prompt']
      })
  })

  it('si te logueas con los datos correctos vas al inicio', () => {
    cy.visit('http://localhost:8080/login')

    cy.fixture('login.json')
      .then(datos => {
        const usuario1 = datos.usuario1

        cy.get('[name="email"]')
          .type(usuario1.email)

        cy.get('[name="password"]')
          .type(usuario1.pass)

        cy.get('[type="submit"]')
          .click()

        cy.get('h1')
          .should('have.text', 'Bienvenido a la página')
      })
  })

  it('si te logueas con los datos incorrectos vas al login', () => {
    cy.visit('http://localhost:8080/login')

    cy.fixture('login.json')
      .then(datos => {

        const usuario2 = datos.usuario2

        cy.get('[name="email"]')
          .type(usuario2.email)

        cy.get('[name="password"]')
          .type(usuario2.pass)

        cy.get('[type="submit"]')
          .click()

        cy.location('pathname')
          .should('equal', '/login')

      })


  })

});