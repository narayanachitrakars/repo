var preloader='preloader',
 editableArea='editableAreaId',
 textEditorId='textEditorId',
 defaultActionTitle='defaultActionTitle',
 imageEditSection='imageEditSectionId',
 errmsg='errmsgId',
 currentCustomAttr='textCustomAttr',
 currentCustomFiledTypeAttr='textCustomFiledTypeAttr',
 currentIndex,
 editor_object,
 browser,
 charlen,
 latest_keycode,
 expand_size,
 svgFeildType='text',
 autoCropArea=1,
 placeHolder = 'actionTitle',
 imageViewBox ='box',
 imageViewForCrop='box-2',
 showPopUpForAddTitles = 'showPopUpForAddTitles',
 richTextAreaFeild = 'summernote_textarea',
 circleFocusId = 'focus_id',
 videoUploadDivId = 'video_upload_div_id',
 subTitleUploadFromLocalMechineId = 'upoad_subtitles_from_local_mechine',
 stockImagesId = 'stock_images_div',
 backGrndID ='bg_div',
 chooseVideoFileId='chooseVideoFileId',
 srtFileid='srtFileid',
 chooseSubtitleFileId='chooseSubtitleFileId',
 imagePlaceForCrop='imagePlaceForCrop',
 WeddingVenueName='Wedding_venue_name',
 dateTimePickerId='date_time_picker_id',
 chooseSubtitleFile='ptag_for_subtitle',
 currentDate='cureentDate',
 dateTimePicker='datetimepicker',
 weddingDateAndTime='wedding_Date_and_time',
 weddingDateTime='wedding_data_time',
 nothingEditableId='ntngEditable',
 save='save';


//Company profile Id extra

addIcons = 'addIconsID',
addMembers ='addMemDetails',
addService ='addServiceID';



 /////////////////////////////

 var zeroIndex=0;
 var conditionalZero=0;


 ////////////////////////////expresiions

 var regExForFindPtag=/<\/p>/gi;
 var regExForFingBRtag=/<br\/?>/gi;
 var regExForFindAllSpaces=/(?:<[^>]*>|&nbsp;)/g;
 var newLine="\n";
 var nullValue='';
 var space='&nbsp;';
 var regExForRemoveAMP=/amp;/g;

 var regExForImageTypeValidation=/^image\/(jpg|png|jpeg)$/;
 var regExForVideoTypeValidation=/^video\/(mp4|mov)$/;



 ///////////////////////////////////////
 // error message//
 var errorMessageOnExceedsCharacterLength="Character's should be  max length of";


 ///////////////////////////////

//keycodes//

var backspace=8;


//styles

var widthZero=0;

var setTimeOutvalue=1;
var backGroundColorKey='background-color';
var backGroundPaleSlateColorvalue='#C1C0BF';
var transparentColor='transparent';
var displayTypeBlock='block';
var displayTypeNone='none';
//class names

var highlight='highlight';



////ids of svg

var problemStatement='problemStatement',
solutionOffered='solutionOffered',
editImagetoVideo='editImagetoVideo',
videoPlayer='player',
videoSourceId='videoSourceId';



//video id 

// var videoFileUploadId
var month = new Array();
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";



//Summer note events

var richTextAreaFocus='summernote.focus',
	richTextAreaPaste='summernote.paste',
 	richTextAreaKeyUp='summernote.keyup',
 	richTextAreaKeyDown='summernote.keydown',
 	richTextAreaChange='summernote.change';



////demovide classname
var PlayDemoVideo='PlayDemoVideo';

//var globalURL='http://35.200.212.125:80';
var globalURL='http://api.videoinaclick.com:80';
