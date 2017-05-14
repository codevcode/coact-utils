import mapProps from 'recompose/mapProps'
import omit from 'lodash/fp/omit'

import setWrappedDisplayName from './setWrappedDisplayName'


const enhancer = keys => mapProps(omit(keys))


export default setWrappedDisplayName(enhancer, 'omitProps', true)

const test = { omit }
export { test }

