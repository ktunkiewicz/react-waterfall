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

var EnhancedProvider = function EnhancedProvider(setProvider, Provider, initialState) {
  return (
    /*#__PURE__*/
    function (_Component) {
      function EnhancedProvider(props) {
        var _this;

        _classCallCheck(this, EnhancedProvider);

        _this = _possibleConstructorReturn(this, _getPrototypeOf(EnhancedProvider).call(this));
        _this.state = props.initialState || initialState;
        setProvider(_assertThisInitialized(_assertThisInitialized(_this)));
        return _this;
      }

      _createClass(EnhancedProvider, [{
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
        return React.createElement(Consumer, null, function (state) {
          var filteredState = mapStateToProps(state || {});
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

var devToolsMiddleware = function devToolsMiddleware(_ref, self, actions) {
  var initialState = _ref.initialState;
  var reduxDevTools = window.devToolsExtension;
  var instanceID = id;
  id += 1;
  var name = "react-waterfall - ".concat(instanceID);
  var devTools = reduxDevTools.connect({
    name: name,
    actionCreators: actions
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

      case 'ACTION':
        // eslint-disable-next-line no-eval
        eval(data.payload);
        break;

      default:
        break;
    }
  });
  return function (action) {
    for (var _len = arguments.length, arg = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      arg[_key - 1] = arguments[_key];
    }

    // $FlowFixMe
    devTools.send(_objectSpread({
      type: action
    }, arg), self.state, {}, instanceID);
  };
};

var defaultMiddlewares = typeof window !== 'undefined' && window.devToolsExtension ? [devToolsMiddleware] : [];

var createStore = function createStore(_ref) {
  var initialState = _ref.initialState,
      _ref$actionsCreators = _ref.actionsCreators,
      actionsCreators = _ref$actionsCreators === void 0 ? {} : _ref$actionsCreators;
  var middlewares = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var provider;
  var context = React.createContext();

  var _ref2 = new Subscriptions(),
      getSubscriptions = _ref2.getSubscriptions,
      subscribe = _ref2.subscribe,
      unsubscribe = _ref2.unsubscribe;

  var setProvider = function setProvider(self) {
    var initializedMiddlewares = _toConsumableArray(middlewares).concat(defaultMiddlewares).map(function (middleware) {
      return middleware({
        initialState: initialState,
        actionsCreators: actionsCreators
      }, self, actions);
    });

    provider = {
      getState: function getState() {
        return self.state;
      },
      setState: function setState(state, callback) {
        return self.setState(state, callback);
      },
      initializedMiddlewares: initializedMiddlewares
    };
  };

  var setState = function setState(action, state) {
    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    return new Promise(function (resolve) {
      var subscriptions = getSubscriptions();
      subscriptions.forEach(function (fn) {
        return fn.apply(void 0, [action, state].concat(args));
      });
      provider.setState(state, function () {
        provider.initializedMiddlewares.forEach(function (m) {
          return m.apply(void 0, [action].concat(args));
        });
        resolve();
      });
    });
  };

  var actions = Object.keys(actionsCreators).reduce(function (r, v) {
    return _objectSpread({}, r, _defineProperty({}, v, function () {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      if (!provider) {
        // eslint-disable-next-line no-console
        console.error('<Provider /> is not initialized yet');
        return;
      }

      var result = actionsCreators[v].apply(actionsCreators, args)(provider.getState(), actions);

      if (_typeof(result) === 'object') {
        return result.then ? result.then(function (res) {
          return setState.apply(void 0, [v, res].concat(args));
        }) : setState.apply(void 0, [v, result].concat(args));
      }
    }));
  }, {});
  var Provider = EnhancedProvider(setProvider, context.Provider, initialState);
  var connect$$1 = connect(context.Consumer);
  return {
    Provider: Provider,
    connect: connect$$1,
    actions: actions,
    subscribe: subscribe,
    unsubscribe: unsubscribe
  };
};

module.exports = createStore;
//# sourceMappingURL=react-waterfall.dev.js.map
