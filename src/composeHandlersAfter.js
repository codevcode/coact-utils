import mapValues from 'lodash/fp/mapValues'


const mapValuesWithKey = mapValues.convert({ cap: false })
const composeHandlersAfter = mapValuesWithKey((handler, name) => (
  props => (...args) => {
    if (props[name]) {
      return handler(props)(props[name](...args))
    }
    return handler(props)(...args) // memoize(handler)(props)?
  }
))


export default composeHandlersAfter
