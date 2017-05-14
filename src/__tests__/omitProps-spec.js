import { test } from '../omitProps'

const { omit } = test

const { strictEqual: is, deepEqual: deep } = assert

describe('omitProps', function () {
  it('receive keys and return a function', function () {
    is(typeof omit('key'), 'function')
  })
  it('omit key', function () {
    const obj = { key: 'key', name: 'name' }
    deep(omit('key')(obj), { name: 'name' })
  })
  it('omit keys', function () {
    const obj = { key: 'key', name: 'name', other: 'other' }
    const omitObj = { key: 'PropTypes.string', other: 'PropTypes.object' }

    deep(omit(Object.keys(omitObj))(obj), { name: 'name' })
  })
})
