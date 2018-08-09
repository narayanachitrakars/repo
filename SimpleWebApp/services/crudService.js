// var express = require('express');
// var app=express();
var user = require('../models/userdetail'),
	template=require('../models/template1'),
	renderRequest = require('../models/request'),
	dynamicTemplate = require('../models/dynamicTemplate');
  // var log4js = require('log4js');
// log4js.configure('./config/log4js.json');
  // app.use(log4js.connectLogger(log4js.getLogger("debug"), { level: 'auto' }));
  crudServiceLog = require('log4js').getLogger("crudService");

module.exports = {
changeStatusOfSubscription:function(id,result)
    { 
      renderRequest.model.findByIdAndUpdate(id, {
     
       isSubscribed:false
    },function (err, data)
   {
     if(err)
     {
       console.log('Error at changeStatusOfSubscription function:'+' '+err);
     
     }
     else
     {
      
     
       crudServiceLog.debug('updated  successfully at changeStatusOfSubscription function');
       result(data);
     }
   })
},
  findFlyerName:function(reqid,retunData){
    console.log(reqid);
    renderRequest.model.find({'template.reqId':reqid}).exec(function (err, data)
    {
      if(err){
        console.log("no file");
      }
      else{
        retunData(data);
      }
  });
},
  findTemplateDataBasedOnTemplateId:function(templateId,retunData){
    dynamicTemplate.model.find({_id:templateId},function(err,data){
      if(err){
        console.log(templateId);
        console.log("err occured.."+err)}
      else{
        retunData(data);
      }
    })
  },
  findRenderRequestBasedOnEmailAndTemplateId:function(templateId,emailid,returnData){
    console.log('findRenderRequestBasedOnEmailAndTemplateId function called');
    renderRequest.model.find( { $and:[{'user.Email':emailid,'template.templateId':templateId},{orderId:null}]}).sort({$natural:-1}).limit(1).exec(function (err, data)
   {
     if(err)
     {
       crudServiceLog.error('Error at findRenderRequestBasedOnEmailAndTemplateId function:'+' '+err);
       // console.log('Error in findRenderRequestBasedOnEmailAndTemplateId:'+err);
     }
     else
     {
       console.log("data.."+data);
       crudServiceLog.debug('Return result successfully at findRenderRequestBasedOnEmailAndTemplateId function');
       returnData(data);
     }
   })
  },
  findTemplateDetails:function(tempId,tempResult){
  dynamicTemplate.model.find({_id:tempId},function(err,result){
    if(err){console.log("err occured .."+err)}
    else{
      // console.log(result);
      tempResult(result);
    }

  })
},
  findRenderRequestBasedOnEmailAndTemplateIdupdateOrderid:function(templateId,orderid,currenttemplateDetails,returnData){
   console.log('findRenderRequestBasedOnEmailAndTemplateIdupdateOrderid function called..'+templateId+'...'+orderid);
    renderRequest.model.findByIdAndUpdate(templateId, {
      // paymentId:resObj.req.body.mihpayid,
      // payment_status:resObj.req.body.status,
      orderId:orderid,
      render_status:'ready',
      AEP_file:currenttemplateDetails[0].TemplateAEPFile,
      template_name:currenttemplateDetails[0].TemplateName
     

    },function (err, data)
   {
     if(err)
     {
       console.log('Error at findRenderRequestBasedOnEmailAndTemplateIdupdateOrderid function:'+' '+err);
       // console.log('Error in findRenderRequestBasedOnEmailAndTemplateId:'+err);
     }
     else
     {
      
      //  console.log("data.."+data);
       crudServiceLog.debug('updated  successfully at findRenderRequestBasedOnEmailAndTemplateIdupdateOrderid function');
       returnData(data);
     }
   })
  },
   createTemplate: function(data,savedData) {
    crudServiceLog.debug('createTemplate function called');
   final_template=new dynamicTemplate.model(data);
   final_template.save(function (err,result)
   {
      if (err) {
        crudServiceLog.error('Error at createTemplate function:'+' '+err);
      console.log ('ERROR'+err);
      } else {
         crudServiceLog.debug('Return result successfully at createTemplate function');
    savedData(result);
      }
  })
   },
    getAllTemplates: function(getData) {
      crudServiceLog.debug('getAllTemplates function called');
  dynamicTemplate.model.find().exec(function (err, data)
  {
  if(err)
  {
    crudServiceLog.error('Error at getAllTemplates function:'+' '+err);
    // console.log(err);
  }
  else
  {
    crudServiceLog.debug('Return result successfully at getAllTemplates function');
    getData(data);
    // res.render('pages/home',{userLoggedIn:'true',data});
  }
  });
   },
updateTemplates: function(req,filesList,latestTemplateIcon,latestTemplateRedirectFile,latestTemplateImage,results) {
	crudServiceLog.debug('updateTemplates function called');
  dynamicTemplate.model.findByIdAndUpdate(req.body.templateId,{
  TemplateName:req.body.TemplateName,
  TemplateAEPFile:req.body.TemplateAEPFile,
  TemplateRedirectFileName:req.body.TemplateRedirectFileName,
  TemplateIconClassWidth:req.body.TemplateIconClassWidth,
  TemplateIconClassHeigth:req.body.TemplateIconClassHeigth,
  TemplateDemoVideo:req.body.TemplateDemoVideo,
  TemplateSubtitle:req.body.TemplateSubtitle,
  TemplateIcon:latestTemplateIcon,
  TemplateRedirectFile:latestTemplateRedirectFile,
  TemplateImage:latestTemplateImage
  },function(err,data)
  {
    if(err)
    {
      crudServiceLog.error('Error at updateTemplates function:'+' '+err);
      // console.log("error occored:"+err);
    }
    else
    {
      crudServiceLog.debug('Return result successfully at updateTemplates function');
      results(data);
      // console.log("template updated successfully");
    }
  })
   },
   deleteTemplate:function(req,returnData)
   {
    crudServiceLog.debug('deleteTemplate function called');
    dynamicTemplate.model.remove({'_id':req.body.templateId },function(err,data)
      {
        if(err)
        {
          crudServiceLog.error('Error at deleteTemplate function:'+' '+err);
          // console.log(err);
        }
        else
        {
          // console.log(data);
          crudServiceLog.debug('Return result successfully at deleteTemplate function');
          returnData(data);
        }
      });
   },
   createRenderRequests:function(Original_user_details_from_jwt_token,temp,results)
   {
    crudServiceLog.debug('createRenderRequests function called');
    userInstance=new user.model({"Email":Original_user_details_from_jwt_token});
    renderRequestInstance=new renderRequest.model();
    renderRequestInstance.user=userInstance;
    renderRequestInstance.template=temp;
renderRequestInstance.isSubscribed=true;    
// renderRequestInstance_with_updated_values=renderRequestInstance; 
    renderRequestInstance.save(function (err,savedObject)
    {  
        if (err)
        {
         crudServiceLog.error('Error at createRenderRequests function:'+' '+err);
          // console.log(err);
        }
        else 
        {
          crudServiceLog.debug('Return result successfully at createRenderRequests function');
         results(savedObject);
        }  
    });
   },
  findAllRenderRequestsModel:function(result){
    renderRequest.model.find().exec(function (err, data)
    {
      if(err)
    	{
        crudServiceLog.error('Error at findAllRenderRequestsModel function:'+' '+err);
    	
    	}
    	else
    	{

      
        crudServiceLog.debug('Return result successfully at findAllRenderRequestsModel function');
    		result(data);
    	}
      
    })
   },
   findByReqIdInRenderRequestsModel:function(orderId,getdata)
   {
    crudServiceLog.debug('findByReqIdInRenderRequestsModel function called');
   	renderRequest.model.find({orderId:orderId}).exec(function (err, data)
    {
    	if(err)
    	{
        crudServiceLog.error('Error at findByReqIdInRenderRequestsModel function:'+' '+err);
    		// console.log('Error in findByReqIdInRenderRequestsModel:'+err);
    	}
    	else
    	{

        // console.log(data);
        crudServiceLog.debug('Return result successfully at findByReqIdInRenderRequestsModel function');
    		getdata(data);
    	}
    })
   },
    findByIdAndUpdateInRenderRequestsModel:function(defaultId,resObj,status,templateData,getdata)
   {
    crudServiceLog.debug('findByIdAndUpdateInRenderRequestsModel function called');
   	renderRequest.model.findByIdAndUpdate(defaultId,
        {
          // paymentId:resObj.req.body.mihpayid,
          // payment_status:resObj.req.body.status,
          render_status:status,
          AEP_file:templateData.TemplateAEPFile,
          template_name:templateData.TemplateName

        },function (err, data)
    {
    	if(err)
    	{
        crudServiceLog.error('Error at findByIdAndUpdateInRenderRequestsModel function:'+' '+err);
    		// console.log('Error in findByIdAndUpdateInRenderRequestsModel:'+err);
    	}
    	else
    	{
         crudServiceLog.debug('Return result successfully at findByIdAndUpdateInRenderRequestsModel function');
    		getdata(data);
    	}
    })
   },

   getPassword:function(reqEmailId,retunedValue)
   {
    crudServiceLog.debug('getPassword function called');
    findUserFromDB(reqEmailId,retunedValue)
   },

   insertUser: function(data,retunedValue) {
    crudServiceLog.debug('insertUser function called');
   userInstance=new user.model(data.body);
     findUserFromDB(data.body.email,function(internalRetunedValue)
      {
        // console.log(internalRetunedValue.length);

          if(internalRetunedValue.length==0)
            {
              crudServiceLog.debug('Return data with length zero at insertUser function');
              createUser(userInstance,internalRetunedValue,retunedValue)
         
          }
          else
          {
            crudServiceLog.debug('Return data with length not equal to zero at insertUser function');
           retunedValue(internalRetunedValue,internalRetunedValue.length);
          }


      });
   
 
 
   },


 getUser: function(email,retunedValue) {
  crudServiceLog.debug('getUser function called');
  findUserFromDB(email,retunedValue);
 
	 			},
  }

//find userDetails method
function findUserFromDB(email,retunedValue)
{
  crudServiceLog.debug('findUserFromDB function called');
 user.model.find({email:email}).exec(function (err, data)
     {
      if(data.length !=0)
            {
              crudServiceLog.debug('Return data with length zero at findUserFromDB function');
              retunedValue(data,data.length);
            }
          else{
            crudServiceLog.debug('Return data with length not equal to zero at findUserFromDB function');
            retunedValue(data,data.length);
          }
    })
}


//create  user method
function createUser(userInstance,internalRetunedValue,savedData)
{
  crudServiceLog.debug('createUser function called');
   userInstance.save(function (err,results)
         {  
             if (err)
             {
              crudServiceLog.error('Error at createUser function:'+' '+err)
               console.log(err);
                  
             }
             else
             {
              crudServiceLog.debug('Return result successfully at createUser function');
               savedData(results,internalRetunedValue.length);
             }
           })
}
