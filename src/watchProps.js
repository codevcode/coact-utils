import lifecycle from 'recompose/lifecycle'
import shallowEqual from 'recompose/shallowEqual'

import setWrappedDisplayName from './setWrappedDisplayName'


/* 目前想不什麼情況會需要 watchProps，也許是個 anti-pattern */

function toArray (input) {
  return Array.isArray(input) ? input : [input]
}
function toFunc (input) {
  return typeof input === 'function' ? input : () => input
}

function isSelectedPropsChange (selector, currentProps, nextProps) {
  const selectedCurrent = toArray(selector(currentProps))
  const selectedNext = toArray(selector(nextProps))

  return selectedCurrent
      .map((current, index) => ({ current, next: selectedNext[index] }))
      .some(({ current, next }) => !shallowEqual(current, next))
}

const enhancer = (selector, handler, runOnMount) => lifecycle({
  componentDidMount () {
    if (toFunc(runOnMount)(this.props)) handler(this.props)
  },
  shouldComponentUpdate (nextProps) {
    if (isSelectedPropsChange(selector, nextProps, this.props)) {
      if (handler(nextProps, this.props) === false) return false
    }
    return true
  },
})


export default setWrappedDisplayName(enhancer, 'watchProps', true)
