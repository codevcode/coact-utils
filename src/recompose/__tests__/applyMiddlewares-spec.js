import compose from 'recompose/compose'

import apply from '../applyMiddlewares'


const { strictEqual: is, deepEqual: deep } = assert
const { spy } = sinon

describe('applyMiddlewares', () => {
  it('is a function', () => {
    is(typeof apply, 'function')
  })
  it('can wrap handlers up in middlewares', () => {
    const save = spy()
    const props = { save }

    const creators = apply({
      save: (/* props */) => next => (...args) => next(...args),
    })

    const wrappedSave = creators.save(props)
    wrappedSave('data', 'options')

    is(save.callCount, 1)
    deep(save.getCall(0).args, ['data', 'options'])
  })
  it('passing args through next', () => {
    const handler = spy(value => 2 * value)
    const upstreamProps = { handler, value: 1 }

    const creators = apply({
      handler: props => next => value => next(props.value + value),
    })

    const wrappedHandler = creators.handler(upstreamProps)
    const result = wrappedHandler(2)

    is(handler.callCount, 1)
    deep(handler.getCall(0).args, [3])
    deep(result, 6)
  })
  it('compose middlewares', () => {
    const handler = spy(value => 2 * value)
    const upstreamProps = { handler, value: 1 }

    const add1 = props => next => value => next(props.value + value + 1)
    const add2 = props => next => value => next(props.value + value + 2)

    const add3 = props => compose(
      add1(props),
      add2(props),
    )

    const creators = apply({
      handler: add3,
    })

    const wrappedHandler = creators.handler(upstreamProps)
    const result = wrappedHandler(0)

    is(handler.callCount, 1)
    deep(handler.getCall(0).args, [5])
    deep(result, 10)
  })
})
