import memoize from 'lodash/memoize'


function isNil (value) {
  return value === undefined || value === null
}
function cloneObject (obj) {
  return Array.isArray(obj) ? [...obj] : { ...obj }
}
function toUpdateFunc (input) {
  return (typeof input === 'function') ? input : (() => input)
}

/**
 * Creates a partial-updater function that updates a part of the value
 * that `updater` will update. Updater is a function receiving a new value
 * or a function returns a new value to update the value.
 *
 * @param  {string} key The key of the value to update by the sub-updater
 * @param  {Function} updater The function to update a value
 * @return {Function} Returns a function, only update a part of the value
 */
// export default function splitUpdater (key, updater, emptyObj = { }) {
// const splitUpdater = (key, updater, emptyObj = { }) => {
const splitUpdater = updater => (key, emptyObj = { }) => {
  // Creates a function that updates a part of value by a newValue or
  // a function recevies old obj and returns a new obj
  return function partialUpdater (input, callback) {
    return updater(
      (obj) => Object.assign(
        // Creates or clones an object for updating
        isNil(obj) ? emptyObj : cloneObject(obj),
        // An object with new partial value
        { [key]: toUpdateFunc(input)(obj && obj[key]) }
      ),
      callback
    )
  }
}

// cache updater with WeakMap, cache key with default Map
// when call `memoize(splitUpdater(updater))`,
// the `memoize.Cache` is `undefined`
memoize.Cache = WeakMap // prevent memory leak
const memoizedSplitUpdater = memoize(updater => memoize(splitUpdater(updater)))
memoize.Cache = undefined // reset, use default Cache for other memoized funcs

export default memoizedSplitUpdater

/**
 * Trivial split updater function??
 */
// export default (updater, key, init = { }) => (val, callback) => updater(
//   (obj) => Object.assign(
//     isNil(obj) ? init : Array.isArray(obj) ? [...obj] : { ...obj },
//     { [key]: (typeof val === 'function' ? val : () => val)(obj && obj[key]) }
//   ),
//   callback
// )

/**
 *  Another implemntation for creating a partial update function
 */
      // (obj) => {
      //   const updatedObj = isNil(obj) ? emptyObj : cloneObject(obj)
      //   updatedObj[key] = toUpdateFunc(input)(updatedObj[key])
      //   return updatedObj
      // },
