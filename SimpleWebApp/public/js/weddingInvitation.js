  
      $(function()
      {
        $(document).ready(function ()
        {
          $.browser.chrome = /chrome/.test(navigator.userAgent.toLowerCase());
          if($.browser.chrome)
          {
            browser='Chrome';
            // $.browser.safari = false;
          }
          if($.browser.safari)
          {
            browser='Safari';
          }
          if($.browser.mozilla)
          {
            browser='mozilla';
          }

          //CODE FOR DATE PICKER

          $('#'+dateTimePicker).datetimepicker({}).on("dp.change",function(e)
          {
            var date = e.date;//e.date is a moment object
            var d;
            if(document.getElementById(weddingDateTime).value !='')
            {
              if(browser=='mozilla')
              {
                d = new Date(date);
              }
              else
              {
                d = new Date(date.format("MM-DD-YYYY hh:mm:ss a"));  
              }   
              var n = month[d.getMonth()];
              document.getElementById(weddingDateAndTime).value = n+','+d.getDate()+' '+d.getFullYear() +' ' +d.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
            }
            else
            {
              document.getElementById(weddingDateAndTime).value='Date and Time';
            }
          });
          // END

          //POPUP FOR PLAY DEMO VIDEO
          // $(".play-single").magnificPopup({type: "iframe"});
          //END
          var full_url = document.URL
          var url_id = full_url.substring(full_url.lastIndexOf('/') + 1);
          var config = {
          apiKey: "AIzaSyCZWa5wChnendahT6sTdfNJhmFbnI8Cz5g",
          authDomain: "productexplainer.firebaseapp.com",
          databaseURL: "https://productexplainer.firebaseio.com",
          projectId: "productexplainer",
          storageBucket: "productexplainer.appspot.com",
          messagingSenderId: "350462790215"
          };

          firebase.initializeApp(config);
          var messaging = firebase.messaging();
          messaging.onMessage((notif) => {
          var title=notif.notification.title;
          var options ={
          body:notif.notification.body,
          icon:notif.notification.icon
          }
          noti= new Notification(title, options);
           });
          

        
          /// diable swipe for owl pages adhi
          $(".disable-owl-swipe").on("touchstart mousedown", function(e)
          {
            e.stopPropagation();
          })
          $("#owl-demo").owlCarousel({
                                      navigation: false,
                                      navigationText: ['&lsaquo;','&rsaquo;'],
                                      slideSpeed: 300,
                                      paginationSpeed: 400,
                                      singleItem: true,
                                      afterInit: makePages,
                                      afterUpdate: makePages,
                                       touchDrag  : false,
                                            mouseDrag  : false
                                    });

          function makePages()
          {
            $.each(this.owl.userItems, function(i)
            {
              if(i==0)
              {
                owelShow(editableArea,nothingEditableId);
              owelHide(richTextAreaFeild,backGrndID,defaultActionTitle,currentDate,dateTimePickerId);
               
              }
              $('.owl-controls .owl-page').eq(i)
                .css({
                      'background': 'url("'
                      +weddingInvitationPageNavigationImageFilePath +i+ '.PNG' +'")',
                      'background-size': 'cover',
                    })
            });
          }

          $('.owl-page').click(function(event)
          {
            currentIndex = $('div.active').index();
            removeErrorMessage();

            if(currentIndex==0)
            {
              owelShow(editableArea,nothingEditableId);
              owelHide(richTextAreaFeild,backGrndID,defaultActionTitle,currentDate,dateTimePickerId);
             
            }
            
            else if(currentIndex==6)
            {
               owelShow(editableArea,nothingEditableId);
              owelHide(richTextAreaFeild,backGrndID,defaultActionTitle,currentDate,dateTimePickerId);

              
            }
            else
            {
             owelShow(defaultActionTitle,editableArea);
             owelHide(nothingEditableId,richTextAreaFeild,backGrndID,currentDate,dateTimePickerId);
             
            }
        
            editor_object.removeAttr('customAttr');
            editor_object.removeAttr('customFiledAttr');
            resetRichTextArea(); 
          })
        });
      });
  function show(id)
    {
      $("#"+id).show();
      $('#'+richTextAreaFeild).css({'display':'none'});
       $('#'+defaultActionTitle).css({'display':'none'});
    }
    
    function myFunction(id,assignid)
    {
      var d = new Date(document.getElementById(id).value);
      var n = month[d.getMonth()];
      if(d!='Invalid Date')
      {
        document.getElementById(assignid).innerHTML = n+','+d.getDate()+' '+d.getFullYear();
      }
      else
      {
        document.getElementById(assignid).innerHTML = 'Date';
      }
    }