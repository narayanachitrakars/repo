var payumoney = require('payumoney-node');
payumoney.setKeys('IkUi2GJY', 'i8F32tzn72', 'Z0rfWohzD6iCeDGhephncDTfGg1xFjjxKClL3ZYVuBg=');
payumoney.isProdMode(true);
var paymentRelatedMethodLog = require('log4js').getLogger("paymentRelatedMethod");
module.exports={
	getUserDetailsFromRenderRequestSchema:function(userData)
{
  paymentRelatedMethodLog.debug('getUserDetailsFromRenderRequestSchema function called');
var UserDetailsFromRenderRequestSchema=JSON.parse(JSON.stringify(userData));
return UserDetailsFromRenderRequestSchema;
},

getTemplateDetailsFromRenderRequestSchema:function(templateData)
{
  paymentRelatedMethodLog.debug('getTemplateDetailsFromRenderRequestSchema function called');
var templateDetailsFromRenderRequestSchema=JSON.parse(JSON.stringify(templateData));
return templateDetailsFromRenderRequestSchema;
},

addPaymentDetailsToJson:function(templateDetails,res,status,template_data)
{
  paymentRelatedMethodLog.debug('addPaymentDetailsToJson function called');
  // templateDetails.paymentId=res.req.body.mihpayid;
  // templateDetails.payment_status=res.req.body.status;
  templateDetails.render_status=status;
  templateDetails.AEP_file=template_data.TemplateAEPFile;
  templateDetails.template_name=template_data.TemplateName;
  return templateDetails;
},
invokePaymentGateway:function(userReqId,res)
{
	var paymentData = {
    productinfo: '',
    txnid:userReqId,
    amount: "1",
    phone: "",
    email: Original_user_details_from_jwt_token.email,
    lastname: "",
    firstname:Original_user_details_from_jwt_token.username,
    service_provider:"payu_paisa",
    surl: "http://localhost:80/txnsuccess", //"http://localhost:3000/payu/success"
    furl: "http://localhost:80/txnfail" //"http://localhost:3000/payu/fail"
};
	 payumoney.makePayment(paymentData, function(error, response)
                 {
                    if (error)
                    {}
                    else
                    {
                        res.writeHead(302, {Location: response});
                        res.end();
                    }
                });
}
}