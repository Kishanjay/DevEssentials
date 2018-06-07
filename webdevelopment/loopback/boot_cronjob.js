var schedule = require('node-schedule');

module.exports = function (app) {
  var Company = app.models.Company;

  // AT 03:00 every day.
  var j = schedule.scheduleJob("* * 3 * * *", function(){
    console.log("Automated account checker activated");
  });
}
