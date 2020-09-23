/**
 * Example of how to create all existing models
 *  - Will start with a clear db in developmentmode
 */
module.exports = function (app, cb) {
  var models = Object.keys(app.models);

  if (process.env.NODE_ENV == 'development') {
    /* replace the existing tables */
    app.dataSources.mysqlDb.automigrate(models, function (err) {
      process.nextTick(cb);
    });
  }
  else {
    /* Only alter the existing tables */
    app.dataSources.mysqlDb.autoupdate(models, function (err) {
      if (err) throw err;

      process.nextTick(cb);
    });
  }
}
