var express = require('express');
var app = express();
var mongoose = require('mongoose');
var path = require('path');
var cookieParser = require('cookie-parser');
var passport =require('passport');
var session = require('express-session');
var explainer = require('./routes/kafkaProducer');
var renderRequest = require('./models/request');
var const_values=require('./common/properties');
var dynamictemplate = require('./models/dynamicTemplate');
var crudDatabase=require('./services/crudService');
var jwt = require('jsonwebtoken');
app.set('superSecret', 'library');
var multer=require('multer');
var fs = require('fs');
var constantApiUrls=require('./common/constantAPIUrls');
var debug = require('debug')('log4js-example');
var cluster = require('express-cluster');
var log4js = require('log4js');
var paymentRelatedFunctions=require('./routes/paymentRelatedMethod');
var reqId;
var flyerStatus;
var date = require('date-and-time');
log4js.configure('./config/log4js.json');
try {
  require('fs').mkdirSync('./log');
} catch (e) {
  if (e.code != 'EEXIST') {
    console.error("Could not set up log directory, error was: ", e);
    process.exit(1);
  }
}
app.use(log4js.connectLogger(log4js.getLogger("logger"), { level: 'auto' }));
var log = log4js.getLogger("main");
//session and cookie management middleware
app.use(cookieParser());
app.use(session({cookieName: 'session',secret: 'library'}));
require('./config/passport')(app);
app.all('*', function (req, res, next) {
 // add details of what is allowed in HTTP request headers to the response headers
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods',  'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Max-Age', '86400');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-AUTHENTICATION, X-IP, Content-Type, Origin, Accept, Cookie');
    // the next() function continues execution and will move onto the requested URL/URI
    next();
});
app.options('*', function (req, res) {
    res.sendStatus(200);
});
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit:100000}));
// rout
// var routes = require('./routes/index'); 
var authRouter = require(constantApiUrls.authRouteURL)();
var forgotPassword = require(constantApiUrls.forgotPasswordRouteURL);
// var templateCreation = require('./routes/templateCreation');
var update_dynamic_template = require(constantApiUrls.updateTemplateRouteURL);
var router = express.Router();
// define default control to check routes
app.use(constantApiUrls.authenticate, authRouter);
// app.use('/',routes);
// set view engine to ejs
app.set('view engine', 'ejs');
// static directory for css
app.use(express.static(path.join(__dirname + constantApiUrls.defaultViewFolder)));
// app.post('/updatetemplate',update_dynamic_template.updatetemplate);
// Default route
var templateDate;
var allTemplates;
var currenttemplateDetails;
var currentFileName = path.basename(__filename);
var adminFlayerId;
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
     
        cb(null, './public/video');
      
        
    },
    filename: function (req, file, cb) {
        cb(null, req.body.flayerId + '.' + file.mimetype.toString().split('/')[1]);
  }
});
var upload = multer({storage: storage});
app.use('/uploadFlayerImageVideo',upload.fields([
  {name:'flayerVideo', maxCount: 1}]), //upload files
function(req, res) 
{
  adminFlayerId=req.body.flayerId;
  console.log(req.body.flayerId);
});
var timexe = require('timexe');
var res1=timexe("* * * 0", function(){ 
  console.log("Its time again");
  crudDatabase.findAllRenderRequestsModel(function(result){

for(var i=0;i<result.length;i++){
var db_createdDate = new Date(JSON.parse(JSON.stringify(result[i].template)).createdDate);
var todayDate = new Date();
var timeDiff = Math.abs(todayDate.getTime() - db_createdDate.getTime());
var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
console.log(diffDays);

  if(diffDays >=30){
    
     crudDatabase.changeStatusOfSubscription(result[i]._id,function(result){
    
     });
  }
}

  })
});
app.post('/downloadGif',function(req,res)
{
  console.log("downloadGif");
  console.log(req.body.templateId);
  console.log(req.body.email);
  console.log(req.body.tempName);
  var now = new Date();
  reqId= req.session.Original_user_details_from_jwt_token+'_'+date.format(now, constantApiUrls.dateFormatWithSec);
  getImageFromUI(req,reqId);
  return new Promise(resolve => {
    var inPath =  __dirname + "/public/video/"  + req.body.templateId+".mp4";
  var contentPath = __dirname + "/public/flyerImages/"+reqId+ "/content.png";
  var outMp4Path = __dirname + "/public/flyerImages/"+ reqId+ "/"+reqId+".mp4";
  var paltePath = __dirname +  "/public/flyerImages/"+ reqId +"/palete.png";
  var outGifPath = __dirname +  "/public/flyerImages/"+reqId +"/"+req.body.tempName+".gif";
   var spawn = require('child_process').spawn;
             
  var prc=spawn('bash',['Generatevideo.sh',inPath,contentPath,outMp4Path,paltePath,outGifPath] );
                         
                          prc.stdout.setEncoding('utf8');
                          prc.stdout.on('data', function (data) {
console.log("#$#$#$#$#$#$#$#$##$$$$$$$$$$$$$$$$$$$$$$$#$#$##$#$#$#$#$");                                  
var str = data.toString()
                                  var lines = str.split(/(\r?\n)/g);
                                  
         
                          });
              prc.stderr.on('data', (data) => {
                console.log(`stderr: ${data}`);
                   
                
              });
  
               prc.on('close', function (code) {
                  console.log('process exit code ' + code);
                   fs.exists(outGifPath, function(exists) {
                                    if (exists) {
                                      console.log("file exist");
                                      console.log(outGifPath);
                                     
                                      res.send({json:"/flyerImages/"+reqId +"/"+req.body.tempName+".gif"});
                                    }
                                    else{
                                     console.log("Something went wrong");
                                    }
                                  })
        });
       
         
  console.log("after geting img from ui");
})
});
app.get('/subscribedId/:reqid', function(req, res){
  console.log('subscribe called');
  console.log(req.params.reqid);
  console.log(req.query.orderId);
  crudDatabase.findByReqIdInRenderRequestsModel(req.query.orderId,function(data)
  {
    if(data.length==0)
    {
      console.log("length null");
    }
    else
    {
      createSessionsByJWT(JSON.parse(JSON.stringify(data[0].user)).Email,req,res);
      console.log(JSON.parse(JSON.stringify(data[0].user)).Email);
      console.log(JSON.parse(JSON.stringify(data[0].template)).templateId);
      console.log(JSON.parse(JSON.stringify(data[0].template_name)));
      res.render('templates/subscribed',{fullurl:req.originalUrl,json:JSON.parse(JSON.stringify(data[0].template)).json,status:'saved',email:JSON.parse(JSON.stringify(data[0].user)).Email,defTemplateId:JSON.parse(JSON.stringify(data[0].template)).templateId,tempName:JSON.parse(JSON.stringify(data[0].template_name)),isSubscribed:JSON.parse(JSON.stringify(data[0].isSubscribed))});
    }
  })

})


app.get('/admin/createJson',function(req,res){
res.render('templates/adminFlyers',{id:req.query.flayer});
})
app.post('/admin/generateJSON',function(req,res){
    fs.writeFileSync(__dirname+'/views/pages/'+req.body.flyerId+'.json',req.body.json,{encoding:'utf8',flag:'w'});
json={"_id":req.body.flyerId,"TemplateName":req.body.name,"TemplateSubtitle":"CREATE YOUR "+req.body.name +"FLYER","TemplateRedirectFile" : "./templateImages/index.ejs","TemplateImage" : "./templateImages/"+req.body.flyerId+".png"};
   crudDatabase.createTemplate(json,function(err,savedData)
  {
res.json({success:"saved"});
  })
})
app.get('/downloadFile/:reqid', function(req, res){
 
  crudDatabase.findFlyerName(req.params.reqid,function(result){
    console.log((JSON.parse(JSON.stringify(result[0].template_name))));
    var file = __dirname + '/public/flyerImages/'+req.params.reqid+'/'+(JSON.parse(JSON.stringify(result[0].template_name)))+'.gif';
    console.log(file);
    fs.exists(file, function(exists) {
    if (exists) {
      res.download(file);
    }
    else{
      res.send("Something went wrong");
    }
  });
  });
  
  
});
app.post('/generateGif', function (req, res) {
  // runBot(req);
  console.log("doFileOperations");
  console.log(req.session);
  console.log(req.session.Original_user_details_from_jwt_token);
    var now = new Date();
  reqId= req.session.Original_user_details_from_jwt_token+'_'+date.format(now, constantApiUrls.dateFormatWithSec);
  getImageFromUI(req,reqId);
  console.log("after geting img from ui");
  var temp={'filledDetailsStatus':"true",json:JSON.parse(req.body.json),reqId:reqId,type:'flyer',templateId:req.body.templateId,createdDate:new Date()};
  crudDatabase.createRenderRequests(req.session.Original_user_details_from_jwt_token,temp,function(result)
                {
 res.json(result);                  
//console.log("result...."+result);
                })
 //res.send("Done");
});
app.post('/get/json/flyerJosn/',function(req,res){
 // console.log(req.body.id);
  id=req.body.id;
  var fs = require('fs');
var obj = JSON.parse(fs.readFileSync('views/pages/'+id+'.json', 'utf8'));
// console.log(obj);
 res.send({json:JSON.stringify(obj),status:''});
})
app.get(constantApiUrls.homePage, function(req, res) {
  log.debug('Redirect url'+' '+constantApiUrls.homePage+' '+'at'+' '+currentFileName);
  log.info("user loggedin");
  crudDatabase.getAllTemplates(function(data)
        {
          log.debug('successfully loggedin and redirect to url'+' '+constantApiUrls.homePageRouteURL +' '+'at'+currentFileName);
            templateDate=data;
    res.render(constantApiUrls.homePageRouteURL,{userLoggedIn:constantApiUrls.true,data});
        });
// }
});
// app.get('/get/flyer',function(req,res){   
//    res.render('index');
//   });
//delete templates
app.post(constantApiUrls.deleteTemplates,function(req,res)
{
  // log.info('Redirect url'+' '+constantApiUrls.deleteTemplates+' '+'at'+' '+currentFileName);
   log.debug('Redirect url'+' '+constantApiUrls.deleteTemplates+' '+'at'+' '+currentFileName);
  crudDatabase.deleteTemplate(req,function(data)
  {
    // data=allTemplates;
    // console.log(data);
    log.info("Deleted template successfully");
    log.debug('Deleted template successfully and redirect to url'+' '+constantApiUrls.displayAllTemplatesRouteURL +' '+'at'+' '+currentFileName);
     res.redirect(constantApiUrls.displayAllTemplatesRouteURL);
    // res.render(constantApiUrls.homePageRouteURL,{userLoggedIn:constantApiUrls.true,data});
  })
    // console.log(req.body.templateId);
    })
//Call for template creation dynamically ---api route name  /templateCreation
// })
app.all(constantApiUrls.createTemplateRouteURL,function(req,res)
{
  log.info('Redirect url'+' '+constantApiUrls.createTemplateRouteURL+' '+'at'+' '+currentFileName);
  log.debug('Redirect url'+' '+constantApiUrls.createTemplateRouteURL+' '+'at'+' '+currentFileName);
  // console.log(req.session.Original_user_details_from_jwt_token.role);
  // if(req.session.Original_user_details_from_jwt_token !=undefined)
  // {
    // log.info("user loggedin at "+constantApiUrls.createTemplateRouteURL);
  //   if(req.session.Original_user_details_from_jwt_token.role ==undefined || req.session.Original_user_details_from_jwt_token.role=='')
  // {
  //   log.info("user is not an admin");
  //   log.debug('user role is not admin and  redirect to url'+' '+constantApiUrls.indexPageRouteURL +' '+'at'+' '+currentFileName);
  //   res.render(constantApiUrls.indexPageRouteURL,{userLoggedIn:'',message:constantApiUrls.unauthorizedMessage});
  // }
  // else
  // {
    log.info("Admin get create template page");
     exports.templatePath=req.url;
     log.debug('user role is  admin and  redirect to url'+' '+constantApiUrls.createDynamicaTemplateRouteURL +' '+'at'+' '+currentFileName);
  res.render(constantApiUrls.createDynamicaTemplateRouteURL);
  // }
  // }
  // else
  // {
  //   // log.info("user not loggedin at "+constantApiUrls.createTemplateRouteURL);
  //   log.debug('user not loggedin  and  redirect to url'+' '+constantApiUrls.indexPageRouteURL +' '+'at'+' '+currentFileName);
  //    res.render(constantApiUrls.indexPageRouteURL,{userLoggedIn:'',message:constantApiUrls.unauthorizedMessage});
  // }
})
app.get(constantApiUrls.displayAllTemplatesRouteURL,function(req,res)
{
 exports.templatePath=req.url;
   crudDatabase.getAllTemplates(function(data)
        {
            // allTemplates=data;
            log.info("Admin get all templates");
            log.debug('user role is  admin and  redirect to url'+' '+constantApiUrls.getAllTemplatesRouteURL +' '+'at'+' '+currentFileName);
    res.render(constantApiUrls.getAllTemplatesRouteURL,{data});
        });
        })

// About route
app.post(constantApiUrls.getForgotPasswordURL, forgotPassword.forgot_password);
app.get(constantApiUrls.sucessPageURL, function(req, res){
  // log.info('Redirect url'+' '+constantApiUrls.sucessPageURL+' '+'at'+' '+currentFileName);
  log.debug('Redirect url'+' '+constantApiUrls.sucessPageURL+' '+'at'+' '+currentFileName);
  if(!req.session.Original_user_details_from_jwt_token)
{
  log.info("Unfortunately logout while submitting filled form data");
  log.debug('user not loggedin  and  redirect to url'+' '+constantApiUrls.indexPageRouteURL +' '+'at'+' '+currentFileName);
    res.render(constantApiUrls.indexPageRouteURL,{userLoggedIn:constantApiUrls.false,message:''});
}
else
{
  log.info('Form data submitted successfully');
  log.debug('user submitted template data successfully and redirect to url'+' '+constantApiUrls.successPageRouteURL +' '+'at'+' '+currentFileName);
  res.render(constantApiUrls.successPageRouteURL);
}
});
// Status route
// app.get(constantApiUrls.statusURL, function(req, res){
//   var status =constantApiUrls.statusMsg;
//   res.render(constantApiUrls.statusPageURL, {status:status});
// });
// Default route
app.get(constantApiUrls.addTemplatesDataIntoDBThroughJSONFile,function(req,res)
{
  console.log("addTemplatesDataIntoDBThroughJSONFile");
  fs.readFile(constantApiUrls.dynamicTemplatesDataJSONFileLocation, 'utf8', function (err, data) {
    if (err) {
      log.error('Error at extract data fron JSON file :'+' '+err);
    }
    else
    {
      var json = JSON.parse(data);
      for(var i=0;i<json.length;i++)
      {
        crudDatabase.createTemplate(json[i],function(err,savedData)
      {
        if(err){console.log("error is:"+err)}
        else{
             console.log("savedData")
        }
      });
      }
      res.redirect(constantApiUrls.homePage);
    }
  })
});
// Template route
var template_data;
app.get('/getStatus',function(req,res){
console.log('get status called');
createSessionsByJWT(req.query.Email,req,res,req,res);
console.log(req.protocol + '://' + req.get('host') + req.originalUrl);
  var templateId=req.query.tempId;
            var emailId=req.query.Email;
console.log(templateId+','+emailId);
console.log(req.session.Original_user_details_from_jwt_token);
          crudDatabase.findRenderRequestBasedOnEmailAndTemplateId(templateId,emailId,function(result){
              if(result.length==0){
                res.json({ status:"false"});
              }
              else{
                res.json({"templateId":JSON.parse(JSON.stringify((result[0].template))).templateId,"Email":JSON.parse(JSON.stringify((result[0].user))).Email,status: JSON.parse(JSON.stringify((result[0].template))).filledDetailsStatus });
              }
            });
})
app.get(constantApiUrls.templateURLId, function(req, res) {
  console.log(req.protocol + '://' + req.get('host') + req.originalUrl);
  if(req.query.orderId!=undefined){
    console.log(req.params.id);
  console.log(req.query.Email);
createSessionsByJWT(req.query.Email,req,res,req,res);
  console.log(req.query.orderId);
console.log(req.session.Original_user_details_from_jwt_token);
    crudDatabase.findRenderRequestBasedOnEmailAndTemplateId(req.params.id,req.query.Email,function(result){
      if(result.length==0){
        console.log("length zero");
      }
      else{
        var template=JSON.parse(JSON.stringify(result));
        // console.log('@@@@@@@@@....'+JSON.stringify(template));
        crudDatabase.findTemplateDetails(req.params.id,function(tempResult){

          var dynamicFlyerDbDetails=JSON.parse(JSON.stringify(tempResult));
          // console.log('$$$$$$$..'+dynamicFlyerDbDetails[0].TemplateName);
       
        crudDatabase.findRenderRequestBasedOnEmailAndTemplateIdupdateOrderid(result[0]._id,req.query.orderId,dynamicFlyerDbDetails,function(result){
          if(result.length==0){
          }
          else{
               var template=JSON.parse(JSON.stringify(result.template));
              console.log(req.session);
 console.log("session");
                if(template.type=="flyer"){
                  runBot(template.templateId,req.session.Original_user_details_from_jwt_token,template.reqId,dynamicFlyerDbDetails[0].TemplateName,req.query.orderId);
                }
                else{
                template['orderId']=req.query.orderId;
                template['render_status']='ready';
                template['AEP_file']=currenttemplateDetails.TemplateAEPFile;
                template['template_name']=currenttemplateDetails.TemplateName;
                template[constantApiUrls.output]=constantApiUrls.generatedVedioPath+req_id;
                template[constantApiUrls.module]=constantApiUrls.videoRender;
                explainer.sendProductExplainerJson("formJson", JSON.stringify(template),0);
                }
          }
        });
      })

      }
    });
  }
  else{
  var templateId=req.params.id;
  var emailId=req.query.Email;
  console.log("else");
  console.log(req.params.id);
  if(req.params.id!='favicon.ico'){
  crudDatabase.findRenderRequestBasedOnEmailAndTemplateId(templateId,emailId,function(result){
    if(result.length==0){
      crudDatabase.findTemplateDataBasedOnTemplateId(req.params.id,function(result){
        if(result.length==0){
          console.log(" findRenderRequestBasedOnEmailAndTemplateId length zero");
        }
        else{
          console.log(" findRenderRequestBasedOnEmailAndTemplateId length not equal zero");
          flyerStatus='';
          currenttemplateDetails=JSON.parse(JSON.stringify(result[0]));
          exports.templateDetails=JSON.parse(JSON.stringify(result[0]));
          createSessionsByJWT(req.query.Email,req,res);
          res.render(constantApiUrls.templatesLocation+JSON.parse(JSON.stringify(result[0])).TemplateRedirectFile.toString().split('/')[2].replace(/\..+$/, ''),{userLoggedIn:constantApiUrls.true,elem:'',fullurl:req.originalUrl,data:'',buyMsg:'',json:'',status:flyerStatus});
 }
      });
    }
    else{
      
      var renderData=JSON.parse(JSON.stringify((result[0].template)));
      console.log("renderData.."+renderData);
      crudDatabase.findTemplateDataBasedOnTemplateId(JSON.parse(JSON.stringify(result[0])).template.templateId,function(result){
        if(result.length==0){
          console.log("Length is zero");
        }
        else{
          console.log(JSON.parse(JSON.stringify(renderData)).type);
          if(JSON.parse(JSON.stringify(renderData)).type=='flyer'){
             createSessionsByJWT(req.query.Email,req,res);
            flyerStatus='saved';
            res.render(constantApiUrls.templatesLocation+JSON.parse(JSON.stringify(result[0])).TemplateRedirectFile.toString().split('/')[2].replace(/\..+$/, ''),{userLoggedIn
:constantApiUrls.true,elem:'',fullurl:req.originalUrl,data:renderData,buyMsg:'Please click on buy',json:JSON.parse(JSON.stringify(renderData)).json,status:flyerStatus});
          }
          else{
            currenttemplateDetails=JSON.parse(JSON.stringify(result[0]));
          exports.templateDetails=JSON.parse(JSON.stringify(result[0]));res.render(constantApiUrls.templatesLocation+JSON.parse(JSON.stringify(result[0])).TemplateRedirectFile.toString().split('/')[2].replace(/\..+$/, ''),{userLoggedIn:constantApiUrls.true,elem:'',fullurl:req.originalUrl,data:renderData,buyMsg:'Please click on buy'});
          }
        }
      });
      }
  });
}
}
  var latestId;
});
app.post(constantApiUrls.logout, function(req, res){
 Original_user_details_from_jwt_token='';
 req.session.Original_user_details_from_jwt_token='';
 log.info('User loggedOut successfully');
 log.debug('User loggedOut successfully and redirect to url'+' '+constantApiUrls.homePage+' '+'at'+' '+currentFileName);
  res.redirect(constantApiUrls.homePage);
});
app.use(constantApiUrls.updateTemplate, update_dynamic_template);
app.use('/:name/', require(constantApiUrls.filePathOfPrepare));
// app.use('/slideshow', require('./routes/slideshow'));
app.use(constantApiUrls.createDynamicTemplate, require(constantApiUrls.createDynamicTemplaterouteURL));

// server creation
var server = app.listen(const_values.base_port_number, function(){
  var host = const_values.base_url;
  var port = server.address().port;
  var db = require('./services/dbService').getDb();
  log.info('Server running under host address and port no');
log.debug('Server runs under host address'+' '+host+' '+'port number'+' '+port+' '+'at'+' '+currentFileName);
  console.log('Listening at http://%s',host);
});
module.exports.template_data = template_data;
//code for payumoney paymentgateway
 app.all('/txnsuccess', function(req, res)
 {
    crudDatabase.findByReqIdInRenderRequestsModel(res.req.body.txnid,function(data)
    {
      if(data.length==0)
      {
        console.log("length null");
      }
      else
      {
        var userDetails=paymentRelatedFunctions.getUserDetailsFromRenderRequestSchema(data[0].user);
        var templateDetails=paymentRelatedFunctions.getTemplateDetailsFromRenderRequestSchema(data[0].template);
        crudDatabase.findByIdAndUpdateInRenderRequestsModel(data[0]._id,res,'ready',template_data,function(data)
        {
              var completeTemplateDetails=paymentRelatedFunctions.addPaymentDetailsToJson(templateDetails,res,'ready',template_data);
              explainer.sendProductExplainerJson("formJson", JSON.stringify(completeTemplateDetails),0);


         pushnotifications.pushnotifications(userDetails.Id_for_notifiations,'Payment was done successfully you will get your video soon');
               emailService.sendMail(userDetails.email,'Notification','Notification from thechitrakars.com','Payment was done successfully you will get your video soon','Payment status');
              res.render('pages/successpage');
            });
      }
    })
// 
})
app.all('/txnfail', function(req, res)
{
  // console.log(template_data.TemplateAEPFile);
  // console.log(res.req.body.status);
   // console.log("productinfo:"+res.req.body.productinfo);
   crudDatabase.findByReqIdInRenderRequestsModel(res.req.body.txnid,function(data)
        {
            // console.log(result);
            if(data.length==0)
      {
        console.log("length null");
      }
      else
      {
        var userDetails=paymentRelatedFunctions.getUserDetailsFromRenderRequestSchema(data[0].user);
        var templateDetails=paymentRelatedFunctions.getTemplateDetailsFromRenderRequestSchema(data[0].template);
        // console.log(userDeatils);
        crudDatabase.findByIdAndUpdateInRenderRequestsModel(data[0]._id,res,'unready',template_data,function(data)
        {
          var completeTemplateDetails=paymentRelatedFunctions.addPaymentDetailsToJson(templateDetails,res,'unready',template_data);
          explainer.sendProductExplainerJson("formJson", JSON.stringify(completeTemplateDetails),0);
          pushnotifications.pushnotifications(userDetails.Id_for_notifiations,'Payment was failed');
          emailService.sendMail(userDetails.email,'Notification','Notification from thechitrakars.com','Payment was failed','Payment status');
          res.render('templates/'+template_data.TemplateRedirectFile.toString().split('/')[2].replace(/\..+$/, ''),{elem:template_data});
        })
      }
        });

        })
function createSessionsByJWT(results,req,res)
{
console.log('createSessionsByJWT function called');
        var payload = {
                                                                                        user: results
                                                                                        }
                                                        token = jwt.sign(payload, app.get(constantApiUrls.jWTSecretKey), {
                                                                // expiresIn: 86400 // expires in 24 hours
                                                        });
                                                        // authRoutesLog.debug('jwt token created at createSessionsByJWT function');
                                                        jwt.verify(token, app.get(constantApiUrls.jWTSecretKey), function(err, decoded)
                                            {
                                                if (err)
                                                {
                                                        // authRoutesLog.error('error at createSessionsByJWT function:'+err);
                                                    return res.json({ success: false, message: constantApiUrls.faildAuthenticationMsg });
                                                }
                                                else
                                                {
                                                        // authRoutesLog.debug('Put userdeatils in session at createSessionsByJWT function:'+err);
                   Original_user_details_from_jwt_token=decoded.user;
console.log(decoded.user);
                            req.session.Original_user_details_from_jwt_token = decoded.user;
console.log(decoded.user);
//req.sessioncookie.Original_user_details_from_jwt_token=decoded.user;
//console.log(req.sessioncookie.Original_user_details_from_jwt_token);
console.log(req.session.Original_user_details_from_jwt_token);
                            console.log(req.session);
                                                }
                                            });
                                            // authRoutesLog.debug('redirect to:'+constantApiUrls.authProfileRouteURL);
                                                                // res.redirect(constantApiUrls.authProfileRouteURL);
}
function getImageFromUI(req,reqId){
console.log(reqId);
  if (!fs.existsSync("./public/flyerImages/"+reqId))
  {
      fs.mkdirSync("./public/flyerImages/"+reqId);
      // fs.mkdirSync("./public/flyerImages/"+reqId);
      console.log("created dir");
//  console.log(req.body.pngUrl);
  var base64Data = req.body.pngUrl.replace(/^data:image\/png;base64,/, "");
  require("fs").writeFileSync("./public/flyerImages/"+reqId +"/content.png", base64Data, 'base64', function (err) {
    console.log(err);
   res.send("error");
  });
}
}
function runBot(defTempId,emailId,flayerReqId,flayerName,orderId){
  return new Promise(resolve => {
  var inPath =  __dirname + "/public/video/"  + defTempId+".mp4";
var contentPath = __dirname + "/public/flyerImages/"+flayerReqId+ "/content.png";
var outMp4Path = __dirname + "/public/flyerImages/"+ flayerReqId+ "/"+flayerReqId+".mp4";
var paltePath = __dirname +  "/public/flyerImages/"+ flayerReqId +"/palete.png";
var outGifPath = __dirname +  "/public/flyerImages/"+flayerReqId +"/"+flayerName+".gif";
console.log("emmmmail");
console.log(emailId);
 var spawn = require('child_process').spawn;
            console.log(__dirname + '/Generatevideo.bat');
                        // var prc = spawn(__dirname + '\\Generatevideo.bat',  [inPath,contentPath,outMp4Path,paltePath,outGifPath] );
 var prc=spawn('bash',['Generatevideo.sh',inPath,contentPath,outMp4Path,paltePath,outGifPath] );
                        //noinspection JSUnresolvedFunction
                        prc.stdout.setEncoding('utf8');
                        prc.stdout.on('data', function (data) {
                                var str = data.toString()
                                var lines = str.split(/(\r?\n)/g);
        console.log(lines.join(""));
        console.log(emailId);
console.log("email");
                        });
            prc.stderr.on('data', (data) => {
              console.log(`stderr: ${data}`);
              
            });

             prc.on('close', function (code) {
                console.log('process exit code ' + code);
      });
       var mailer = require("nodemailer");
                var smtpTransport = mailer.createTransport({
                  
                  service:"Gmail",
                  auth:{
                        user: "info.videoinaclick@gmail.com",
                        pass:"vide0inaclick"
                     },
                     tls: {
                      rejectUnauthorized: false
                  }
                });
                var mail = {
                  from:"support@thechitrakars.com",
                  to:emailId,
                  subject: "Download Your Business Ad",
                  text: "Business Ad",
                  html:'<p>Congratulations! For taking a step forward towards boosting your sales.</p><p>You are close to Bridge the gap between your promotion and your customers.</p><p>All you have to do is download your Business Ad from the links below:<p>1) Get your Business Ad from <a href="http://'+const_values.base_url+'/downloadFile/' + flayerReqId + '">here</a></p><p>2) Make Unlimited Revisions <a href="http://'+const_values.base_url+'/subscribedId/' + flayerReqId +'?orderId='+orderId+ '">here</a> and download it free of cost for 30 days.</p><p>Propagate through various digital mediums like WhatsApp, Facebook,Email..etc., for your Business Ads to prosper.</p><p>Thank you for connecting with us. Please click <a href="www.videoinaclick.com">here</a> for other Business Ads.</p><p>We would love to serve you again, wishing you all the best for your venture.</p>',
                 
              }
              smtpTransport.sendMail(mail, function(error, response){
                if(error){
                  emailServiceLog.error('Error at sendEmail function:'+error);
                        console.log(error);
                    }else{
                      emailServiceLog.debug('Mail sent to:'+emailId);
                           console.log("Message sent to: " + emailId);
                      }
                       smtpTransport.close();
              });
     
})
}
