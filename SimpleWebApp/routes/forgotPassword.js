var express = require('express');
var getPassword = require('../services/crudService');
var emailService=require('../services/emailService');
var constantApiUrls=require('../common/constantAPIUrls');
var path = require('path');
var forgotpasswordLog = require('log4js').getLogger("forgotpassword");
module.exports = 
{
	forgot_password:function (req,res)
	{
		// console.log(log);
		forgotpasswordLog.debug('forgot_password called');
	// console.log(arguments.callee.toString());
	 console.log('forgot_password called');
      var scriptName = path.basename(__filename);
// console.log(scriptName);
      var user_email=req.body.email;
   
			 	getPassword.getPassword(user_email,function(data)
			 	{
			 		if(data.length==0)
		        {
		        	// console.log("Please enter correct eamil");
		        	forgotpasswordLog.debug("Sent error message as:enter correct emailid");
					res.send(constantApiUrls.enterCorrectEmailId);
				}
		        else
		        {
		        	forgotpasswordLog.debug("Sent password to mail");
		        	var user_data=JSON.stringify(data);
		        	var parse_data = JSON.parse(user_data);
		        	var email=parse_data[0].email;
		        	emailService.sendMail(email,constantApiUrls.passwordTitle,constantApiUrls.passwordSubject,parse_data[0].password,constantApiUrls.passwordSentense);
		        	res.send(constantApiUrls.checkYourMailAndLogin);
		  
		        }
			 	})
				
	}		
}
