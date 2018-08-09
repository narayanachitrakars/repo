var mongoose = require('mongoose');
var SchemaObject = mongoose.Schema;

//Create Template Schema
// var schema = new SchemaObject({
// 	characterName: {type: String},
// 	characterProfession: String,
// 	problemStatement: String,
// 	exploredOption1: String,
// 	exploredOption2: String,
// 	exploredOption3: String,
// 	productName: String,
// 	productLogo: String,
// 	solutionOffered: String,
// 	keyFeature1: String,
// 	keyFeature2: String,
// 	keyFeature3: String,
// 	keyFeature4: String,
// 	screen1: String,
// 	screen2: String,
// 	screen3: String,
// 	screen1Text: String,
// 	screen2Text: String,
// 	screen3Text: String,
// 	benefit1: String,
// 	benefit2: String,
// 	benefit3: String,
// 	contactDetails: String,
// 	website: String,
// 	slogan: String,
// 	render_status: String,
//     output: String,
//     module: String,
//     target:String,
// 	ID: String
// }, {_id: false});
var schema=new SchemaObject(SchemaObject.Types.Mixed, {strict: false});

var model = mongoose.model('Template', schema);
module.exports = {model: model, schema: schema};