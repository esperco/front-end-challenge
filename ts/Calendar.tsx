/*
  A simple calendar component
*/

namespace Calendar {
  var locale = "Pacific/Auckland";

  // Shows a month
  export class Month extends React.Component<{date: Date}, {}> {
    render() {
      var date = this.props.date;
      var month = moment(date).month();
      var start = moment(date).tz(locale).clone()
        .startOf('month').startOf('week');
      var end = moment(date).tz(locale).clone().endOf('month');
      var weeks: Date[] = [];
      while (start <= end) {
        weeks.push(start.clone().toDate());
        start.add(1, 'week');
      }

      return <div className="calendar-holder">
        <div className="month-name">
          { moment(date).format("MMM YYYY") }
        </div>
        <table className="cal-month">
          <thead>
            <Headings />
          </thead>
          <tbody>
            { _.map(weeks,
              (date, i) => <Week key={i} date={date} month={month} />
            ) }
          </tbody>
        </table>
      </div>;
    }
  }

  // Calendar headings (Su, M, Tu, ... )
  function Headings() {
    return <tr className="cal-header">{
      _.times(7, (i) => <th key={i.toString()}>
        { moment().weekday(i).format('ddd') }
      </th>)
    }</tr>;
  }

  // Render week, with month 0 - 11
  function Week({date, month}: {date: Date, month: number}) {
    var dates: Date[] = [];

    // Fill to end of week
    var start = moment(date);
    while (dates.length < 7) {
      dates.push(start.clone().toDate());
      start.add(1, 'day');
    }

    // Row = week
    return <tr className="cal-week">
      { _.map(dates,
        (date, i) => <Day key={i} date={date} month={month} />
      ) }
    </tr>;
  }


  ////

  interface DayProps {
    date: Date;
    month: number;
  }

  class Day extends React.Component<DayProps, {}> {
    render() {
      var classNames = ["cal-day"];
      if (this.props.month === moment(this.props.date).month()) {
        classNames.push("in-month");
      } else {
        classNames.push("out-month");
      }

      return <td className={classNames.join(" ")}>
        { moment(this.props.date).format("D") }
      </td>
    }
  }
}
