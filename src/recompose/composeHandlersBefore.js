import mapValues from 'lodash/fp/mapValues'


const mapValuesWithKey = mapValues.convert({ cap: false })
const composeHandlersBefore = mapValuesWithKey((handler, name) => (
  props => (...args) => {
    if (props[name]) {
      return props[name](handler(props)(...args))
    }
    return handler(props)(...args) // memoize(handler)(props)?
  }
))


export default composeHandlersBefore
