import mapValues from 'lodash/fp/mapValues'


const mapValuesWithKey = mapValues.convert({ cap: false })
const applyMiddlewares = mapValuesWithKey((middleware, name) => (
  props => (...args) => {
    const handler = props[name] || (() => {})
    return middleware(props)(handler)(...args)
  }
))

export default applyMiddlewares
