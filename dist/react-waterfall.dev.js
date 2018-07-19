'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  _setPrototypeOf(subClass.prototype, superClass && superClass.prototype);

  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.getPrototypeOf || function _getPrototypeOf(o) {
    return o.__proto__;
  };

  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

var EnhancedProvider = function EnhancedProvider(setProvider, Provider, config, subscriptions, middlewares) {
  return (
    /*#__PURE__*/
    function (_Component) {
      function EnhancedProvider(props) {
        var _this;

        _classCallCheck(this, EnhancedProvider);

        _this = _possibleConstructorReturn(this, _getPrototypeOf(EnhancedProvider).call(this));

        _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "internalState", {});

        _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "initializedMiddlewares", []);

        _this.state = props.initialState || config.initialState;

        _this.setInternalState(_this.state);

        var actionsCreators = props.actionsCreators || config.actionsCreators;
        _this.state.reactWaterfallActions = _this.buildActions(actionsCreators);
        _this.initializedMiddlewares = middlewares.map(function (middleware) {
          return middleware({
            initialState: _this.getInternalState(),
            actionsCreators: actionsCreators
          }, _assertThisInitialized(_assertThisInitialized(_this)), _this.getActions());
        });
        setProvider(_assertThisInitialized(_assertThisInitialized(_this)));
        return _this;
      }

      _createClass(EnhancedProvider, [{
        key: "getInternalState",
        value: function getInternalState() {
          return this.internalState;
        }
      }, {
        key: "setInternalState",
        value: function setInternalState(state) {
          this.internalState = state;
        }
      }, {
        key: "getActions",
        value: function getActions() {
          var reactWaterfallActions = this.state.reactWaterfallActions;
          return reactWaterfallActions;
        }
      }, {
        key: "buildActions",
        value: function buildActions(actionsCreators) {
          var _this2 = this;

          return Object.keys(actionsCreators).reduce(function (r, actionName) {
            return _objectSpread({}, r, _defineProperty({}, actionName, function () {
              for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
              }

              var result = actionsCreators[actionName].apply(actionsCreators, [_this2.getInternalState(), _this2.getActions()].concat(args));
              return _this2.handleActionResult.apply(_this2, [actionName, result].concat(args));
            }));
          }, {});
        }
      }, {
        key: "handleActionResult",
        value: function handleActionResult(actionName, result) {
          var _this3 = this;

          for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
            args[_key2 - 2] = arguments[_key2];
          }

          // empty or non-object response from action does nothing and returns value to caller
          if (!result || _typeof(result) !== 'object') return result; // object, but not promise, response from actions means the object is a new partial state

          if (!result.then) this.updateState.apply(this, [actionName, result].concat(args)); // promise response from action must be handled to see what it returns

          if (result.then) {
            result.then(function (promiseResult) {
              return _this3.handleActionResult.apply(_this3, [actionName, promiseResult].concat(args));
            });
          }

          return result;
        }
      }, {
        key: "updateState",
        value: function updateState(action, result) {
          var _this4 = this;

          for (var _len3 = arguments.length, args = new Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
            args[_key3 - 2] = arguments[_key3];
          }

          var newState = _objectSpread({}, this.state, result);

          return new Promise(function (resolve) {
            subscriptions.getSubscriptions().forEach(function (fn) {
              return fn.apply(void 0, [action, result].concat(args));
            });

            _this4.setInternalState(newState);

            _this4.setState(newState, function () {
              _this4.initializedMiddlewares.forEach(function (m) {
                return m.apply(void 0, [action].concat(args));
              });

              resolve();
            });
          });
        }
      }, {
        key: "render",
        value: function render() {
          return React__default.createElement(Provider, {
            value: this.state
          }, this.props.children);
        }
      }]);

      _inherits(EnhancedProvider, _Component);

      return EnhancedProvider;
    }(React.Component)
  );
};

var Prevent =
/*#__PURE__*/
function (_PureComponent) {
  function Prevent() {
    _classCallCheck(this, Prevent);

    return _possibleConstructorReturn(this, _getPrototypeOf(Prevent).apply(this, arguments));
  }

  _createClass(Prevent, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          renderComponent = _this$props.renderComponent,
          rest = _objectWithoutProperties(_this$props, ["renderComponent"]);

      return renderComponent(rest);
    }
  }]);

  _inherits(Prevent, _PureComponent);

  return Prevent;
}(React.PureComponent);

var connect = function connect(Consumer) {
  return function (mapStateToProps) {
    return function (WrappedComponent) {
      var renderComponent = function renderComponent(props) {
        return React.createElement(WrappedComponent, props);
      };

      var ConnectedComponent = function ConnectedComponent(props) {
        return React.createElement(Consumer, null, function (stateAndActions) {
          if (!stateAndActions || !stateAndActions.reactWaterfallActions) {
            var componentName = // $FlowFixMe
            WrappedComponent.prototype && WrappedComponent.prototype.constructor && WrappedComponent.prototype.constructor.name || null;
            var componentHint = typeof componentName === 'string' ? " (".concat(componentName, ")") : ''; // eslint-disable-next-line no-console,max-len

            console.error("Connected component".concat(componentHint, " must be wrapped with ", '<Provider />'));
            return;
          }

          var reactWaterfallActions = stateAndActions.reactWaterfallActions,
              state = _objectWithoutProperties(stateAndActions, ["reactWaterfallActions"]);

          var filteredState = mapStateToProps(state || {}, reactWaterfallActions);
          return React.createElement(Prevent, _extends({
            renderComponent: renderComponent
          }, props, filteredState));
        });
      };

      ConnectedComponent.displayName = "Connect(".concat(WrappedComponent.displayName || WrappedComponent.name || 'Unknown', ")");
      return ConnectedComponent;
    };
  };
};

/* eslint-disable no-undef */
var Subscriptions = function Subscriptions() {
  var _this = this;

  _classCallCheck(this, Subscriptions);

  _defineProperty(this, "subscriptions", []);

  _defineProperty(this, "getSubscriptions", function () {
    return _this.subscriptions;
  });

  _defineProperty(this, "subscribe", function (subscription) {
    _this.subscriptions = _toConsumableArray(_this.subscriptions).concat([subscription]);
  });

  _defineProperty(this, "unsubscribe", function (subscription) {
    _this.subscriptions = _this.subscriptions.filter(function (subscriber) {
      return subscriber !== subscription;
    });
  });
};

var id = 0;
var devtools = (function (_ref, self) {
  var initialState = _ref.initialState;
  var reduxDevTools = window.devToolsExtension;
  var instanceID = id;
  id += 1;
  var name = "react-waterfall - ".concat(instanceID);
  var features = {
    jump: true
  };
  var devTools = reduxDevTools.connect({
    name: name,
    features: features
  });
  devTools.subscribe(function (data) {
    switch (data.type) {
      case 'START':
        devTools.init(initialState);
        break;

      case 'RESET':
        self.setState(initialState);
        break;

      case 'DISPATCH':
        switch (data.payload.type) {
          case 'JUMP_TO_STATE':
          case 'JUMP_TO_ACTION':
            {
              self.setState(JSON.parse(data.state));
              break;
            }

          default:
            break;
        }

        break;

      default:
        break;
    }
  });
  return function (action) {
    for (var _len = arguments.length, arg = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      arg[_key - 1] = arguments[_key];
    }

    devTools.send(_objectSpread({
      type: action
    }, arg), self.state, {}, instanceID);
  };
});

var defaultMiddlewares = typeof window !== 'undefined' && window.devToolsExtension ? [devtools] : [];

var Store =
/*#__PURE__*/
function () {
  function Store() {
    var _this = this;

    _classCallCheck(this, Store);

    _defineProperty(this, "subscriptions", new Subscriptions());

    _defineProperty(this, "provider", null);

    _defineProperty(this, "setProvider", function (self) {
      _this.provider = self;
    });
  }

  _createClass(Store, [{
    key: "create",
    value: function create(config, middlewares) {
      var context = React.createContext();
      var Provider = EnhancedProvider(this.setProvider, context.Provider, config, this.subscriptions, _toConsumableArray(middlewares).concat(defaultMiddlewares));
      var connect$$1 = connect(context.Consumer, this);
      return {
        Provider: Provider,
        connect: connect$$1,
        subscribe: this.subscriptions.subscribe,
        unsubscribe: this.subscriptions.unsubscribe
      };
    }
  }]);

  return Store;
}();

var createStore = function createStore(config) {
  var middlewares = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var store = new Store();
  return store.create(config, middlewares);
};

module.exports = createStore;
//# sourceMappingURL=react-waterfall.dev.js.map
