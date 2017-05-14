// 將傳入的 spliter 放到 props 中，若 props 中已經有 spliter，則 merge 這兩個 spliter

import PropTypes from 'prop-types'

import compose from 'recompose/compose'
import setPropTypes from 'recompose/setPropTypes'
import withPropsOnChange from 'recompose/withPropsOnChange'

import setEnhancerName from './setEnhancerName'


function mixSpliter (spliter, thisSpliter) {
  return props => {
    const spliterWithProps = spliter(props)
    const thisSpliterWithProps = thisSpliter(props)
    return key => ({
      ...spliterWithProps(key),
      ...thisSpliterWithProps(key),
    })
  }

  // 不確定之前傳入 lastSplitedProps 的原因，spliter 間不應該相依
  // return (props, key) => {
  //   const lastSplitedProps = spliter(props, key)
  //   return {
  //     ...lastSplitedProps,
  //     ...thisSpliter(props, key, lastSplitedProps),
  //   }
  // }
}

const { func } = PropTypes
const enhancer = thisSpliter => compose(
  setPropTypes({
    spliter: func,
  }),
  // spliter 不屬於 handler，只是 build childPorps 用的 funciton
  // 所以用 withPropsOnChange，而不用 withHandlers
  // 大部份時候 spliter 是靜態的，不用每次重新產生
  withPropsOnChange(['spliter'], ({ spliter }) => ({
    spliter: spliter ? mixSpliter(spliter, thisSpliter) : thisSpliter,
  })),
)


export default setEnhancerName(enhancer, 'mixSpliter', true)
