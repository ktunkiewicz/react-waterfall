// @flow

import React, { Component } from 'react'

import type { Node } from 'react'
import type { CreateProvider, State } from '../types'

type Props = { children: Node, initialState: {} }

const EnhancedProvider: CreateProvider = (
  setProvider,
  Provider,
  initialState,
) =>
  class EnhancedProvider extends Component<Props, State> {
    constructor(props) {
      super()
      this.state = props.initialState || initialState
      setProvider(this)
    }

    render() {
      return <Provider value={this.state}>{this.props.children}</Provider>
    }
  }

export default EnhancedProvider
