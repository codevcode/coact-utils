import compose from 'recompose/compose'
import getContext from 'recompose/getContext'

import omitProps from './omitProps'

import setWrappedDisplayName from './setWrappedDisplayName'


function injectContext (contextTypes, ...enhancers) {
  return compose(
    getContext(contextTypes),
    ...enhancers,
    omitProps(Object.keys(contextTypes)),
  )
}


export default setWrappedDisplayName(injectContext, 'injectContext', true)
