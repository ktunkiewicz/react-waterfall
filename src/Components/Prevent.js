// @flow

import { PureComponent } from 'react'

import type { Node } from 'react'

type Props = {
  renderComponent: ({}) => Node,
}

export default class Prevent extends PureComponent<Props> {
  render() {
    const { renderComponent, ...rest } = this.props
    return renderComponent(rest)
  }
}
