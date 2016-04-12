// Helpers for client-side router

namespace Routes {
  function render(elm: JSX.Element) {
    ReactDOM.render(elm, document.getElementById("main"));
  }

  // Define routes
  page("", function(ctx) {
    render(<Index.View />);
  });

   // Fallback for missing pagess
  page('*', function(ctx) {
    render(<NotFound.View />);
  });

  // Turn on router
  export function init() {
    page({
      click: false,
      hashbang: true
    });
  }
}
