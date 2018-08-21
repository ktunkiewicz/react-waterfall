// @flow
/* eslint-disable no-undef */

import Subscriptions from '../src/helpers/subscriptions'
import EnhancedProvider from '../src/Components/Provider'

export type State = { [string]: any }
export type CustomSetState = (
  action: string,
  state: State,
  args: {},
) => Promise<void>

type Action = (State, {}) => any
type Actions = { [string]: Action }

type Config = {
  initialState: State,
  actionsCreators: Actions,
}

type Middleware = (
  {
    initialState: State,
    actionsCreators: Actions,
  },
  self: EnhancedProvider,
  actions: Actions,
) => (action: string, arg: string) => void

export type ProviderType = EnhancedProvider

type Consumer = React$ComponentType<{
  children: (state: State | void) => React$Node,
}>

export type Context = {
  Consumer: Consumer,
  Provider: React$ComponentType<*>,
}

type MapStateToProps = (state: State, actions: Actions, originalProps: {}) => State

type Connect = (
  mapStateToProps: MapStateToProps,
) => (WrappedComponent: React$ComponentType<{}>) => React$ComponentType<{}>

export type CreateConnect = (Consumer, EnhancedProvider) => Connect

type Provider = React$ComponentType<*>

export type SetProvider = EnhancedProvider => void
export type CreateProvider = (
  setProvider: SetProvider,
  Provider: Provider,
  config: Config,
  subscriptions: Subscriptions,
  middlewares: Middleware[],
) => React$ComponentType<*>

export type Subscription = (action: string, state: State, args: {}) => void

type Store = {
  Provider: Provider,
  connect: Connect,
  subscribe: (subscription: Subscription) => void,
  unsubscribe: (subscription: Subscription) => void,
}

export type CreateStore = (config: Config, middlewares: Middleware[]) => Store

declare module 'react-waterfall' {
  declare export default CreateStore
}
