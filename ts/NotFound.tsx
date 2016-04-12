/*
  Fallback for bad client-side routing paths
*/
namespace NotFound {
  export function View() {
    return <div className="container">
      Whoops. Can't find what you're looking for.
    </div>;
  }
}
