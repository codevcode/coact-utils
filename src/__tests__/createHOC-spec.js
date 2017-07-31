import React from 'react'

import compose from 'recompose/compose'
import withProps from 'recompose/withProps'
import mapProps from 'recompose/mapProps'

import createHOC from '../createHOC'

const { strictEqual: is } = assert

const { createElement: el, Component: Comp } = React

describe('createHOC', () => {
  it('is a function', () => {
    is(typeof createHOC, 'function')
  })

  if (process.env.NODE_ENV !== 'production') {
    // console.log('developing env')
    it('wrap BaseComponent with the hoc name', () => {
      const FuncComp = () => el('div')
      is(FuncComp.displayName, undefined)
      is(FuncComp.name, 'FuncComp')

      class ClassComp extends Comp {
        render () { return el('div') }
      }
      ClassComp.displayName = 'MyComp'
      is(ClassComp.displayName, 'MyComp')

      const hoc = compose(
        withProps({ p: 'p' }),
        mapProps(({ p }) => ({ s: p })),
      )
      is(hoc(FuncComp).displayName, 'withProps(mapProps(FuncComp))')
      is(hoc(ClassComp).displayName, 'withProps(mapProps(MyComp))')

      const namedEnhancer = createHOC('name', hoc)
      is(namedEnhancer(FuncComp).displayName, 'name(FuncComp)')
      is(namedEnhancer(ClassComp).displayName, 'name(MyComp)')
    })
    it('hoc with args', () => {
      const FuncComp = () => el('div')

      const hoc = (arg) => compose(
        withProps({ p: arg }),
        mapProps(({ p }) => ({ s: p })),
      )
      is(hoc('p')(FuncComp).displayName, 'withProps(mapProps(FuncComp))')

      const namedEnhancer = arg => createHOC('name', hoc(arg))
      is(namedEnhancer('p')(FuncComp).displayName, 'name(FuncComp)')
    })
  } else {
    // console.log('production env')
    it('recompose does not set displayName in production mode', () => {
      const FuncComp = () => el('div')
      is(FuncComp.displayName, undefined)
      is(FuncComp.name, 'FuncComp')

      class ClassComp extends Comp {
        render () { return el('div') }
      }
      ClassComp.displayName = 'MyComp'
      is(ClassComp.displayName, 'MyComp')

      const hoc = compose(
        withProps({ p: 'p' }),
        mapProps(({ p }) => ({ s: p })),
      )
      is(hoc(FuncComp).displayName, undefined)
      is(hoc(ClassComp).displayName, undefined)

      const namedEnhancer = createHOC('name', hoc)
      is(namedEnhancer(FuncComp).displayName, undefined)
      is(namedEnhancer(ClassComp).displayName, undefined)
    })
    it('hoc with args', () => {
      const FuncComp = () => el('div')

      const hoc = (arg) => compose(
        withProps({ p: arg }),
        mapProps(({ p }) => ({ s: p })),
      )
      is(hoc('p')(FuncComp).displayName, undefined)

      const namedEnhancer = arg => createHOC('name', hoc(arg))
      is(namedEnhancer('p')(FuncComp).displayName, undefined)
    })
  }
})
