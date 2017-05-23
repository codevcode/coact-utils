import splitUpdater from './splitUpdater'


function stateSpliter (state, updater) {
  return function linkState (key, init, stateName = 'value', updaterName = 'onChange') {
    return {
      [stateName]: state[key] || init,
      [updaterName]: splitUpdater(updater)(key),
    }
  }
}


export default stateSpliter
