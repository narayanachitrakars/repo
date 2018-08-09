var mailer = require("nodemailer");
var emailConstants=require('../common/emailConstants');
emailServiceLog = require('log4js').getLogger("emailService");
var smtpTransport = mailer.createTransport({
                            service: "Webmail",
                            host: 'cp-2.webhostbox.net',
                            auth:{
                                  user: emailConstants.userName,
                                  pass: emailConstants.password
                               }
                          });
module.exports=
{
	sendMail:function(email,subject,title,text,body)
	{
    console.log(email +'at sendMail function');
    emailServiceLog.debug('sendMail function called');
  var latestMail=mail(email,subject,title,body,text);
  sendEmail(latestMail,email);
 }
}
function mail(email,subject,title,body,text)
{
   console.log(email +'at mail function');
  emailServiceLog.debug('mail function called');
   var mail = {
        from:emailConstants.fromEmail,
        to: email,
        subject: subject,
        text: title,
        html: "<b>"+body+':'+text+"</b>"
    }
    return mail;
}
function sendEmail(mail,email)
{
   console.log(email +'at sendEmail function');
  emailServiceLog.debug('sendEmail function called');
  smtpTransport.sendMail(mail, function(error, response){
      if(error){
        emailServiceLog.error('Error at sendEmail function:'+error);
              console.log(error);
          }else{
            emailServiceLog.debug('Mail sent to:'+email);
                 console.log("Message sent to: " + email);
            }
      smtpTransport.close();
  });
}