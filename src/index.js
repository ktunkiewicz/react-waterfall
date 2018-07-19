// @flow
/* eslint-disable no-undef */

import { createContext } from 'react'

import createProvider from './Components/Provider'
import createConnect from './helpers/connect'
import Subscriptions from './helpers/subscriptions'
import devtools from './helpers/devtools'

import type {
  CreateStore,
  Context,
  SetProvider,
  ProviderType,
} from './types'

const defaultMiddlewares =
  process.env.NODE_ENV === 'development' &&
  typeof window !== 'undefined' &&
  window.devToolsExtension
    ? [devtools]
    : []

class Store {
  subscriptions = new Subscriptions()

  provider: ?ProviderType = null
  setProvider: SetProvider = self => {
    this.provider = self
  }

  create(config, middlewares) {
    const context: Context = createContext()
    const Provider = createProvider(
      this.setProvider,
      context.Provider,
      config,
      this.subscriptions,
      [...middlewares, ...defaultMiddlewares],
    )
    const connect = createConnect(context.Consumer, this)
    return {
      Provider,
      connect,
      subscribe: this.subscriptions.subscribe,
      unsubscribe: this.subscriptions.unsubscribe,
    }
  }
}


const createStore: CreateStore = (config, middlewares = []) => {
  const store = new Store()
  return store.create(config, middlewares)
}

export default createStore
