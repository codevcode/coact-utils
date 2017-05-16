import React from 'react'
import PropTypes from 'prop-types'

import pick from 'lodash/fp/pick'
import mapValues from 'lodash/fp/mapValues'

import { HotKeys } from 'react-hotkeys'

import setWrappedDisplayName from './setWrappedDisplayName'


const { createElement: element } = React
const { func } = PropTypes
const enhancer = keyMap => BaseComponent => {
  const pickHandlers = pick(Object.keys(keyMap))

  const BindHotKeys = props => (
    element(HotKeys, { keyMap, handlers: pickHandlers(props) },
      element(BaseComponent, props),
    )
  )

  BindHotKeys.propTypes = mapValues(() => func.isRequired)(keyMap)

  return BindHotKeys
}


export default setWrappedDisplayName(enhancer, 'bindHotKeys', true)
