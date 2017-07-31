import getDisplayName from 'recompose/getDisplayName'


function createHOC (name, hoc) {
  if (process.env.NODE_ENV === 'production') return hoc

  return BaseComp => {
    const Comp = hoc(BaseComp)
    Comp.displayName = `${name}(${getDisplayName(BaseComp)})`
    return Comp
  }
}


export default createHOC
