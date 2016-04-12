/*
  Main home page
*/
namespace Index {
  interface Props {

  }

  interface State {

  }

  export class View extends React.Component<Props, State> {
    render() {
      return <div>
        <Navbar />
        <div className="container">
          <Calendar.Month date={new Date()} />
        </div>
      </div>;
    }
  }

  function Navbar() {
    return <nav className="navbar navbar-default">
      <div className="container">
        <div className="navbar-header">
          <span className="navbar-brand">
            Mr. Boggin's Room Reservation System
          </span>
        </div>
      </div>
    </nav>;
  }
}
