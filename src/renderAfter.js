import branch from 'recompose/branch'


const renderSelf = component => component
const renderNull = () => () => null


export default checkReady => branch(checkReady, renderSelf, renderNull)
