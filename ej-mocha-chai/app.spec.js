const assert = require('assert')
const should = require('chai').should()
const { hola } = require("./app")


describe('La función hola ', () => {
  it('devuelve mundo si no le pasamos un nombre', () => {
    const msg = hola()
    assert.ok('Hola mundo' === msg)
    // assert.ok('Hola mundo'.length === 10)
    // expect('Hola mundo').to.have.lengthOf(10)
  })

  it('devuelve hola seguido del nombre si le pasamos un nombre', () => {
    const msg = hola('Falco')
    assert.ok('Hola Falco' === msg)
    msg.should.be.equal('Hola Falco')
  })
})