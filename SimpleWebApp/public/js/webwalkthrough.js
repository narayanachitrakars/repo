$(function()
  {
    
    $(document).ready(function ()
    {
      

      $("#dialog").dialog({
     autoOpen: false,
     modal: true,
     buttons : {
          "Save" : function() {
    var latest_start_time1_min_value;
    var latest_start_time1_sec_value;
    var latest_end_time1_min_value;
    var latest_end_time1_sec_value;
    var latest_start_time2_min_value;
    var latest_start_time2_sec_value;
    var latest_end_time2_min_value;
    var latest_end_time2_sec_value;
    var latest_start_time3_min_value;
    var latest_start_time3_sec_value;
    var latest_end_time3_min_value;
    var latest_end_time3_sec_value;
    var latest_start_time4_min_value;
    var latest_start_time4_sec_value;
    var latest_end_time4_min_value;
    var latest_end_time4_sec_value;

    var seqno=document.getElementById('seq1').value;
    var start_time1_hr=0+document.getElementById('seq1_start_time_id1').value;
    var start_time1_min=document.getElementById('seq1_start_time_id2').value;
    if(start_time1_min.length==1)
    {
        latest_start_time1_min_value=0+start_time1_min;
    }
    else
    {
        latest_start_time1_min_value=start_time1_min;
    }
    var start_time1_sec=document.getElementById('seq1_start_time_id3').value;
    if(start_time1_sec.length==1)
    {
        latest_start_time1_sec_value=0+start_time1_sec;
    }
    else
    {
        latest_start_time1_sec_value=start_time1_sec;
    }
    var start_time_millsec='000';
    var end_time_millsec='000';
    var end_time1_hr=0+document.getElementById('seq1_end_time_id1').value;
    var end_time1_min=document.getElementById('seq1_end_time_id2').value;
    var end_time1_sec=document.getElementById('seq1_end_time_id3').value;
    if(end_time1_min.length==1)
    {
        latest_end_time1_min_value=0+end_time1_min;
    }
    else
    {
        latest_end_time1_min_value=end_time1_min;
    }
    if(end_time1_sec.length==1)
    {
        latest_end_time1_sec_value=0+end_time1_sec;
    }
    else
    {
        latest_end_time1_sec_value=end_time1_sec;
    }
    var sentense=document.getElementById('seq1_sentense_id').value;
    var seqno2=document.getElementById('seq2').value;
    var start_time2_hr=0+document.getElementById('seq2_start_time_id1').value;
    var start_time2_min=document.getElementById('seq2_start_time_id2').value;
    var start_time2_sec=document.getElementById('seq2_start_time_id3').value;
    if(start_time2_min.length==1)
    {
        latest_start_time2_min_value=0+start_time2_min;
    }
    else
    {
        latest_start_time2_min_value=start_time2_min;
    }
    if(start_time2_sec.length==1)
    {
        latest_start_time2_sec_value=0+start_time2_sec;
    }
    else
    {
        latest_start_time2_sec_value=start_time2_sec;
    }
    var end_time2_hr=0+document.getElementById('seq2_end_time_id1').value;
    var end_time2_min=document.getElementById('seq2_end_time_id2').value;
    var end_time2_sec=document.getElementById('seq2_end_time_id3').value;
    if(end_time2_min.length==1)
    {
        latest_end_time2_min_value=0+end_time2_min;
    }
    else
    {
        latest_end_time2_min_value=end_time2_min;
    }
    if(end_time2_sec.length==1)
    {
        latest_end_time2_sec_value=0+end_time2_sec;
    }
    else
    {
        latest_end_time2_sec_value=end_time2_sec;
    }
    var start_time_millsec2='000';
    var end_time_millsec2='000';
    var sentense2=document.getElementById('seq2_sentense_id').value;
    var seqno3=document.getElementById('seq3').value;
    var start_time3_hr=0+document.getElementById('seq3_start_time_id1').value;
    var start_time3_min=document.getElementById('seq3_start_time_id2').value;
    var start_time3_sec=document.getElementById('seq3_start_time_id3').value;
    if(start_time3_min.length ==1)
    {
        latest_start_time3_min_value=0+start_time3_min;
    }
    else
    {
        latest_start_time3_min_value=start_time3_min;
    }
    if(start_time3_sec.length ==1)
    {
        latest_start_time3_sec_value=0+start_time3_sec;
    }
    else
    {
        latest_start_time3_sec_value=start_time3_sec;
    }
    var end_time3_hr=0+document.getElementById('seq3_end_time_id1').value;
    var end_time3_min=document.getElementById('seq3_end_time_id2').value;
    var end_time3_sec=document.getElementById('seq3_end_time_id3').value;
    if(end_time3_min.length ==1)
    {
        latest_end_time3_min_value=0+end_time3_min;
    }
    else
    {
        latest_end_time3_min_value=end_time3_min;
    }
    if(end_time3_sec.length ==1)
    {
        latest_end_time3_sec_value=0+end_time3_sec;
    }
    else
    {
        latest_end_time3_sec_value=end_time3_sec;
    }
    var start_time_millsec3='000';
    var end_time_millsec3='000';
    var sentense3=document.getElementById('seq3_sentense_id').value;
    var seqno4=document.getElementById('seq4').value;
    var start_time4_hr=0+document.getElementById('seq4_start_time_id1').value;
    var start_time4_min=document.getElementById('seq4_start_time_id2').value;
    var start_time4_sec=document.getElementById('seq4_start_time_id3').value;
    if(start_time4_min.length ==1)
    {
        latest_start_time4_min_value=0+start_time4_min;
    }
    else
    {
        latest_start_time4_min_value=start_time4_min;
    }
    if(start_time4_sec.length ==1)
    {
        latest_start_time4_sec_value=0+start_time4_sec;
    }
    else
    {
        latest_start_time4_sec_value=start_time4_sec;
    }
    var end_time4_hr=document.getElementById('seq4_end_time_id1').value;
    var end_time4_min=document.getElementById('seq4_end_time_id2').value;
    var end_time4_sec=document.getElementById('seq4_end_time_id3').value;
    if(end_time4_min.length ==1)
    {
        latest_end_time4_min_value=0+end_time4_min;
    }
    else
    {
        latest_end_time4_min_value=end_time4_min;
    }
    if(end_time4_sec.length ==1)
    {
        latest_end_time4_sec_value=0+end_time4_sec;
    }
    else
    {
        latest_end_time4_sec_value=end_time4_sec;
    }
    var start_time_millsec4='000';
    var end_time_millsec4='000';
    var sentense4=document.getElementById('seq4_sentense_id').value;

    if(start_time1_hr=='0' || start_time2_hr=='0'|| start_time3_hr=='0' || start_time4_hr=='0')
    {
         
        $(this).dialog("close"); 
    }
    else
    {
       
        document.getElementById(srtFileid).innerHTML=seqno+'\n'+start_time1_hr+':'+latest_start_time1_min_value+':'+latest_start_time1_sec_value+','+start_time_millsec +' '+'-->'+' '+end_time1_hr+':'+latest_end_time1_min_value+':'+latest_end_time1_sec_value+','+end_time_millsec+'\n'+sentense+'\n\n'+seqno2+'\n'+start_time2_hr+':'+latest_start_time2_min_value+':'+latest_start_time2_sec_value +','+start_time_millsec2 +' '+'-->'+' '+end_time2_hr+':'+latest_end_time2_min_value+':'+latest_end_time2_sec_value+','+end_time_millsec2+'\n'+sentense2+'\n\n'+seqno3+'\n'+start_time3_hr+':'+latest_start_time3_min_value+':'+latest_start_time3_sec_value  +','+start_time_millsec2 +' '+'-->'+' '+end_time3_hr+':'+latest_end_time3_min_value+':'+latest_end_time3_sec_value+','+end_time_millsec3+'\n'+sentense3+'\n\n'+seqno4+'\n'+start_time4_hr+':'+latest_start_time4_min_value+':'+latest_start_time4_sec_value  +','+start_time_millsec4 +' '+'-->'+' '+end_time4_hr+':'+latest_end_time4_min_value+':'+latest_end_time4_sec_value+','+end_time_millsec4+'\n'+sentense4;
        document.getElementById('dynamica_srtfile').value=seqno+'@'+start_time1_hr+':'+latest_start_time1_min_value+':'+latest_start_time1_sec_value+','+start_time_millsec +' '+'-->'+' '+end_time1_hr+':'+latest_end_time1_min_value+':'+latest_end_time1_sec_value+','+end_time_millsec+'@'+sentense+'@@'+seqno2+'@'+start_time2_hr+':'+latest_start_time2_min_value+':'+latest_start_time2_sec_value +','+start_time_millsec2 +' '+'-->'+' '+end_time2_hr+':'+latest_end_time2_min_value+':'+latest_end_time2_sec_value+','+end_time_millsec2+'@'+sentense2+'@@'+seqno3+'@'+start_time3_hr+':'+latest_start_time3_min_value+':'+latest_start_time3_sec_value  +','+start_time_millsec2 +' '+'-->'+' '+end_time3_hr+':'+latest_end_time3_min_value+':'+latest_end_time3_sec_value+','+end_time_millsec3+'@'+sentense3+'@@'+seqno4+'@'+start_time4_hr+':'+latest_start_time4_min_value+':'+latest_start_time4_sec_value  +','+start_time_millsec4 +' '+'-->'+' '+end_time4_hr+':'+latest_end_time4_min_value+':'+latest_end_time4_sec_value+','+end_time_millsec4+'@'+sentense4; 
        init();  
        $(this).dialog("close");  
        }       
          },
          "Cancel" : function() {
            $(this).dialog("close");
          }
        },
        resizable: false,
    draggable: true,
    stack: true,
    closeOnEscape: true,
    zIndex: 1320,
    width: 350
      });

  $("#"+showPopUpForAddTitles).on("click", function(e) {
      e.preventDefault();
      $("#dialog").dialog("open");
  });

  

            $.browser.chrome = /chrome/.test(navigator.userAgent.toLowerCase());
            if($.browser.chrome)
            {
                browser='Chrome';
                $.browser.safari = false;
            }
            if($.browser.safari)
            {
                browser='Safari';
            }
            if($.browser.mozilla)
            {
                browser='mozilla';
            }
            if(browser=='mozilla')
              {
            
               $("#"+videoPlayer).attr('width','95.1%');
                $("#"+editImagetoVideo).attr('width','100%');
               
              }
              
             else {
               
             $("#"+videoPlayer).attr('width', "68%");
             // $("#player").attr('height','600px');
             $("#"+editImagetoVideo).attr('width', "100%");
           }
            $('#'+videoUploadDivId).css({'display':'none'});
                  $('#videolabel').css({'display':'none'});
                  $('#'+chooseVideoFileId).css({'display':'none'});
   
 $("a#downloaded").click(function()
                {
                    var text='1 00:00:00,100 --> 00:00:01,500 For www.forom.com 2 00:00:01,500 --> 00:00:02,500 Tonights the night. 3 00:00:03,000 --> 00:00:15,000 And its going to happen again and again';
                    var first_line=text.substring(0,1);
                    var second_line=text.substring(2,31);
                    var third_line=text.substring(32,49);
                    var fourth_line=text.substring(50,51);
                    var fifth_line=text.substring(52,81);
                    var six_line=text.substring(82,101);
                    var seventh_line=text.substring(102,103);
                    var eight_line=text.substring(104,133);
                    var nine_line=text.substring(134,173);
                    text=first_line+"\r\n"+second_line+"\r\n"+third_line+"\r\n\r\n\r\n"+fourth_line+"\r\n"+fifth_line+"\r\n"+six_line+"\r\n\r\n\r\n"+seventh_line+"\r\n"+eight_line+"\r\n"+nine_line;

                    this.href = "data:text/plain;charset=UTF-8,"  + encodeURIComponent(text);
                    this.setAttribute('download','sample.srt');
                    document.getElementById("ptag_for_subtitle").style.display='inline-block';
                    document.getElementById("downloaded").style.display='none';
                });






/// diable swipe for owl pages adhi
$(".disable-owl-swipe").on("touchstart mousedown", function(e) {
  
    // Prevent carousel swipe
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

    function makePages() {

        $.each(this.owl.userItems, function(i) {

          if(i==0){
            owelShow(defaultActionTitle,editableArea);
            owelHide(showPopUpForAddTitles,circleFocusId,richTextAreaFeild,imageEditSection,videoUploadDivId,subTitleUploadFromLocalMechineId,stockImagesId,backGrndID);
       

          }
            $('.owl-controls .owl-page').eq(i)
                .css({
                    // 'background': "url('/images/Web Walkthrough/thumbnails/" +i+ ".png')",
                    'background':'url("' + webWalkthrougPageNavigationImageFilePath +i+ '.PNG' + '")',
                    'background-size': 'cover',


                })
                // $.LoadingOverlay("hide");
        });
    }

$('.owl-page').click(function(event) {
   
     currentIndex = $('div.active').index();
     removeErrorMessage();
       $('.box-2').css({'display':'none'}); 
  $('.box').css({'display':'none'});
        if(currentIndex==0)
            {
                owelShow(defaultActionTitle,editableArea);
            owelHide(showPopUpForAddTitles,circleFocusId,richTextAreaFeild,imageEditSection,videoUploadDivId,subTitleUploadFromLocalMechineId,stockImagesId,backGrndID,chooseSubtitleFile);
       
          }
    
          else if(currentIndex==2){
            owelShow(circleFocusId);
            owelHide(showPopUpForAddTitles,defaultActionTitle,richTextAreaFeild,imageEditSection,videoUploadDivId,subTitleUploadFromLocalMechineId,stockImagesId,backGrndID,chooseSubtitleFile);

          }
         
          else if(currentIndex==4){
           
          
            if(document.getElementById(chooseVideoFileId).value !='')
            {
                owelShow(videoUploadDivId,subTitleUploadFromLocalMechineId,showPopUpForAddTitles,chooseSubtitleFile);
          
            }
            else
            {
                owelHide(videoUploadDivId,subTitleUploadFromLocalMechineId,showPopUpForAddTitles);
           
            }
            owelShow(defaultActionTitle);
            owelHide(circleFocusId,richTextAreaFeild,imageEditSection,stockImagesId,backGrndID);
          
          }
          else
          {
            owelShow(defaultActionTitle);
            owelHide(showPopUpForAddTitles,circleFocusId,richTextAreaFeild,imageEditSection,videoUploadDivId,subTitleUploadFromLocalMechineId,stockImagesId,backGrndID,chooseSubtitleFile);
           
          }
     
   editor_object.removeAttr('customAttr');
   editor_object.removeAttr('customFiledAttr');
    resetRichTextArea(); 
})

});
});//]]> 
    



             function imageEditClick(event){




  $('#'+videoUploadDivId).css({'display':'block'});
  $('#videolabel').css({'display':'table'});
    $('#'+chooseVideoFileId).css({'display':'block'});
      $('#'+defaultActionTitle).css({'display':'none'});

 }
 


   function isNumberKey(evt){
  
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

