import mapValues from 'lodash/fp/mapValues'


const mapValuesWithKey = mapValues.convert({ cap: false })
const queueHandlersAfter = mapValuesWithKey((handler, name) => (
  props => async (...args) => {
    if (props[name]) {
      return handler(props)(await props[name](...args))
    }
    return handler(props)(...args) // memoize(handler)(props)?
  }
))


export default queueHandlersAfter
