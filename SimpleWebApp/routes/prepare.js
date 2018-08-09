var express = require('express');
var explainer = require('./kafkaProducer');
var user = require('../models/userdetail');
var renderRequest=require('../services/crudService');
// var crudDatabase=require('../services/crudService');
var pushnotifications=require('../services/pushnotification');
var emailService=require('../services/emailService');
var paymentRelatedFunctions=require('../routes/paymentRelatedMethod');
var template = require('../models/template1');
var router = express.Router();
var date = require('date-and-time'); 
var fs = require('fs');
var jsDir = './public/output/Preview/';
var multer = require('multer');
var uploadFiles=require('../services/uploadFileService');
var paymentGatewayInvoking=require('./paymentRelatedMethod');
var shareVariable=require('../main');
var constantApiUrls=require('../common/constantAPIUrls');
var prepareLog = require('log4js').getLogger("prepare");

// var count = require('../main.js').template_data;
var exec = require('child_process').exec;
var req_id;
var upload = multer({storage:uploadFiles.storage,limits: { fieldSize: 25 * 1024 * 1024 }});
router.all(constantApiUrls.homePage,function(req,res,next){

    if(req.method!=constantApiUrls.postMethod)
    {prepareLog.debug('req method is not a post method')} 
    else 
    {
        // if(Original_user_details_from_jwt_token==undefined)
        // {
        //   prepareLog.debug('User not loggedin and redirect to url:'+constantApiUrls.indexPageRouteURL);
        //   res.render(constantApiUrls.indexPageRouteURL,{userLoggedIn:'',message:constantApiUrls.serverCloseMessage});
        // }
        // else
        // { 
          // if(req.originalUrl.split('/').length < 3){
            var now = new Date();
            req_id=Original_user_details_from_jwt_token+'_'+date.format(now, constantApiUrls.dateFormatWithSec);
            // console.log("reqId..."+Original_user_details_from_jwt_token);
            prepareLog.debug('generate reqestId');
            uploadFiles.getReqId(req_id);
            next();
          // }
          // else{
           
          //  var IdWithEmail=req.originalUrl.split('/')[1];
          // //  console.log(req.url);
          // //  console.log(req.originalUrl);
          // //  console.log(req.protocol + '://' + req.get('host') + req.originalUrl);
          // //  console.log(IdWithEmail.split('?')[0]);
           
          //   // console.log(req.query.Email.split('/')[0]);
          //   var templateId=IdWithEmail.split('?')[0];
          //   var emailId=req.query.Email.split('/')[0];
          //   console.log('emailId...'+emailId);
          //   renderRequest.findRenderRequestBasedOnEmailAndTemplateId(templateId,emailId,function(result){
          //     if(result.length==0){
          //       res.json({ status:"false"});
          //     }
          //     else{
          //       res.json({ status: JSON.parse(JSON.stringify((result[0].template))).filledDetailsStatus });
          //     }
          //   });
          // }
             
        // }     
    } 
});

router.post(constantApiUrls.homePage, upload.fields([
  {name:'featureVideo', maxCount: 1},{name:'userFile', maxCount: 1}]), 

function(req, res) 
{     
  // console.log(req.protocol + '://' + req.get('host') + req.originalUrl);
  // console.log('filledDetailsStatus:'+req.body.filledDetailsStatus);
  prepareLog.debug('router post called');
    if(Original_user_details_from_jwt_token==undefined || Original_user_details_from_jwt_token=='') 
    {
        prepareLog.debug('User not loggedin and redirect to url:'+constantApiUrls.indexPageRouteURL);
        res.render(constantApiUrls.indexPageRouteURL,{userLoggedIn:'',message:constantApiUrls.serverCloseMessage});
    }
    else
    {
      console.log("Original_user_details_from_jwt_token.."+req.body.LogoTagLine);
        var userInstance = new user.model({"Email":Original_user_details_from_jwt_token});
        var myContent=req.body;
        extractingImagesFromBase64Format(myContent);
        var myFiles=req.files;
        getFiles(myFiles,myContent);
        addAdditionalFeilds(myContent);
         srt = req.body.Srtfile;
        createSrtFileForUploadIntoVideo(srt);
        var clientName = Original_user_details_from_jwt_token;
        const dir = jsDir + clientName;
        
        if(req.body.userFile==undefined && (srt=='' || srt==undefined))
        {
          prepareLog.debug('SRT file undefined');
          // paymentRelatedFunctions.invokePaymentGateway(req_id,res);
            checkValuesOfWebWalkThrough(req,constantApiUrls.featureVideoConstant+'_'+req_id+constantApiUrls.videoMP4,myContent);
            createAndSendRenderrequestDataToKafkaProducer(myContent,req,res);
  
        }
        else
        {
          console.log('SRT file is not undefined');
            generateVideoWithSubtitles(myContent,req,res);
            
        }
    }

});
function checkValuesOfWebWalkThrough(req,videoFileName,myContent)
{
            prepareLog.debug('checkValuesOfWebWalkThrough function called');
            if(req.body.featureVideo!=undefined)
             {
              prepareLog.debug('featureVideo is not undefined');
               myContent[constantApiUrls.featureVideoConstant]=videoFileName;
             }
             if(req.body.xCursorposition !='')
             {
              prepareLog.debug('xCursorposition is not null');
              myContent[constantApiUrls.xCursorposition]=req.body.xCursorposition;
             }
             else
             {
              prepareLog.debug('xCursorposition is null add default value');
              myContent[constantApiUrls.xCursorposition]=760;
             }
              if(req.body.yCursorposition !='')
             {
              prepareLog.debug('yCursorposition is not null');
              myContent[constantApiUrls.yCursorposition]=req.body.yCursorposition;
             }
             else
             {
               prepareLog.debug('yCursorposition is null add default value');
              myContent[constantApiUrls.yCursorposition]=482;
             } 
}
function extractingImagesFromBase64Format(myContent)
{
  prepareLog.debug('extractingImagesFromBase64Format function called');
      for (var key in myContent)
        {
          prepareLog.debug('Extract key value from mycontent');
          var base64Rejex = /^data:image\/[A-Za-z0-9]+;base64,/;
          var isBase64Valid = base64Rejex.test(myContent[key]); // base64Data is the base64 string
          if (isBase64Valid)
          {
             
            var base64Data = myContent[key].replace(/^data:image\/[A-Za-z0-9]+;base64,/, "");
            fs.writeFile(constantApiUrls.routeImageslash+key+"_"+req_id+constantApiUrls.pngImageExtension, base64Data, constantApiUrls.base64Constant, function(err) 
            {
              if(err)
              {
                prepareLog.error('Error at extractingImagesFromBase64Format:'+err);
              }
              else
              {
                prepareLog.debug('successfully extracted file from base64 file format');
              }
              // console.log(err);
            });
            myContent[key]=key+"_"+req_id+".png";
          }
          else
          {
            // console.log('it is not in base64');
          }
        }
}
function getFiles(myFiles,myContent)
{
  prepareLog.debug('getFiles called');
     for (var key in myFiles)
        {
            prepareLog.debug('Extract key value from myFiles');
            myContent[key] = myFiles[key][0].filename;
        }
}
function addAdditionalFeilds(myContent)
{
  prepareLog.debug('addAdditionalFeilds function called');
  myContent['templateId']=shareVariable.templateDetails._id;
    // myContent[constantApiUrls.output]=constantApiUrls.generatedVedioPath+req_id;
        // myContent[constantApiUrls.module]=constantApiUrls.videoRender;
        myContent[constantApiUrls.reqId]=req_id;
}
function createSrtFileForUploadIntoVideo(srt)
{
  prepareLog.debug('createSrtFileForUploadIntoVideo function called');
 if(srt=='' || srt==undefined)
         {

         }
         else
         {
          str1 = srt.replace(/(?:@|@@)/g, '\r\n');
          var stream = fs.createWriteStream(constantApiUrls.routeImageUserPath+req_id+constantApiUrls.octStream);
          stream.once('open', function(fd) {
          stream.write(str1);
          stream.end();
          }); 
        }
}

function generateVideoWithSubtitles(myContent,req,res)
{
  prepareLog.debug('generateVideoWithSubtitles function called');
     var cmd = "E:/ffmpeg-20180518-8e7b13b-win64-static/bin/ffmpeg -i ./public/projectImages/featureVideo_"+req_id+".mp4 -vf subtitles=./public/projectImages/userFile_"+req_id+".octet-stream:force_style='Fontsize=20' ./public/projectImages/"+req_id+".mp4";
            exec(cmd, function(err, stdout, stderr)
            {
                console.log('stdout:\n' + stdout); 
                prepareLog.debug('Generate video with subtitle successfully');
                // paymentRelatedFunctions.invokePaymentGateway(req_id,res);
               checkValuesOfWebWalkThrough(req,req_id+constantApiUrls.videoMP4,myContent);
             createAndSendRenderrequestDataToKafkaProducer(myContent,req,res);
    
            });
}

function createAndSendRenderrequestDataToKafkaProducer(myContent,req,res)
{
          prepareLog.debug('createAndSendRenderrequestDataToKafkaProducer function called');
              temp=new template.model(myContent);
              console.log('temp:'+temp);
              temp_with_braces='['+JSON.stringify(temp)+ ']';
              renderRequest.createRenderRequests(Original_user_details_from_jwt_token,temp,function(result)
                { 
                   renderRequest.findByReqIdInRenderRequestsModel(req_id,function(data)
                  {
                    if(data.length==0)
                    {
                      console.log("length null");
                    }
                    else
                    {
                      var userDetails=paymentRelatedFunctions.getUserDetailsFromRenderRequestSchema(data[0].user);
                      var templateDetails=paymentRelatedFunctions.getTemplateDetailsFromRenderRequestSchema(data[0].template);
  
                      renderRequest.findByIdAndUpdateInRenderRequestsModel(data[0]._id,res,constantApiUrls.statusReady,shareVariable.templateDetails,function(data)
                      {
                            var completeTemplateDetails=paymentRelatedFunctions.addPaymentDetailsToJson(templateDetails,res,'ready',shareVariable.templateDetails);
                            console.log('completeTemplateDetails....'+JSON.stringify(completeTemplateDetails));
                            // explainer.sendProductExplainerJson(constantApiUrls.formJson, JSON.stringify(completeTemplateDetails),0);
                            // pushnotifications.pushnotifications(userDetails.Id_for_notifiations,constantApiUrls.textVideoSoon);
                            //  emailService.sendMail(userDetails.email,constantApiUrls.emailSubjectNotif,constantApiUrls.emailTittleFromCh,constantApiUrls.textVideoSoon,constantApiUrls.emailBodyStatus); 
                        
                            // res.render(constantApiUrls.successPageRouteURL);
                            console.log(result.template);
                            var renderData=JSON.parse(JSON.stringify(result.template));
                         console.log('@@@@@@%%%%..'+renderData);
                            res.render(constantApiUrls.templatesLocation+shareVariable.templateDetails.TemplateRedirectFile.toString().split('/')[2].replace(/\..+$/, ''),{userLoggedIn:constantApiUrls.true,elem:shareVariable.templateDetails,fullurl:req.originalUrl,data:renderData,buyMsg:'Saved data successfully please click on buy'});
                           
                            Original_user_details_from_jwt_token='';
                            req.session.Original_user_details_from_jwt_token='';
                            // console.log('seesion value...'+Original_user_details_from_jwt_token);
                            
                          });
                        
                            
                    }
                  })
                });
}
module.exports = router;