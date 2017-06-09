import splitUpdater from './splitUpdater'


function stateSpliter (state, updater) {
  return function linkState (key, init, stateName = 'value', updaterName = 'onChange') {
    const { [key]: subState = init } = state
    return {
      [stateName]: subState,
      [updaterName]: splitUpdater(updater)(key),
    }
  }
}


export default stateSpliter
