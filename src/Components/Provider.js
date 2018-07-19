// @flow
/* eslint-disable no-undef */

import React, { Component } from 'react'

import type { CreateProvider, State } from '../types'

type Props = { children: React$Node, initialState?: {}, actionsCreators?: {} }

const EnhancedProvider: CreateProvider = (
  setProvider,
  Provider,
  config,
  subscriptions,
  middlewares,
) =>
  class EnhancedProvider extends Component<Props, State> {
    constructor(props) {
      super()
      this.state = props.initialState || config.initialState
      this.setInternalState(this.state)
      const actionsCreators = props.actionsCreators || config.actionsCreators
      this.state.reactWaterfallActions = this.buildActions(actionsCreators)
      this.initializedMiddlewares = middlewares.map(middleware => middleware(
        { initialState: this.getInternalState(), actionsCreators },
        this,
        this.getActions(),
      ))
      setProvider(this)
    }

    getInternalState() {
      return this.internalState
    }

    setInternalState(state) {
      this.internalState = state
    }

    getActions() {
      const { reactWaterfallActions } = this.state
      return reactWaterfallActions
    }

    internalState = {};
    initializedMiddlewares = [];

    buildActions(actionsCreators) {
      return Object.keys(actionsCreators).reduce(
        (r, actionName) => ({
          ...r,
          [actionName]: (...args) => {
            const result = actionsCreators[actionName](
              this.getInternalState(),
              this.getActions(),
              ...args,
            )
            return this.handleActionResult(actionName, result, ...args)
          },
        }),
        {},
      )
    }

    handleActionResult(actionName, result, ...args) {
      // empty or non-object response from action does nothing and returns value to caller
      if (!result || typeof result !== 'object') return result
      // object, but not promise, response from actions means the object is a new partial state
      if (!result.then) this.updateState(actionName, result, ...args)
      // promise response from action must be handled to see what it returns
      if (result.then) {
        result.then(promiseResult => this.handleActionResult(actionName, promiseResult, ...args))
      }
      return result
    }

    updateState(action, result, ...args) {
      const newState = { ...this.state, ...result }
      return new Promise(resolve => {
        subscriptions.getSubscriptions().forEach(fn => fn(action, result, ...args))
        this.setInternalState(newState)
        this.setState(newState, () => {
          this.initializedMiddlewares.forEach(m => m(action, ...args))
          resolve()
        })
      })
    }

    render() {
      return <Provider value={this.state}>{this.props.children}</Provider>
    }
  }

export default EnhancedProvider
