// @flow
/* eslint-disable no-undef */

import * as React from 'react'
import Prevent from '../Components/Prevent'

import type { CreateConnect } from '../types'

const connect: CreateConnect = Consumer => mapStateToProps => WrappedComponent => {
  const renderComponent = props => <WrappedComponent {...props} />
  const ConnectedComponent = props => (
    <Consumer>
      {stateAndActions => {
        if (!stateAndActions || !stateAndActions.reactWaterfallActions) {
          const componentName = (
            // $FlowFixMe
            WrappedComponent.prototype &&
            WrappedComponent.prototype.constructor &&
            WrappedComponent.prototype.constructor.name
          ) || null
          const componentHint = typeof componentName === 'string' ? ` (${componentName})` : ''
          // eslint-disable-next-line no-console,max-len
          console.error(`Connected component${componentHint} must be wrapped with ${'<Provider />'}`)
          return
        }
        const { reactWaterfallActions, ...state } = stateAndActions
        const filteredState = mapStateToProps(state || {}, reactWaterfallActions)
        return (
          <Prevent
            renderComponent={renderComponent}
            {...props}
            {...filteredState}
          />
        )
      }}
    </Consumer>
  )

  ConnectedComponent.displayName = `Connect(${WrappedComponent.displayName ||
    WrappedComponent.name ||
    'Unknown'})`

  return ConnectedComponent
}

export default connect
