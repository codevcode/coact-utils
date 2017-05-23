import { Component } from 'react'
import setDisplayName from 'recompose/setDisplayName'
import wrapDisplayName from 'recompose/wrapDisplayName'
import createEagerFactory from 'recompose/createEagerFactory'


function initState (getStateByProps, props) {
  if (typeof getStateByProps !== 'function') return getStateByProps

  const stateValue = getStateByProps(props)
  return (typeof stateValue === 'function') ? stateValue() : stateValue
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

      if (typeof getStateByProps === 'function') {
        this.componentWillReceiveProps = (nextProps) => {
          const nextState = getStateByProps(nextProps, this.props)
          if (nextState !== undefined) {
            this.updateStateValue(nextState)
          }
        }
      }
    }

    state = {
      stateValue: initState(getStateByProps, this.props),
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
