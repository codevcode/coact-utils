import React from 'react'

import compose from 'recompose/compose'
import withProps from 'recompose/withProps'
import mapProps from 'recompose/mapProps'

import setWrappedDisplayName from '../setWrappedDisplayName'

const { strictEqual: is } = assert

const { createElement: el, Component: Comp } = React

describe('setWrappedDisplayName', function () {
  it('is a function', function () {
    is(typeof setWrappedDisplayName, 'function')
  })

  if (process.env.NODE_ENV !== 'production') {
    // console.log('developing env')
    it('wrap BaseComponent with the enhancer name', function () {
      const FuncComp = () => el('div')
      is(FuncComp.displayName, undefined)
      is(FuncComp.name, 'FuncComp')

      class ClassComp extends Comp {
        render () { return el('div') }
      }
      ClassComp.displayName = 'MyComp'
      is(ClassComp.displayName, 'MyComp')

      const enhancer = compose(
        withProps({ p: 'p' }),
        mapProps(({ p }) => ({ s: p })),
      )
      is(enhancer(FuncComp).displayName, 'withProps(mapProps(FuncComp))')
      is(enhancer(ClassComp).displayName, 'withProps(mapProps(MyComp))')

      const namedEnhancer = setWrappedDisplayName(enhancer, 'name')
      is(namedEnhancer(FuncComp).displayName, 'name(FuncComp)')
      is(namedEnhancer(ClassComp).displayName, 'name(MyComp)')
    })
    it('enhancer with args', function () {
      const FuncComp = () => el('div')

      const enhancer = (arg) => compose(
        withProps({ p: arg }),
        mapProps(({ p }) => ({ s: p })),
      )
      is(enhancer('p')(FuncComp).displayName, 'withProps(mapProps(FuncComp))')

      const namedEnhancer = setWrappedDisplayName(enhancer, 'name', true)
      is(namedEnhancer('p')(FuncComp).displayName, 'name(FuncComp)')
    })
  } else {
    // console.log('production env')
    it('recompose does not set displayName in production mode', function () {
      const FuncComp = () => el('div')
      is(FuncComp.displayName, undefined)
      is(FuncComp.name, 'FuncComp')

      class ClassComp extends Comp {
        render () { return el('div') }
      }
      ClassComp.displayName = 'MyComp'
      is(ClassComp.displayName, 'MyComp')

      const enhancer = compose(
        withProps({ p: 'p' }),
        mapProps(({ p }) => ({ s: p })),
      )
      is(enhancer(FuncComp).displayName, undefined)
      is(enhancer(ClassComp).displayName, undefined)

      const namedEnhancer = setWrappedDisplayName(enhancer, 'name')
      is(namedEnhancer(FuncComp).displayName, 'name(FuncComp)')
      is(namedEnhancer(ClassComp).displayName, 'name(MyComp)')
    })
    it('enhancer with args', function () {
      const FuncComp = () => el('div')

      const enhancer = (arg) => compose(
        withProps({ p: arg }),
        mapProps(({ p }) => ({ s: p })),
      )
      is(enhancer('p')(FuncComp).displayName, undefined)

      const namedEnhancer = setWrappedDisplayName(enhancer, 'name', true)
      is(namedEnhancer('p')(FuncComp).displayName, 'name(FuncComp)')
    })
  }
})
