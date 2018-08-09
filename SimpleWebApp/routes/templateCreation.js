var express = require('express');
var router = express.Router();
var dynamictemplate = require('../models/dynamicTemplate');
var mongoose = require('mongoose');

var multer = require('multer');
var path = require('path');
var crudDatabase=require('../services/crudService');
var uploadFiles=require('../services/uploadFileService');
var fileUploadConstants=require('../common/fileUploadConstants');
var constantApiUrls=require('../common/constantAPIUrls');
var templateCreationLog = require('log4js').getLogger("templateCreation");
 var upload = multer({storage: uploadFiles.storage});
router.post(constantApiUrls.homePage, upload.fields([
  {name:'TemplateImage', maxCount: 1},{name:'TemplateIcon', maxCount: 1},{name:'TemplateRedirectFile', maxCount: 1}
    ]), 
function (req,res)
{
  templateCreationLog.debug('post method called');
    var myContent=req.body;
    var myFiles=req.files;
    for (var key in myFiles)
    {
      templateCreationLog.debug('Get key from myFiles');
   		myContent[key] = fileUploadConstants.templateIconPath+myFiles[key][0].filename;
    }
    
    crudDatabase.createTemplate(myContent,function(result)
        {
            templateCreationLog.debug('redirect to url:'+constantApiUrls.createTemplateRouteURL);
            res.redirect(constantApiUrls.createTemplateRouteURL);
        });
    
     });

   

module.exports = router;