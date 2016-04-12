/*
  Include third party dependencies for Browserify.

  NB: This is overkill considering we're just adding things to the global
  scope, but this makes using NPM modules more straight-forward.
*/

window._ = require("lodash");
window.$ = window.jQuery = require("jquery");
window.moment = require("moment-timezone");
window.page = require("page");
window.React = require("react");
window.ReactDOM = require("react-dom");
window.ReactTestUtils = require("react-addons-test-utils");

// This modifies jQuery
require("bootstrap");
