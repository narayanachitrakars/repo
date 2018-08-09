var mongoose = require('mongoose');
var SchemaObject = mongoose.Schema;
var schema=new SchemaObject(SchemaObject.Types.Mixed, {strict: false});
var model = mongoose.model('dynamictemplates', schema);
module.exports = {model: model, schema: schema};