import mapValues from 'lodash/fp/mapValues'

/**
  Before change value by updater. Intercept updater call to modify updating value

  modifier 的 signature 考慮

  - `props => value => modifiedValue`
  - `(value, props) => modifiedValue`

  目前似乎沒有 curry 的需求，不需事先把 props 存下來
  先當成第二個參數傳進去比較單純
*/

function checkUpdater (updater) {
  if (typeof updater !== 'function') {
    console.error(`
      modifyUpdatingValue: expect receive updater ${name}
      but recieve ${updater}
    `)
  }
}
function checkModifier (modifier) {
  if (typeof modifier !== 'function') {
    console.error(`
      modifyUpdatingValue: expect receive a higher-order function ${name}
      it should create a modifier, but is ${modifier}
    `)
  }
}

function toUpdater (input) {
  return (typeof input === 'function') ? input : () => input
}
function makeHandlerCreator (makeModifier, name) {
  return props => input => {
    const updater = props[name]
    if (process.env.NODE_ENV !== 'production') checkUpdater(updater)

    const modifier = makeModifier(props)
    if (process.env.NODE_ENV !== 'production') checkModifier(modifier)

    updater(value => modifier(toUpdater(input)(value), value))

    /* another implementation, performance? */
    // if (typeof updater === 'function') {
    //   onChange(value => modifier(updater(value), value))
    // } else {
    //   onChange(value => modifier(updater, value))
    // }
  }
}
const mapValuesWithKey = mapValues.convert({ cap: false })
const modifyUpdatingValue = mapValuesWithKey(makeHandlerCreator)

export default modifyUpdatingValue

const test = { makeHandlerCreator }
export { test }
