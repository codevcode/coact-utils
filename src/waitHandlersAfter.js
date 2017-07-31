import mapValues from 'lodash/fp/mapValues'


const mapValuesWithKey = mapValues.convert({ cap: false })
const waitHandlersAfter = mapValuesWithKey((handler, name) => (
  props => async (...args) => {
    if (props[name]) {
      await props[name](...args)
      return handler(props)(...args)
    }
    return handler(props)(...args) // memoize(handler)(props)?
  }
))


export default waitHandlersAfter
