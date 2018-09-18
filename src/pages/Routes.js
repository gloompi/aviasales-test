import React from 'react'
import universal from 'react-universal-component'

const UniversalComponent = (page, path) => {
  if(!path) return universal(import(`./${page}`), {
    onLoad(module, info, props, context) {
      if (module.reducers) {
        context.store.injectReducers(module.reducers)
      }
    }
  })
  return universal(import(`${path}${page}`), {
    onLoad(module, info, props, context) {
      if (module.reducers) {
        context.store.injectReducers(module.reducers)
      }
    }
  })
}

export default [
  {
    component: UniversalComponent('App'),
    routes: [
      {
        component: UniversalComponent('Main'),
        path: '/',
        exact: true
      }
    ]
  }
]