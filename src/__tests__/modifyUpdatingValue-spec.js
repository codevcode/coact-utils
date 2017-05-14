import { test } from '../modifyUpdatingValue'

const { strictEqual: is, deepEqual: deep } = assert
const { spy } = sinon

const { makeHandlerCreator } = test

describe('modifyUpdatingValue', function () {
  function tester ({ init, upstreamProps, makeModifier, updater }) {
    let value = init
    const onChange = spy(input => {
      if (typeof input === 'function') {
        value = input(value)
      } else {
        value = input
      }
    })

    let modifier = null
    const spiedMakeModifier = props => {
      modifier = makeModifier(props)
      if (typeof modifier === 'function') modifier = spy(modifier)
      return modifier
    }

    const props = { ...upstreamProps, onChange }
    const revisedOnChange = makeHandlerCreator(spiedMakeModifier, 'onChange')(props)

    revisedOnChange(updater)

    return {
      changedValue: value,
      modifier,
      onChange,
    }
  }
  it('add a modifier returns new value before `onChange`', function () {
    const result = tester({
      makeModifier: () => v => v + 1,
      updater: 0,
    })

    const { modifier, onChange, changedValue } = result

    is(modifier.callCount, 1)
    is(onChange.callCount, 1)
    deep(modifier.getCall(0).args[0], 0)
    is(changedValue, 1)
  })
  it('passing updater', function () {
    const updater = spy(v => 2 * v)
    const result = tester({
      init: 1,
      makeModifier: () => v => v + 1,
      updater,
    })

    const { changedValue } = result

    is(updater.callCount, 1)
    deep(updater.getCall(0).args[0], 1)
    deep(changedValue, 3)
  })
  it('modifier from props', function () {
    const result = tester({
      upstreamProps: { parser: v => +v },
      makeModifier: ({ parser }) => parser,
      updater: '1',
    })

    const { changedValue } = result

    deep(changedValue, 1)
  })
  it('apply twice', function () {
    let value = null
    let onChange = spy(input => {
      if (typeof input === 'function') {
        value = input(value)
      } else {
        value = input
      }
    })

    const props = {
      onChange,
      parser: v => +v,
      doubler: v => 2 * v,
    }
    onChange = makeHandlerCreator(({ parser }) => parser, 'onChange')(props)
    onChange = makeHandlerCreator(({ doubler }) => doubler, 'onChange')({
      ...props, onChange })

    onChange('1')

    is(value, 2)
  })
  it('modifier can get old value', function () {
    const result = tester({
      init: 1,
      upstreamProps: { addOld: (value, old) => (value + old) },
      makeModifier: ({ addOld }) => addOld,
      updater: 2,
    })

    const { changedValue } = result

    deep(changedValue, 3)
  })
})
