var const_values=require('../common/properties');
var uristring = 'mongodb://'+const_values.base_url+':'+const_values.mongodb_port+'/'+const_values.mongodb_name;
module.exports = {

    'secret': 'thechitrakars',
    'database': uristring

};