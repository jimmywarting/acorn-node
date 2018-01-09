var test = require('tape')
var acorn = require('../')
var baseAcorn = require('acorn')

test('parses object spread syntax', function (t) {
  var ast = acorn.parse('var a = { ...b }')
  t.equal(ast.body[0].declarations[0].init.type, 'ObjectExpression')
  t.equal(ast.body[0].declarations[0].init.properties[0].type, 'SpreadElement')

  ast = acorn.parse('function a ({ ...b }) {}')
  t.equal(ast.body[0].params[0].type, 'ObjectPattern')
  t.equal(ast.body[0].params[0].properties[0].type, 'RestElement')

  t.end()
})

test('does not change main acorn module', function (t) {
  t.throws(function () {
    baseAcorn.parse('var a = { ...b }')
  })
  t.end()
})
