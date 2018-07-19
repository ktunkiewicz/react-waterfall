/* eslint-disable react/prop-types,max-len */
/* global store, jest */
import React, { Component } from 'react'
import renderer from 'react-test-renderer'

import createStore from '../'

global.console = { ...console, error: jest.fn() }

const fakeFetch = () => new Promise(resolve => resolve({ stars: 10000 }))

beforeEach(() => {
  const config = {
    initialState: {
      count: 0,
      stars: null,
    },
    actionsCreators: {
      increment: ({ count }) => ({ count: count + 1 }),
      getStars: async () => {
        const { stars } = await fakeFetch()
        return { stars }
      },
    },
  }

  global.store = createStore(config)
})

const DummyEmptyComponent = () => 'test'
const DummyCountComponent = ({ count }) => count
const DummyStarsComponent = ({ stars }) => stars

test('store initialization', () => {
  expect(store.Provider).toBeDefined()
  expect(store.connect).toBeDefined()
  expect(store.subscribe).toBeDefined()
  expect(store.unsubscribe).toBeDefined()
})

test('render provider with its children', () => {
  const { Provider } = store
  const App = () => (
    <Provider>
      <h1>Children</h1>
    </Provider>
  )

  const tree = renderer.create(<App />).toJSON()
  expect(tree).toMatchSnapshot()
})

test('call console.error and return null component if connect is used without wrapping in Provider', () => {
  const { connect } = store
  const Test = connect((state, actions) => ({ ...actions }))(DummyEmptyComponent)
  const tree = renderer.create(<Test />)

  // eslint-disable-next-line no-console
  expect(console.error).toBeCalledWith('Connected component must be wrapped with <Provider />')
  expect(tree.toJSON()).toMatchSnapshot()
})

test('actions triggered and state updated', () => {
  const { Provider, connect } = store
  const Count = connect(({ count }, actions) => ({ count, ...actions }))(DummyCountComponent)
  const App = () => (
    <Provider>
      <Count />
    </Provider>
  )
  const tree = renderer.create(<App />)
  expect(tree.toJSON()).toMatchSnapshot()

  const { props } = tree.root.findByType(Count).children[0]
  props.increment()
  expect(tree.toJSON()).toMatchSnapshot()
})

test('consecutive actions calls inside didMount', () => {
  const { Provider, connect } = store

  class Count extends Component {
    componentDidMount() {
      this.props.increment()
      this.props.increment()
    }
    render() {
      return this.props.count
    }
  }
  const CountContainer = connect(({ count }, actions) => ({ count, ...actions }))(Count)

  const App = () => (
    <Provider>
      <CountContainer />
    </Provider>
  )

  const tree = renderer.create(<App />)

  const instance = tree.root.findByType(Count)
  expect(instance.props.count).toBe(2)
})

test('async actions', async () => {
  const { Provider, connect } = store

  const Stars = connect(({ stars }, actions) => ({ stars, ...actions }))(DummyStarsComponent)

  const App = () => (
    <Provider>
      <Stars />
    </Provider>
  )

  const tree = renderer.create(<App />)
  const firstPass = tree.root.findByType(Stars).children[0]
  await firstPass.props.getStars()

  const secondPass = tree.root.findByType(Stars).children[0]
  expect(typeof secondPass.props.stars).toBe('number')
})

test('provider initialized with initialState prop', () => {
  const { Provider, connect } = store

  const Count = connect(({ count }, actions) => ({ count, ...actions }))(DummyCountComponent)

  const App = () => (
    <Provider initialState={{ count: 2 }}>
      <Count />
    </Provider>
  )
  const tree = renderer.create(<App />)

  const firstPass = tree.root.findByType(Count).children[0]
  expect(firstPass.props.count).toBe(2)

  firstPass.props.increment()

  const secondPass = tree.root.findByType(Count).children[0]
  expect(secondPass.props.count).toBe(3)
})

test('provider initialized with actionsCreators prop', () => {
  const { Provider, connect } = store

  const Count = connect(({ count }, actions) => ({ count, ...actions }))(DummyCountComponent)

  const App = () => (
    <Provider
      initialState={{ count: 2 }}
      actionsCreators={{
        decrement: ({ count }) => ({ count: count - 1 }),
      }}
    >
      <Count />
    </Provider>
  )
  const tree = renderer.create(<App />)

  const firstPass = tree.root.findByType(Count).children[0]
  expect(firstPass.props.count).toBe(2)

  firstPass.props.decrement()

  const secondPass = tree.root.findByType(Count).children[0]
  expect(secondPass.props.count).toBe(1)
})

test('subscribers working fine', () => {
  const {
    Provider,
    connect,
    subscribe,
    unsubscribe,
  } = store
  const Count = connect(({ count }, actions) => ({ count, ...actions }))(DummyEmptyComponent)
  const App = () => (
    <Provider>
      <Count />
    </Provider>
  )
  const tree = renderer.create(<App />)
  const { props } = tree.root.findByType(Count).children[0]

  const subscriber1 = jest.fn()
  subscribe(subscriber1)
  const subscriber2 = jest.fn()
  subscribe(subscriber2)
  unsubscribe(subscriber2)

  props.increment()

  expect(subscriber1).toBeCalledWith('increment', { count: 1 })
  expect(subscriber2).not.toBeCalled()
})

test('middlewares working fine', () => {
  const testMiddlewareListener = jest.fn()
  const testMiddleware = jest.fn(() => testMiddlewareListener)
  const config = {
    initialState: {
      count: 0,
    },
    actionsCreators: {
      increment: ({ count }) => ({ count: count + 1 }),
    },
  }
  const { Provider, connect } = createStore(config, [testMiddleware])
  const Count = connect(({ count }, actions) => ({ count, ...actions }))(DummyEmptyComponent)
  const App = () => (
    <Provider>
      <Count />
    </Provider>
  )
  const tree = renderer.create(<App />)
  const { props } = tree.root.findByType(Count).children[0]
  props.increment()

  expect(testMiddleware).toHaveBeenCalledTimes(1)
  expect(testMiddleware).toBeCalledWith(config, expect.any(Object), { increment: expect.any(Function) })
  expect(testMiddlewareListener).toHaveBeenCalledTimes(1)
  expect(testMiddlewareListener).toBeCalledWith('increment')
})
