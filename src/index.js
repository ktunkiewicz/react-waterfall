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

type Store = {
  context: Context,
  subscriptions: Subscriptions,
  setProvider: SetProvider,
}

const defaultMiddlewares =
  process.env.NODE_ENV === 'development' &&
  typeof window !== 'undefined' &&
  window.devToolsExtension
    ? [devtools]
    : []

const createStore: CreateStore = (config, middlewares = []) => {
  const store: Store = {
    context: createContext(),
    subscriptions: new Subscriptions(),
    setProvider: self => {
      store.provider = self
    },
  }
  const Provider = createProvider(
    store.setProvider,
    store.context.Provider,
    config,
    store.subscriptions,
    [...middlewares, ...defaultMiddlewares],
  )
  const connect = createConnect(store.context.Consumer, this)
  return {
    Provider,
    connect,
    subscribe: store.subscriptions.subscribe,
    unsubscribe: store.subscriptions.unsubscribe,
  }
}

export default createStore
