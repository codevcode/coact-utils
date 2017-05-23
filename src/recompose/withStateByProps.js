import { Component } from 'react'
import setDisplayName from 'recompose/setDisplayName'
import wrapDisplayName from 'recompose/wrapDisplayName'
import createEagerFactory from 'recompose/createEagerFactory'


function getInitState (getStateByProps, props) {
  if (typeof getStateByProps !== 'function') return getStateByProps

  const initState = getStateByProps(props)
  return (typeof initState === 'function') ? initState() : initState
}

const withStateByProps = (
  stateName,
  stateUpdaterName,
  getStateByProps,
) => BaseComponent => {
  const factory = createEagerFactory(BaseComponent)
  class WithStateByProps extends Component {
    constructor (props) {
      super(props)

      this.state = { stateValue: getInitState(getStateByProps, props) }

      if (typeof getStateByProps === 'function') {
        this.componentWillReceiveProps = (nextProps) => {
          const nextState = getStateByProps(nextProps)
          if (typeof nextState === 'function' || nextState !== this.state.stateValue) {
            this.updateStateValue(nextState)
          }
        }
      }
    }

    updateStateValue = (updateFn, callback) =>
      this.setState(
        ({ stateValue }) => ({
          stateValue: typeof updateFn === 'function'
            ? updateFn(stateValue)
            : updateFn,
        }),
        callback
      )

    render () {
      return factory({
        ...this.props,
        [stateName]: this.state.stateValue,
        [stateUpdaterName]: this.updateStateValue,
      })
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(BaseComponent, 'withStateByProps'))(
      WithStateByProps
    )
  }
  return WithStateByProps
}

export default withStateByProps
