var multer = require('multer');
var findPath=require('../main');
var fileuploadConstants=require('../common/fileUploadConstants');
var constantApiUrls=require('../common/constantAPIUrls');
uploadFileServicelLog = require('log4js').getLogger("uploadFileService");
module.exports=
{
	 storage : multer.diskStorage({
     destination: function(req, file, callback) {
        uploadFileServicelLog.debug('destination function called');
        // console.log(findPath.templatePath);
        if(findPath.templatePath==constantApiUrls.createTemplateRouteURL || findPath.templatePath==constantApiUrls.displayAllTemplatesRouteURL)
     	{
            uploadFileServicelLog.debug('constant file path and url file path is same in destination function');
        if(file.mimetype==fileuploadConstants.appOctStream)
     	{
             uploadFileServicelLog.debug('File type octent-stream in destination function');
     		callback(null, fileuploadConstants.viewTemplatePath);
     	}
         else
         {
             uploadFileServicelLog.debug('File type not octent-stream in destination function');
         	callback(null, fileuploadConstants.templImagePath);
         }
     }
     else
     {
        uploadFileServicelLog.debug('constant file path and url file path is not same in destination function');
       console.log('storage called');
        callback(null, fileuploadConstants.routeImageslash); 
     }
     	
     },
     filename: function(req, file, callback) {
        uploadFileServicelLog.debug('filename function called');
     	 if(findPath.templatePath==constantApiUrls.createTemplateRouteURL || findPath.templatePath==constantApiUrls.displayAllTemplatesRouteURL)
        {
            uploadFileServicelLog.debug('constant file path and url file path is same in filename function');
         callback(null,  file.originalname);
     }
     else
     {
        uploadFileServicelLog.debug('constant file path and url file path is not same in filename function');
        if(Original_user_details_from_jwt_token==undefined)
        {
            uploadFileServicelLog.debug('user not loggedin');
          callback(null, ' ');
        }
        else
        {
            uploadFileServicelLog.debug('add file extension to file name');
            callback(null, file.fieldname + '_' + req_id + '.' + file.mimetype.toString().split('/')[1]);
        }
     }
     }
 }),


getReqId:function(id)
{
    uploadFileServicelLog.debug('getReqId function called');
	req_id=id;	
},	


}