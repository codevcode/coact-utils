function isDOMEvent (event) {
  if (typeof event !== 'object') return false
  if (event.target instanceof HTMLElement) return true
  return false
}


export default isDOMEvent
