import { forTesting } from '../bindHotKeys'

const { makeBuildHandlers } = forTesting

const { strictEqual: is } = assert

const { spy } = sinon

describe('bindHotKeys', function () {
  describe('makeBuildHandlers', function () {
    it('is a function', function () {
      is(typeof makeBuildHandlers, 'function')
    })
    it('input a keyMap by handler name', function () {
      const keyMap = {
        save: 'ctrl+s',
        handlerA: 'ctrl+enter',
      }
      const props = {
        save: spy(),
        handlerA: spy(),
      }

      const handlers = makeBuildHandlers(keyMap)(props)

      const createEvent = () => ({
        stopPropagation: spy(),
        // preventDefault: spy(),
      })

      const event = createEvent()
      const result = handlers.save(event)
      handlers.handlerA(createEvent())

      assert(props.save.calledOnce)
      assert(props.handlerA.calledOnce)
      assert(event.stopPropagation.calledOnce)
      is(result, false)
    })
  })
})
