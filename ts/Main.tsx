/// <reference path="../typings/browser.d.ts" />

// Ambient declaration of test util
declare var ReactTestUtils: typeof __React.__Addons.TestUtils;

namespace Main {
  export function init() {
    Routes.init();
  }
}

$(document).ready(function() {
  // The TESTING var is set in the test.html page
  if (! (window as any).TESTING) {
    Main.init();
  }
});
