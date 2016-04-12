/*
  Some tests that get compiled alongside the rest of our app.
  Feel free to separate or re-write these tests as you see fit.
*/

if ((window as any).TESTING) {

  describe("API", function() {
    describe("getNow", function() {
      beforeEach(function() {
        spyOn($, "ajax");
        Api.getNow();
      });

      it("should check the 'now' path on the server", function() {
        expect($.ajax).toHaveBeenCalledWith({
          url: "http://localhost:3000/now",
          type: "GET",
          data: "",
          contentType: "application/json; charset=UTF-8",
          dataType: "json"
        });
      });
    });
  });

  describe("Calendar", function() {
    var monthJQ: JQuery;
    beforeEach(function() {
      var d = new Date(2016, 1, 1); // Feb 1, 2016
      var component = ReactTestUtils.renderIntoDocument(
        <Calendar.Month date={d} />);
      monthJQ = $(ReactDOM.findDOMNode(component));
    });

    it("should render five weeks in February", function() {
      expect(monthJQ.find(".cal-week").length).toEqual(5);
    });

    it("should render seven days per week", function() {
      var weekJQ = monthJQ.find(".cal-week").first();
      expect(weekJQ.find(".cal-day").length).toEqual(7);
    });

    it("should render in-month 29 days for February", function() {
      expect(monthJQ.find(".cal-day.in-month").length).toEqual(29);
    });

    it("should include end of January days for first week in February",
       // Jan 31, assuming week starts on Sunday
    function() {
      var weekJQ = monthJQ.find(".cal-week").first();
      expect(weekJQ.find(".cal-day.out-month").length).toEqual(1);
    });

    it("should include start of March days for last week in February",
       // March 1-5, assuming week starts on Sunday
    function() {
      var weekJQ = monthJQ.find(".cal-week").last();

      expect(weekJQ.find(".cal-day.out-month").length).toEqual(5);
    });
  });
}
