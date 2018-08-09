var FCM = require('fcm-push');
var pushNotificationConstants=require('../common/pushNotificationConstants');
var serverKey =pushNotificationConstants.serverKey;
var fcm = new FCM(serverKey);
pushnotificationLog = require('log4js').getLogger("pushnotification");

module.exports = {
pushnotifications:function(tokenid,text)
{
  pushnotificationLog.debug('pushnotifications function called');
        message(tokenid,text,function(latestMessage)
          {
            // console.log(latestMessage);
            sendPushNotification(latestMessage);
          });
        
}
}
function message(tokenid,text,latestMessage)
{
  pushnotificationLog.debug('message function called');
  var message = {
            to: tokenid,
            notification: {
                title: 'Notification',
                body: text,
                icon:pushNotificationConstants.iconPath
            }
        };
        latestMessage(message);
}
function sendPushNotification(message)
{
  pushnotificationLog.debug('sendPushNotification function called');
  fcm.send(message)
            .then(function(response) {
              pushnotificationLog.debug('response at sendPushNotification function:'+response);
              console.log(response);
              })
            .catch(function(err) {
              pushnotificationLog.error('Error at sendPushNotification function:'+err);
               console.log(err);
             })
}