var loopback = require('loopback');

module.exports = function (Model) {
  var RouteHelper = {};

  /* ===========================================================================
    API CHANGING ROUTES (PERMISSIONS AND DESCRIPTION)
  =========================================================================== */


  /**
   * Besides changing the ACL it would be nice to quickly see in the Swagger API
   * explorer what permissions every route requires.
   *
   * Now this functionality is not finalized because of the way loopback finds
   * the methods.
   *    https://github.com/strongloop/loopback/issues/2353
   */
  var addDescription = function (methodName, append) {
    var method = Model.sharedClass.findMethodByName(methodName);
    if (!method) {
      // console.log("WARNING[addDescription@_routeHelper]: Method '" + methodName + "' not found");
      return;
    }
    method.description = method.description + " " + append;
  };

  /**
   * Dynamically setup the ACL for a Model
   */
  var setACL = function (methodName, accessUser) {
    var property = methodNameToProperty(methodName);

    loopback.configureModel(Model, {
      dataSource: Model.dataSource,
      acls: [
        {
          accessType: 'EXECUTE',
          principalType: 'ROLE',
          principalId: accessUser,
          permission: 'ALLOW',
          property: property,
        },
      ],
    });
  }

  /**
   * The methodNames are not always the same as the properties
   *  (properties are needed to access the ACL of a route)
   */
  var methodNameToProperty = function (methodName) {
    switch (methodName) {
      case 'prototype.updateAttributes':
        return 'patchAttributes';
    }

    return methodName.replace('prototype.', '');
  }

  RouteHelper.admin = function (methodName) {
    // setACL(methodName, '$admin'); /* can already do everything.. */
    addDescription(methodName, '[ADMIN]');
  }

  RouteHelper.public = function (methodName) {
    setACL(methodName, '$everyone');
    addDescription(methodName, '[PUBLIC]');
  }

  RouteHelper.debug = function (methodName) {
    console.log("DEBUG MODE: " + methodName);
    setACL(methodName, '$everyone');
    addDescription(methodName, '[DEBUG]');
  }

  RouteHelper.user = function (methodName) {
    setACL(methodName, '$authenticated');
    addDescription(methodName, '[USER]');
  }

  RouteHelper.custom = function (methodName, acl, description) {
    setACL(methodName, acl);
    addDescription(methodName, description);
  }

  RouteHelper.disable = function (methodName) {
    addDescription(methodName, '[DISABLED]');
    Model.disableRemoteMethodByName(methodName);
  }

  /* ===========================================================================
    API EXPOSING ROUTES
      Use these methods to quickly disable
      all the routes that are enables by default.

    USEFULL SNIPPET:
    YourModel.sharedClass.methods().forEach(function(method) {
      YourModel.disableRemoteMethod(method.name, method.isStatic);
    });
  =========================================================================== */
  RouteHelper.disableBelongsTo = function (targetModel) {
    RouteHelper.disable('prototype.__get__' + targetModel);
  }
  /**
  * DISABLES THESE ROUTES:
  *
  * GET /<Model>/{id}/<targetModel>
  * PUT /<Model>/{id}/<targetModel>
  * POST /<Model>/{id}/<targetModel>
  * DELETE /<Model>/{id}/<targetModel>
  */
  RouteHelper.disableHasOne = function (targetModel) {
    /*
    * Queries <targetModel> of Model.
    * GET /<models>/{id}/<targetModels>
    */
    RouteHelper.disable('prototype.__get__' + targetModel);

    /*
    * Creates a new instance in <targetModels> of this model.
    * POST /<models>/{id}/<targetModels>
    */
    RouteHelper.disable('prototype.__create__' + targetModel);

    /*
    * Update <targetModels> of this model.
    * PUT /<models>/{id}/<targetModels>
    */
    RouteHelper.disable('prototype.__update__' + targetModel);

    /*
    * Deletes <targetModels> of this model.
    * DELETE /<models>/{id}/<targetModels>
    */
    RouteHelper.disable('prototype.__destroy__' + targetModel);
  }

  /**
  * DISABLES THESE ROUTES:
  *
  * GET /<Model>/{id}/<targetModel>
  * POST /<Model>/{id}/<targetModel>
  * DELETE /<Model>/{id}/<targetModel>
  * GET /<Model>/{id}/<targetModel>/{fk}
  * PUT /<Model>/{id}/<targetModel>/{fk}
  * DELETE /<Model>/{id}/<targetModel>/{fk}
  */
  RouteHelper.disableHasMany = function (targetModel) {
    /* GET /<models>/{id}/<targetModels>/count */
    RouteHelper.disable('prototype.__count__' + targetModel);

    /* GET /<models>/{id}/<targetModels> */
    RouteHelper.disable('prototype.__get__' + targetModel);

    /* POST /<models>/{id}/<targetModels> */
    RouteHelper.disable('prototype.__create__' + targetModel);

    /* PUT /<models>/{id}/<targetModels> */
    RouteHelper.disable('prototype.__update__' + targetModel);

    /* DELETE /<models>/{id}/<targetModels> */
    RouteHelper.disable('prototype.__delete__' + targetModel);

    /* GET /<models>/{id}/<targetModels>/{fk} */
    RouteHelper.disable('prototype.__findById__' + targetModel);

    /* PUT /<models>/{id}/<targetModels>/{fk} */
    RouteHelper.disable('prototype.__updateById__' + targetModel);

    /* DELETE /<models>/{id}/<targetModels>/{fk} */
    RouteHelper.disable('prototype.__destroyById__' + targetModel);
  }

  /**
  * DISABLES THESE ROUTES:
  *
  * GET /<Model>/{id}/<targetModel>
  * POST /<Model>/{id}/<targetModel>
  * DELETE /<Model>/{id}/<targetModel>
  * GET /<Model>/{id}/<targetModel>/{fk}
  * PUT /<Model>/{id}/<targetModel>/{fk}
  * DELETE /<Model>/{id}/<targetModel>/{fk}
  * GET /<Model>/{id}/<targetModel>/count
  * HEAD /<Model>/{id}/<targetModel>/rel/{fk}
  * PUT /<Model>/{id}/<targetModel>/rel/{fk}
  */
  RouteHelper.disableHasManyThrough = function (targetModel) {
    RouteHelper.disableHasMany(targetModel);
    /* HEAD /<models>/{id}/<targetModels>/rel/{fk} */
    RouteHelper.disable('prototype.__exists__' + targetModel);

    /* PUT /<models>/{id}/<targetModels>/rel/{fk} */
    RouteHelper.disable('prototype.__link__' + targetModel);

    /* DELETE /<models>/{id}/<targetModels>/rel/{fk} */
    RouteHelper.disable('prototype.__unlink__' + targetModel);
  }



  RouteHelper.disableBasis = function () {
    /* ===================================================================================================================
      /<models> routes
    =========================================================================== */
    /* PATCH
    * Patch an existing model instance or insert a new one into the data source. */
    RouteHelper.disable('upsert');

    /* GET
    * Find all instances of the model matched by filter from the data source. */
    RouteHelper.disable('find');

    /* PUT
    * Replace an existing model instance or insert a new one into the data source. */
    RouteHelper.disable('updateAll');

    /* POST
    * Create a new instance of the model and persist it into the data source. */
    RouteHelper.disable('create');

    /* ===========================================================================
      /<models>/{id} routes
    =========================================================================== */
    /* PATCH
    * Patch attributes for a model instance and persist it into the data source. */
    RouteHelper.disable('prototype.updateAttributes');

    /* GET
    * Find a model instance by {{id}} from the data source. */
    RouteHelper.disable('findById');

    /* PUT
    * Replace attributes for a model instance and persist it into the data source. */
    RouteHelper.disable('replaceById');

    /* DELETE
    * Delete a model instance by {{id}} from the data source. */
    RouteHelper.disable('deleteById');

    /* ===========================================================================
      /<models> other routes
    =========================================================================== */
    /*
    * Count instances of the model matched by where from the data source.
    * GET /<models>/count
    */
    RouteHelper.disable('count');

    /*
    * Find first instance of the model matched by filter from the data source.
    * GET /<models>/findOne
    */
    RouteHelper.disable('findOne');

    /*
    * Replace an existing model instance or insert a new one into the data source.
    * POST /<models>/replaceOrCreate
    */
    RouteHelper.disable('replaceOrCreate');

    /*
    * Check whether a model instance exists in the data source.
    * HEAD /<models>/{id}
    * GET /<models>/{id}/exists
    */
    RouteHelper.disable('exists');

    /*
    * Create a change stream.
    * GET /<models>/change-stream
    * POST /<models>/change-stream
    */
    RouteHelper.disable('createChangeStream');

    /*
    * Update an existing model instance or insert a new one into the data source based on the where criteria
    * POST /<models>/upsertWithWhere
    */
    RouteHelper.disable('upsertWithWhere');



  }

  return RouteHelper;
}
