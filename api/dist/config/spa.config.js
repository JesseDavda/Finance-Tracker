"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var ConfiguredSPAs = function ConfiguredSPAs() {
  function SPA(params) {
    this.params = params;
  }

  var FinanceTracker = new SPA({
    name: 'FinanceTracker',
    entryPoint: '../../client/build/index.html',
    redirect: true
  });
  FinanceTracker.appTitle = "Finance Tracker";

  FinanceTracker.getEntryPoint = function () {
    return FinanceTracker.params.entryPoint;
  };

  FinanceTracker.getRedirectName = function () {
    return FinanceTracker.params.name;
  };

  return FinanceTracker;
};

var _default = ConfiguredSPAs();

exports["default"] = _default;