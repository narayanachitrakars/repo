var express = require('express');
var router = express.Router();
var dynamictemplate = require('../models/dynamicTemplate');
var crudService=require('../services/crudService');
var uploadFiles=require('../services/uploadFileService');
var multer = require('multer');
var path = require('path');
var fileuploadConstants=require('../common/fileUploadConstants');
var constantApiUrls=require('../common/constantAPIUrls');
var updateTemplateLog = require('log4js').getLogger("updateTemplate");
  var upload = multer({storage: uploadFiles.storage});
  router.post(constantApiUrls.homePage, upload.fields([
  {name:'TemplateImage', maxCount: 1},{name:'TemplateIcon', maxCount: 1},{name:'TemplateRedirectFile', maxCount: 1}
    ]), 
function (req,res)
{
  updateTemplateLog.debug('post method called');
    var myContent=req.body;
    var myFiles=req.files;
    for (var key in myFiles)
    {
      updateTemplateLog.debug('Get keys from myFiles');
    	if(myFiles[key][0].mimetype==fileuploadConstants.appOctStream)
    	{
        updateTemplateLog.debug('File mime type is an octent-stream then upload value to location:'+fileuploadConstants.templateLocation);
    		myContent[key] = fileuploadConstants.templateLocation+myFiles[key][0].filename;
    	}
    	else
    	{
        updateTemplateLog.debug('File mime type is not an octent-stream then upload value to location:'+fileuploadConstants.templateIconPath);
    		myContent[key] = fileuploadConstants.templateIconPath+myFiles[key][0].filename;	
    	}
   		
    }
    var latestFileValues=checkFileTypesAreModifiedOrNot(myFiles,req);
            crudService.updateTemplates(req,myFiles,latestFileValues[0],latestFileValues[1],latestFileValues[2],function(data)
                {
                  updateTemplateLog.debug('redirect to url:'+constantApiUrls.displayAllTemplatesRouteURL);
                   res.redirect(constantApiUrls.displayAllTemplatesRouteURL); 
                });
   
     });

function checkFileTypesAreModifiedOrNot(files,req)
{
  updateTemplateLog.debug('checkFileTypesAreModifiedOrNot function called');
    var latestTemplateIcon;
    var latestTemplateRedirectFile;
    var latestTemplateImage;
    if(files.TemplateIcon!=undefined)
  {
    updateTemplateLog.debug('updated templateIcon is not undefined then assign new file value');
    latestTemplateIcon= fileuploadConstants.templateIconPath+files.TemplateIcon[0].originalname;
  }
  else
  {
    updateTemplateLog.debug('updated templateIcon is not undefined then assign previous file value');
    latestTemplateIcon=req.body.dbIconimageUrl;
  }
  if(files.TemplateRedirectFile!=undefined)
  {
    updateTemplateLog.debug('updated TemplateRedirectFile is not undefined then assign new file value');
    latestTemplateRedirectFile=fileuploadConstants.templateLocation+files.TemplateRedirectFile[0].originalname;
  }
  else
  {
    updateTemplateLog.debug('updated TemplateRedirectFile is not undefined then assign previous file value');
    latestTemplateRedirectFile=req.body.dbTemplateRedirectFileNameUrl;
  }

  if(files.TemplateImage!=undefined)
  {
    updateTemplateLog.debug('updated TemplateImage is not undefined then assign new file value');
    latestTemplateImage=fileuploadConstants.templateIconPath+files.TemplateImage[0].originalname;
  }
  else
  {
    updateTemplateLog.debug('updated latestTemplateImage is not undefined then assign previous file value');
    latestTemplateImage=req.body.dbTemplateimageUrl;
  }
  return [latestTemplateIcon,latestTemplateRedirectFile,latestTemplateImage];
}

module.exports = router;
