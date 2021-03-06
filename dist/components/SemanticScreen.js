"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _store = require("../reducers/store");

var _messageActions = require("../actions/messageActions");

var _selectPointActions = require("../actions/selectPointActions");

var _SemanticScreenLogic = _interopRequireDefault(require("./SemanticScreenLogic"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/*
  Copyright (C) 2020 by USHIN, Inc.

  This file is part of U4U.

  U4U is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  U4U is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with U4U.  If not, see <https://www.gnu.org/licenses/>.
*/
var SemanticScreen = function SemanticScreen(props) {
  var message = props.message,
      onChangeMessage = props.onChangeMessage,
      selectedPointIds = props.selectedPointIds,
      onChangeSelectedPointIds = props.onChangeSelectedPointIds;
  var store = (0, _react.useMemo)(_store.createStore, []);
  (0, _react.useLayoutEffect)(function () {
    if (message && message !== store.getState().message) {
      store.dispatch((0, _messageActions.setMessage)({
        message: message
      }));
    }

    if (selectedPointIds && selectedPointIds !== store.getState().selectedPoints.pointIds) {
      store.dispatch((0, _selectPointActions.setSelectedPoints)({
        pointIds: selectedPointIds
      }));
    }
  }, [store, message, selectedPointIds]);
  (0, _react.useEffect)(function () {
    var unsubscribe = store.subscribe(function () {
      if (onChangeMessage && store.getState().message !== message) {
        onChangeMessage(store.getState().message);
      }

      if (onChangeSelectedPointIds && store.getState().selectedPoints.pointIds !== selectedPointIds) {
        onChangeSelectedPointIds(store.getState().selectedPoints.pointIds);
      }
    });
    return function () {
      return unsubscribe();
    };
  }, [store, onChangeMessage, message, onChangeSelectedPointIds, selectedPointIds]);
  return /*#__PURE__*/_react.default.createElement(_reactRedux.Provider, {
    store: store
  }, /*#__PURE__*/_react.default.createElement(_SemanticScreenLogic.default, {
    readOnly: props.readOnly || false,
    darkMode: props.darkMode || false
  }));
};

var _default = SemanticScreen;
exports.default = _default;