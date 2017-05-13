import getDisplayName from 'recompose/getDisplayName'


// ISSUE: withArgs 容易忘記加
function setWrappedDisplayName (enhancer, name, withArgs = false) {
  if (withArgs) {
    return (...args) => BaseComp => {
      const Comp = enhancer(...args)(BaseComp)
      Comp.displayName = `${name}(${getDisplayName(BaseComp)})`
      return Comp
    }
  }
  return BaseComp => {
    const Comp = enhancer(BaseComp)
    Comp.displayName = `${name}(${getDisplayName(BaseComp)})`
    return Comp
  }
}


export default setWrappedDisplayName
