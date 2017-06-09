import stateSpliter from '../stateSpliter'

const { strictEqual: is } = assert

describe('stateSpliter', () => {
  it('handle value is 0', function () {
    const state = { number: 0 }
    const updater = () => { }

    const linkState = stateSpliter(state, updater)

    is(linkState('number').value, 0)
  })
})
