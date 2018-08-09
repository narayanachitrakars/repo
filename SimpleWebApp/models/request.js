var mongoose = require('mongoose');
var SchemaObject = mongoose.Schema;
var template=require('./template1');
var user=require('./userdetail');

//var template = new templateModel();

//Create Schema
var schema = new SchemaObject({
user: user.schema,
template: template.schema,
paymentId:String,
payment_status:String,
render_status:String,
AEP_file:String,
template_name:String,
orderId:String,
isSubscribed:Boolean
});

var model = mongoose.model('renderrequests', schema);

module.exports = {model: model, schema: schema};

