module.exports = function (app) {
  var Role = app.models.Role;

  /* =========================================================================
    JOB OWNER
  ========================================================================= */
  Role.registerResolver('jobOwner', function (role, context, cb) {
    function reject() {
      process.nextTick(function () {
        cb(null, false);
      });
    }

    /* When the model about to access is the Job model only */
    if (context.modelName !== 'Job') { return reject(); }
    var Job = context.model;

    /* Reject anonymous users */
    var userId = context.accessToken.userId;
    if (!userId) {
      return reject();
    }

    /* Fetch the corresponding Job */
    Job.findById(context.modelId, function (err, dbJob) {
      if (err || !dbJob) {
        return reject();
      }

      /* Fetch the corresponding Company */
      dbJob.company(function (err, dbCompany) {
        if (err || !dbCompany) {
          return reject();
        }

        /* If we're a manager of that company, we are considered a 'JobOwner' */
        dbCompany.managers.findById(userId, function (err, result) {
          if (err || !result) {
            return reject();
          }
          return cb(null, true);
        });
      });
    });
  }); /* jobOwner */
};
