import mapValues from 'lodash/fp/mapValues'


const mapValuesWithKey = mapValues.convert({ cap: false })
const waitHandlersBefore = mapValuesWithKey((handler, name) => (
  props => async (...args) => {
    if (props[name]) {
      await handler(props)(...args)
      return props[name](...args)
    }
    return handler(props)(...args) // memoize(handler)(props)?
  }
))


export default waitHandlersBefore
