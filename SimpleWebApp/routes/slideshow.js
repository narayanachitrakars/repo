/**
 * Created by sanjay on 3/23/2017.
 */

var express = require('express');
var app = express();
var explainer = require('./kafkaProducer');

//var prepare1 = require('./prepare');
var fs = require('fs');
var encodingFormat = 'utf8';
const fse = require('fs-extra')
var bot_server_path = 'C:/';
var file_path = bot_server_path+'jsonData/productExplainer.json';  
const fileExists = require('file-exists');
// routes
var router = express.Router();
// var template = require('../models/template1');
// var user = require('../models/userdetail');
// var renderRequest = require('../models/request');
var renderRequest=require('../services/crudService');
var multer = require('multer');
var FCM = require('fcm-push');
var mailer = require("nodemailer");
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var ejsDir='../output/Preview/'
var jsDir = './public/output/Preview/';
var scenesCount = 15;     
var imageType = '.png';
// slideshow route
router.post('/',urlencodedParser,slide);
  function slide(req, res, userData,req_id)
  {
    var usersRetrievedData = [];
    // var renderRequestInstance_with_updated_values='';
    // var imageCount =0;
    var clientName=req_id;
    // console.log("clientName is:"+clientName);
    usersRetrievedData =  JSON.parse(userData);
    // console.log('TemplateName:'+temp.TemplateName);
    usersRetrievedData[usersRetrievedData.length - 1].output=  'Video'+req_id;
    usersRetrievedData[usersRetrievedData.length - 1].module='video_render';
    usersRetrievedData[usersRetrievedData.length - 1].target=temp.target;
    usersRetrievedData[usersRetrievedData.length - 1].render_status='ready';
    usersRetrievedData[usersRetrievedData.length - 1].req_id=req_id;
   
    fs.exists("./routes/images/"+req_id+".mp4", function(exists)
    {
      if(exists)
      {
        usersRetrievedData[usersRetrievedData.length - 1].featureVideo=req_id+".mp4";
        // explainer.sendProductExplainerJson("formJson", JSON.stringify(usersRetrievedData[usersRetrievedData.length - 1]),0);
      }
      else
      {
        usersRetrievedData[usersRetrievedData.length - 1].featureVideo='featureVideo_'+req_id+".mp4";
        // explainer.sendProductExplainerJson("formJson", JSON.stringify(usersRetrievedData[usersRetrievedData.length - 1]),0);   
      }
    });
    renderRequest.createRenderRequests(Original_user_details_from_jwt_token,temp);
  }
  // router.get('/',urlencodedParser,
  // 	function (req, res, userData,req_id)
  //   {
  //     var usersRetrievedData = [];
  //     var imageCount =0;
  //     var renderRequestInstance_with_updated_values='';
  //     var clientName=Original_user_details_from_jwt_token._id;
  //     usersRetrievedData = JSON.parse(userData);
  //     usersRetrievedData[usersRetrievedData.length - 1].output=  'Video'+req_id;
  //     usersRetrievedData[usersRetrievedData.length - 1].module='video_render';
  //     usersRetrievedData[usersRetrievedData.length - 1].target=temp.target;
  //     usersRetrievedData[usersRetrievedData.length - 1].render_status='ready';
  //     usersRetrievedData[usersRetrievedData.length - 1].req_id=req_id;
  //     fs.exists("./routes/images/"+req_id+".mp4", function(exists)
  //     {
  //       if(exists)
  //       {
  //         usersRetrievedData[usersRetrievedData.length - 1].featureVideo=req_id+".mp4";
  //         explainer.sendProductExplainerJson("formJson", JSON.stringify(usersRetrievedData[usersRetrievedData.length - 1]),0);
  //       }
  //       else
  //       {
  //         usersRetrievedData[usersRetrievedData.length - 1].featureVideo='featureVideo_'+req_id+".mp4";
  //         explainer.sendProductExplainerJson("formJson", JSON.stringify(usersRetrievedData[usersRetrievedData.length - 1]),0);
  //       }
  //     });
  //     renderRequest.createRenderRequests(Original_user_details_from_jwt_token,temp);      
  // });

module.exports = router;
module.exports.slide = slide;

