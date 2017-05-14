import mapValues from 'lodash/fp/mapValues'


const mapValuesWithKey = mapValues.convert({ cap: false })
const linkHandlersAfter = mapValuesWithKey((handler, name) => (
  props => (...args) => {
    if (props[name]) props[name](...args)
    handler(props)(...args) // memoize(handler)(props)?
  }
))


export default linkHandlersAfter
