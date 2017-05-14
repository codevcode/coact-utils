import mapValues from 'lodash/fp/mapValues'


const mapValuesWithKey = mapValues.convert({ cap: false })
const queueHandlersBefore = mapValuesWithKey((handler, name) => (
  props => async (...args) => {
    if (props[name]) {
      return props[name](await handler(props)(...args))
    }
    return handler(props)(...args) // memoize(handler)(props)?
  }
))


export default queueHandlersBefore
