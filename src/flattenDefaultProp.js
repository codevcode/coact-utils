import mapProps from 'recompose/mapProps'

import setWrappedDisplayName from './setWrappedDisplayName'


const enhancer = propName => mapProps(props => ({
  ...(props[propName] || {}),
  ...props,
}))


export default setWrappedDisplayName(enhancer, 'flattenDefaultProp', true)
