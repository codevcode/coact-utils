import React from 'react'
import PropTypes from 'prop-types'

import setWrappedDisplayName from './setWrappedDisplayName'


const enhancer = (eventName, listener) => BaseComponent => {
  class ListenEvent extends React.Component {
    constructor (props, context) {
      super(props, context)
    }
    componentDidMount () {
      this.props.emitter.addListener(eventName, listener)
    }
    componentWillUnmount () {
      this.props.emitter.removeListener(eventName, listener)
    }
    render () {
      return React.createElement(BaseComponent, this.props)
    }
  }

  ListenEvent.contextTypes = { emitter: PropTypes.object.isRequired }

  return ListenEvent
}


export default setWrappedDisplayName(enhancer, 'listenEvent', true)

