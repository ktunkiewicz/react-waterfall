// @flow

import type { Middleware } from '../types'

let id = 0

const devToolsMiddleware: Middleware = ({ initialState }, self, actions) => {
  const reduxDevTools = window.devToolsExtension

  const instanceID = id
  id += 1

  const name = `react-waterfall - ${instanceID}`

  const devTools = reduxDevTools.connect({ name, actionCreators: actions })

  devTools.subscribe(data => {
    switch (data.type) {
      case 'START':
        devTools.init(initialState)
        break
      case 'RESET':
        self.setState(initialState)
        break
      case 'DISPATCH':
        switch (data.payload.type) {
          case 'JUMP_TO_STATE':
          case 'JUMP_TO_ACTION': {
            self.setState(JSON.parse(data.state))
            break
          }
          default:
            break
        }
        break
      case 'ACTION':
        // eslint-disable-next-line no-eval
        eval(data.payload);
        break;
      default:
        break
    }
  })

  return (action, ...arg) => {
    // $FlowFixMe
    devTools.send({ type: action, ...arg }, self.state, {}, instanceID)
  }
}

export default devToolsMiddleware
