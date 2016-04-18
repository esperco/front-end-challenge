Esper Front End Developer Challenge
===================================

<img src="/screenshot.png" width="600px" align="center" />

Mr. Boggins, a resident of a little town in the vicinity of Auckland, New
Zealand has a spare room he wants to rent out from time to time. Due to an
aversion to AirBnB's logo, he insists on developing his own system for managing
the availability of this room. Specifically, he wants the following things:

* He should be able to check a calendar for which nights are booked or
  available for any given month. Each calendar day should refer to the night
  *following* that day -- i.e. if the night of April 4-5 is booked, this should
  show up on the  calendar as April 4.
* He should be able to toggle the availability of that night by clicking
  on that calendar day.
* The app should save changes to a server and fetch data from the server on
  load.
* The app does not need to record any other information besides which nights
  are free or available. Mr. Boggins considers details such as guest name or
  how that guest will pay to be irrelevant.

Using this repository as base, please help Mr. Boggins develop the front-end
for his app. We estimate that this would take someone familiar with Typescript
and React no more than 6 hours to complete.

Rules
-----
* You can discuss this exercise with anyone you want, but please do not ask
  anyone to write or review your actual code.

* You can Google anything you need to.

* If you stumble upon someone else's solution to this exercise, please don't
  look at it or copy it.

* You can use any libraries or tools that you want. We've provided an existing
  code-base written with the tools that we use at Esper, and we encourage you
  to build off of it. However, you are welcome to rewrite or modify whatever
  you need to complete this challenge in a reasonable amount of time. Just
  make sure you use the API server we've provided and that we can build and
  serve your code with a minimal number of terminal commands.

* Because we may re-use this challenge with other engineering candidates,
  please don't fork this repo off Github or otherwise make your solution
  easily discoverable. You may submit your solution via zip file or link
  to a private repo.


Getting Started
---------------
You'll need to install [NodeJS](https://nodejs.org/). Once you have NodeJS,
clone this repo and run `npm run install`.

Once everything is installed, run `npm run watch`. This will start both the
API server (running on localhost:3000) and a development server with the
front-end code (running on localhost:5000). Modifying the files in the `ts`,
`less`, or `assets` directory should trigger a rebuild.

This app is written using Typescript, React, LESS, Bootstrap, moment.js,
jQuery, and Lodash. The existing code will make more sense if you're familiar
with those languages, libraries, or frameworks.


Version Support
---------------
We've tested this repo using Node v4.4.0 LTS, but other versions should work
fine. We're also developing on Ubuntu 14.04, but any OS that supports NodeJS
should work too. If you have trouble getting things working on your setup,
please feel free to contact us.


API
---
The development server retains an ephemeral, in-memory store which nights have
been booked. It has two endpoints you should be aware of:

* `GET /reserved/:start/:end` - This returns a list of nights that have been
  reserved between `:start` and `:end`, inclusive. `:start` and `:end` are Unix timestamps (seconds since Jan 1, 1970). The result will be JSON data in this
  form: `{"reserved": [1451559600, 1452164400, ...]}`, where each number is
  also a Unix timestamp.

  Because Mr. Boggins lives in New Zealand, each timestamp refers to the
  *start* of a day in **New Zealand**. Thus, the timestamp corresponding to
  Feb 4, 2016 00:00:00 in New Zealand means the night of Feb 4 - Feb 5.

* `PUT /reserved/:date` - This takes a JSON-encoded object of the form
  `{"reserved": boolean}` where `reserved` indicates whether this date should
  be booked (`true`) or available (`false`). `:date` should be a Unix timestamp
  adhering to the same rules as above.

Note that the API server is not the most reliable thing in the world. There is
a 10% chance you will get a 500 Internal Server error. The front-end code
should handle this scenario via some means other than an uncaught exception.


Some Batteries Included
-----------------------
We've written some basic bits for you already:

* You can bring in new dependencies from NPM by first installing them with
  `npm install ...` and then `require`-ing them in `vendor.js`. Although we
  use Browserify to process `vendor.js`, note that this app currently just
  sticks all of the dependencies on the global `window` object.

* There's a `Calendar.Month` component that you can use a basis for your app.

* We've set up a simple Jasmine test runner at `localhost:5000/test.html`
  if you want to run tests (see `ts/Test.tsx` for examples).


Evaluation Criteria
-------------------
* We don't expect you to be super familiar with Typescript, React, LESS, or
  anything else we're using here, and we're not going to penalize you if you
  don't know about Random Typescript Feature X. We are evaluating your ability
  to find your way around an existing code-base however. Feel free to ask us
  if you have questions about how anything works.

* We're looking for signs you understand Javascript concepts such as events
  and promises, and how to handle various representations of time.

* The API server is sometimes slow and sometimes buggy. Your front-end code
  should handle this gracefully.

* We like code that is clean and easily testable. We honestly don't always do
  a great job of this ourselves, so your ability to demonstrate this is a big
  plus.

* If you find this exercise too difficult or if you get stuck somewhere, feel
  free to talk to us. While we obviously prefer candidates who can hit the
  ground running, we're also willing to consider candidates who can, with
  some help, learn on the job.


Contact
-------
Feel free to [contact us](https://esper.com/contact) if you have any questions.

