import mapValues from 'lodash/fp/mapValues'


const mapValuesWithKey = mapValues.convert({ cap: false })
const linkHandlersBefore = mapValuesWithKey((handler, name) => (
  props => (...args) => {
    handler(props)(...args) // memoize(handler)(props)?
    if (props[name]) props[name](...args)
  }
))


export default linkHandlersBefore
