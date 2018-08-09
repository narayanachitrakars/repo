var  upload_video = document.querySelector('#'+chooseVideoFileId),
    upload_subtitles = document.querySelector('#'+chooseSubtitleFileId);
//upload video
if(upload_video !=null)
{

   upload_video.addEventListener('change', function (e)
  {
    var type = this.files[zeroIndex].type; 
    var type_reg = regExForVideoTypeValidation;
    if (type_reg.test(type)) {
      $('#'+editImagetoVideo).css({'display':displayTypeNone});
      $('#'+videoUploadDivId).css({'display':displayTypeBlock});
      $('#'+subTitleUploadFromLocalMechineId).css({'display':displayTypeBlock});  
      $('#'+videoPlayer).css({'display':displayTypeBlock});   
      var $source = $('#'+videoSourceId);
      $source[zeroIndex].src = URL.createObjectURL(this.files[zeroIndex]);
      $source.parent()[zeroIndex].load(); 
      if(document.getElementById(videoSourceId).src !=''){
        $('#'+showPopUpForAddTitles).css({'display':displayTypeBlock});
      }
      else{
        $('#'+showPopUpForAddTitles).css({'display':displayTypeNone});
      }
    }
    else {
      alert('This file type is unsupported.');
    }                 
  }); 
}

//end of upload vide code 

//upload subtitles
if(upload_subtitles !=null)
{
    upload_subtitles.addEventListener('change', function (e)
  {
   
    var file = e.target.files[zeroIndex];
    var reader = new FileReader();
    reader.onload = function(e)
    {
      document.getElementById(srtFileid).innerHTML = e.target.result;
      init();
    }; 
                  
    reader.readAsText(file);
  }); 
}


//end of subtitle code
