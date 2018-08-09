var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
SchemaObject=mongoose.Schema;
var schema=new SchemaObject(SchemaObject.Types.Mixed, {strict: false});
var model = mongoose.model('users', schema)
module.exports = {model: model, schema: schema};
