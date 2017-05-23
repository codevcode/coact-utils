import withHandlers from 'recompose/withHandlers'
import branch from 'recompose/branch'

import modifyUpdatingValue from './modifyUpdatingValue'
import setWrappedDisplayName from './setWrappedDisplayName'


// 使用 branch 處理，在 modifier 不存在時還是呼叫 modifyUpdatingValue
// 可能比較有效率
const enhancer = (updaterName, input) => {
  if (typeof input === 'string') {
    return branch(
      ({ [input]: modifier }) => !!modifier,
      withHandlers(modifyUpdatingValue({
        [updaterName]: ({ [input]: modifier }) => modifier,
      })),
      // withHandlers(modifyUpdatingValue({
      //   [updaterName]: ({ [modifierName]: modifier }) => (!!modifier ? modifier : v => v),
      // }))
    )
  }

  return withHandlers(modifyUpdatingValue({
    [updaterName]: input, // input as makeModifier
  }))
}


export default setWrappedDisplayName(enhancer, 'interceptUpdater', true)
