// vars
var result = document.querySelector('.'+imagePlaceForCrop),
    save = document.querySelector('.'+save),
    // save1 = document.querySelector('#saveimgComp'),
    cropper = '';
    var current_id;
    var browser;




//upload image 

/* on image click or browse button this function will be envoked and after hiding of necesary view elemets and validation takes place*/
function imageUpload(input,assignid,value_assigned_to,forienobj_id,w,h,same_image_assigned_another_place_idone,same_image_assigned_another_place_idtwo){
  current_id=value_assigned_to;
  hideShowOnImageClick();
  if(input.files && input.files[zeroIndex]) {
    checkImageFileFormatType(input, assignid, same_image_assigned_another_place_idone, same_image_assigned_another_place_idtwo, h, w);
}
};


//Check image file type if it is valid image type then read file from result or else show alert
function checkImageFileFormatType(input, assignid, same_image_assigned_another_place_idone, same_image_assigned_another_place_idtwo, h, w) {
  var type = input.files[zeroIndex].type;
  var type_reg = regExForImageTypeValidation;
  if (type_reg.test(type)) {
    showLoader();
    setImageIdForAssigning(assignid, same_image_assigned_another_place_idone, same_image_assigned_another_place_idtwo);
    readerFileFromFileReader(assignid, h, w, same_image_assigned_another_place_idone, same_image_assigned_another_place_idtwo, input);
    // chcek();
  }
  else {
    alert('This file type is unsupported.');
  }
}


//here we are setting the image Id i.e where the common image need to be  shown on diiferent pages
function setImageIdForAssigning(assignid, same_image_assigned_another_place_idone, same_image_assigned_another_place_idtwo) {
  assignImage = document.querySelector('#' + assignid);
  assignImageone = document.querySelector('#' + same_image_assigned_another_place_idone);
  assignImagetwo = document.querySelector('#' + same_image_assigned_another_place_idtwo);
}

//reading the file from file reader and then assigning image for preview and at editable area
function readerFileFromFileReader(assignid, h, w, same_image_assigned_another_place_idone, same_image_assigned_another_place_idtwo, input) {
  var reader = new FileReader();
  reader.onload = function (e) {
    if (e.target.result) {
      var img = document.createElement('img');
      img.id = 'image';
      img.src = e.target.result;
      assignImageForPreview(assignid, h, w, e, same_image_assigned_another_place_idone, same_image_assigned_another_place_idtwo, assignImageone, assignImagetwo);
      assignImageAtEditableArea(img);
      chcek();
    }
  };
  reader.readAsDataURL(input.files[zeroIndex]);
}

//hiding or showing the view i.e elements on image click
function hideShowOnImageClick() {
  $('#' + richTextAreaFeild).css({ 'display': displayTypeNone });
  $('.'+imageViewForCrop).css({ 'display': displayTypeBlock });
  $('.' + imageViewBox).css({ 'display': displayTypeBlock });
}

///Asssigning the Image at editable Area  i.e showing image with cropper
function assignImageAtEditableArea(img){
   // clean result before
        result.innerHTML = '';
        // append new image
        result.appendChild(img);
        // show save btn and options
        save.classList.remove('hide');
        // options.classList.remove('hide');
        // init cropper
        cropper = new Cropper(img, { autoCropArea:autoCropArea});
}

///Assigning the image for previewing i. Svg Feild  and set value for body for image
function assignImageForPreview(assignid,h,w,e,same_image_assigned_another_place_idone,same_image_assigned_another_place_idtwo,assignImageone,assignImagetwo){
   if(document.getElementById(assignid).src !=''){
            $('#'+assignid).css('height',h);
            $('#'+assignid).css('width',w);
            assignImage.src = e.target.result;
            // chcek();
            hideLoader();
            if(same_image_assigned_another_place_idone !=undefined){
              assignImageone.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', e.target.result);
            }
            if(same_image_assigned_another_place_idtwo !=undefined){
             assignImagetwo.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', e.target.result);
            }
            $('#'+defaultActionTitle).css({'display':displayTypeNone});
            $('#'+imageEditSection).css({'display':displayTypeBlock});
            document.getElementById(current_id).value=e.target.result;
          }
          else{
            $('#'+imageEditSection).css({'display':displayTypeNone});
            $('#'+defaultActionTitle).css({'display':displayTypeBlock});
          }
}

//method for showing the loader
function showLoader()
{
  $("#"+preloader).css({"display":displayTypeBlock,"background":"#333 url('../images/DYALX.gif') no-repeat center center"});
}
//method for hiding or fading out the loader
function hideLoader()
{
  $("#"+preloader).css("display",displayTypeNone);
}



// saveevent is triggered here action crooping is done and save buuton is clicked image source is set at preview and other image paths if exists
if(save !=null)
{
save.addEventListener('click', function (e){
  e.preventDefault();
  var imgSrc = saveImageMethod();
  setImageToOtherImageFeilds(imgSrc);
});
}

/// Method for saving the image while cropping the image on button click
function saveImageMethod() {
  var imgSrc = cropper.getCroppedCanvas({}).toDataURL();
  document.getElementById(current_id).value = imgSrc;
   assignImage.src = imgSrc;
  return imgSrc;
}

//seeting images for current source at other common image paths
function setImageToOtherImageFeilds(imgSrc) {
  if (assignImageone != null) {
    assignImageone.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', imgSrc);
  }
  if (assignImagetwo != null) {
    assignImagetwo.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', imgSrc);
  }
}
 

{
  $(document).ready(function ()
  {
    
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



});
}


