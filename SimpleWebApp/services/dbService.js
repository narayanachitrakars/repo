// var express = require('express');
// var app=express();
// var log4js = require('log4js');
// app.use(log4js.connectLogger(log4js.getLogger("debug"), { level: 'auto' }));
var mongoose = require('mongoose');
var const_values=require('../common/properties');
var uristring = 'mongodb://'+const_values.mongodb_host+':'+const_values.mongodb_port+'/'+const_values.mongodb_name;
var _db;
dbServiceLog = require('log4js').getLogger("dbService");

module.exports = {
  connectToServer: function( callback ) {
    dbServiceLog.debug('connectToServer functon called');
    _db = mongoose.connect(uristring, function (err, res) {
      if (err) {
        dbServiceLog.error('ERROR connecting to: ' + uristring + '. ' + err);
      console.log ('ERROR connecting to: ' + uristring + '. ' + err);
      } else {
        dbServiceLog.debug('Success- connected to: ' + uristring);
      console.log ('Success- connected to: ' + uristring);
      }
   });
  },

  getDb: function() {
    dbServiceLog.debug('getDb function called');
    if(_db == null){
     dbServiceLog.debug('connectToServer function called inside getDb function'); 
     this.connectToServer(); 
    }
    return _db;
  }
};