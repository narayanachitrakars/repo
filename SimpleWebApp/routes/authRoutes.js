var express = require('express');
var authRouter = express.Router();
// var passport = require('passport');
// var user = require('../models/userdetail');
var crudService=require('../services/crudService');
var jwt = require('jsonwebtoken'); 
var app = express();
app.set('superSecret', 'library');
var constantApiUrls=require('../common/constantAPIUrls');
var path = require('path');
var authRoutesLog = require('log4js').getLogger("authRoutes");
//code for router
var router = function() {
	 var scriptName = path.basename(__filename);
// console.log(scriptName);
authRouter.route('/signUp')
		.post(function(req,res)
		{
			authRoutesLog.debug('authRouter signUp called');
			// crudService.user_save(req,res);
			crudService.insertUser(req,function(results,dataLength)
				{
					if(dataLength==0)
					{
						createSessionsByJWT(results,req,res);
					}
					else
					{
						authRoutesLog.debug('Send message to'+' '+constantApiUrls.indexPageRouteURL+' '+'as user already exist');
						res.render(constantApiUrls.indexPageRouteURL,{userLoggedIn:'',message:constantApiUrls.userExistStatus});
					}
				});
			
		});

authRouter.route(constantApiUrls.signInRouteURL)
		.post(function(req, res){
			authRoutesLog.debug('authRouter signIn called');
			// console.log("authRoutes::signIn- request user: "+ req.body.email);
			 // user.model.find({ email:req.body.email,password:req.body.password}).
			 crudService.getUser(req.body.email,function(results,dataLength)
			 {
			 	if(dataLength!=0)
			 	{
			 		// console.log(JSON.parse(JSON.stringify(results))[0].password);
							if(JSON.parse(JSON.stringify(results))[0].password==req.body.password)
							{
								createSessionsByJWT(results[0],req,res);
					
							}
							else
							{
								authRoutesLog.debug('Send message to'+' '+constantApiUrls.indexPageRouteURL+' '+'as password is incorrect');
							res.render(constantApiUrls.indexPageRouteURL, {userLoggedIn:'',message:constantApiUrls.passwordIncorrect});	
							}
			 	}
			 	else
						{
							authRoutesLog.debug('Send message to'+' '+constantApiUrls.indexPageRouteURL+' '+'as you are not registered');
							 res.render(constantApiUrls.indexPageRouteURL, {userLoggedIn:'',message:constantApiUrls.userNotRegisterMsg});

						}

			 })
			 
		});

authRouter.route(constantApiUrls.profileRouteURL)
		.all(function(req, res, next){
			authRoutesLog.debug(constantApiUrls.profileRouteURL +'called and redirect to:'+constantApiUrls.homePage);
			// console.log("requested user: "+token);
			// console.log("authRoutes::profile- request method: "+ Original_user_details_from_jwt_token);
			// req.session.Original_user_details_from_jwt_token= Original_user_details_from_jwt_token;
					res.redirect(constantApiUrls.homePage);
			})
			.get(function(req, res){
					res.redirect(constantApiUrls.createObject);
			});
	return authRouter;
};

function createSessionsByJWT(results,req,res)
{
	authRoutesLog.debug('createSessionsByJWT function called');
	var payload = {
											user: results	
											}
							token = jwt.sign(payload, app.get(constantApiUrls.jWTSecretKey), {
								// expiresIn: 86400 // expires in 24 hours
							});
							authRoutesLog.debug('jwt token created at createSessionsByJWT function');
							jwt.verify(token, app.get(constantApiUrls.jWTSecretKey), function(err, decoded)
				            {      
				                if (err)
				                {
				                	authRoutesLog.error('error at createSessionsByJWT function:'+err);
				                    return res.json({ success: false, message: constantApiUrls.faildAuthenticationMsg });    
				                }
				                else
				                {
				                	authRoutesLog.debug('Put userdeatils in session at createSessionsByJWT function:'+err);
				                    Original_user_details_from_jwt_token=decoded.user;
				                    req.session.Original_user_details_from_jwt_token = Original_user_details_from_jwt_token;
				                }
				            });
				            authRoutesLog.debug('redirect to:'+constantApiUrls.authProfileRouteURL);
								res.redirect(constantApiUrls.authProfileRouteURL);
}
module.exports = router;