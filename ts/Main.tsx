/// <reference path="../typings/browser.d.ts" />

namespace Main {
  export function init() {
    Routes.init();
  }
}

$(document).ready(function() {
  if (! (window as any)['TESTING']) {
    Main.init();
  }
});
