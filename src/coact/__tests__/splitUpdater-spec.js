import splitUpdater from '../splitUpdater'

const { strictEqual: is, deepEqual: deep } = assert

describe('splitUpdater', function () {
  it('is a function', function () {
    is(typeof splitUpdater, 'function')
  })
  it('return a child updater function', function () {
    let value = { a: 'a', b: 'b' }
    const updateValue = updater => (value = updater(value))

    const updateA = splitUpdater(updateValue)('a')
    const updateB = splitUpdater(updateValue)('b')

    is(typeof updateA, 'function')

    updateA(1)
    deep(value, { a: 1, b: 'b' })

    updateB(2)
    deep(value, { a: 1, b: 2 })
  })
  describe('update', function () {
    it('nested obj', function () {
      let value = { a: { b: 'b', c: 'c' }, d: 'd' }
      const updateValue = updater => (value = updater(value))

      const updateA = splitUpdater(updateValue)('a')
      const updateB = splitUpdater(updateA)('b')
      const updateC = splitUpdater(updateA)('c')
      const updateD = splitUpdater(updateValue)('d')

      updateB(2)
      deep(value, { a: { b: 2, c: 'c' }, d: 'd' })

      updateC(3)
      deep(value, { a: { b: 2, c: 3 }, d: 'd' })

      updateD(4)
      deep(value, { a: { b: 2, c: 3 }, d: 4 })

      updateA(1)
      deep(value, { a: 1, d: 4 })
    })
    it('nested array', function () {
      let value = { a: { b: 'b', c: ['c', 'd'] }, e: 'e' }
      const updateValue = updater => (value = updater(value))

      const updateA = splitUpdater(updateValue)('a')
      const updateC = splitUpdater(updateA)('c')
      const updateC0 = splitUpdater(updateC)(0)

      updateC0(3)
      deep(value, { a: { b: 'b', c: [3, 'd'] }, e: 'e' })
      is(Array.isArray(value.a.c), true)
    })
    it('nested obj twice', function () {
      let value = { a: { b: 'b', c: ['c', 'd'] }, e: 'e' }
      const updateValue = updater => (value = updater(value))

      const updateA = splitUpdater(updateValue)('a')
      const updateC = splitUpdater(updateA)('c')
      const updateC1 = splitUpdater(updateC)(1)

      const updateB = splitUpdater(updateA)('b')

      updateC1(4)
      updateB(2)

      deep(value, { a: { b: 2, c: ['c', 4] }, e: 'e' })
    })
  })
  describe('update unexisted key', function () {
    it('', function () {
      let value = { a: { b: 'b' } }
      const updateValue = updater => (value = updater(value))

      const updateC = splitUpdater(updateValue)('c')

      updateC(3)

      deep(value, { a: { b: 'b' }, c: 3 })
    })
    it('value is undefined', function () {
      let value = undefined
      const updateValue = updater => (value = updater(value))

      const updateC = splitUpdater(updateValue)('c')
      const updateD = splitUpdater(updateC)('d')
      const update0 = splitUpdater(updateC)(0)

      updateD(4)
      update0(5)

      deep(value, { c: { d: 4, 0: 5 } })
    })
    it('value is null', function () {
      let value = null
      const updateValue = updater => (value = updater(value))

      const updateC = splitUpdater(updateValue)('c')

      updateC(4)
      deep(value, { c: 4 })
    })
    it('value should be array', function () {
      let value = undefined
      const updateValue = updater => (value = updater(value))

      const update0 = splitUpdater(updateValue)(0, [])
      const update1 = splitUpdater(updateValue)(1, [])

      update0(0)
      update1(1)

      deep(value, [0, 1])
    })
  })
  describe('update value as undefined', function () {
    it('in a object', function () {
      let value = { a: { b: 'b' } }
      const updateValue = updater => (value = updater(value))

      const updateA = splitUpdater(updateValue)('a')
      const updateB = splitUpdater(updateA)('b')

      updateB()

      deep(value, { a: { b: undefined } })
    })
    it('in an array', function () {
      let value = { a: ['b', 'c'] }
      const updateValue = updater => (value = updater(value))

      const updateA = splitUpdater(updateValue)('a')
      const update0 = splitUpdater(updateA)(0)

      update0()

      deep(value, { a: [undefined, 'c'] })
    })
  })
  describe('memoize', function () {
    it('the same updater and key return same partial updater', function () {
      let value = { a: { b: 'b', c: 'c' }, d: 'd' }
      const updateValue = updater => (value = updater(value))

      const a1 = splitUpdater(updateValue)('a')
      const a2 = splitUpdater(updateValue)('a')

      is(a1, a2)
    })
    it('nested', function () {
      let value = { a: { b: 'b', c: 'c' }, d: 'd' }
      const updateValue = updater => (value = updater(value))

      const updateA = splitUpdater(updateValue)('a')
      const b1 = splitUpdater(updateA)('b')
      const b2 = splitUpdater(updateA)('b')

      is(b1, b2)
    })
  })
})
