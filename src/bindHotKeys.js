import React from 'react'
import PropTypes from 'prop-types'

import pick from 'lodash/fp/pick'
import mapValues from 'lodash/fp/mapValues'
import compose from 'lodash/fp/compose'

import { HotKeys } from 'react-hotkeys'

import setWrappedDisplayName from './setWrappedDisplayName'


const makeBuildHandlers = keyMap => compose(
  mapValues(handler => event => {
    event.stopPropagation()
    handler()
    return false
  }),
  compose(pick, Object.keys)(keyMap),
)

const { createElement: element } = React
const { func } = PropTypes
const enhancer = keyMap => BaseComponent => {
  const buildHandlers = makeBuildHandlers(keyMap)

  const BindHotKeys = props => (
    element(HotKeys, { keyMap, handlers: buildHandlers(props) },
      element(BaseComponent, props),
    )
  )

  BindHotKeys.propTypes = mapValues(() => func.isRequired)(keyMap)

  return BindHotKeys
}


export default setWrappedDisplayName(enhancer, 'bindHotKeys', true)

const forTesting = { makeBuildHandlers }
export { forTesting }
