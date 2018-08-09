var currentIndex;
var editor_object;
var browser;
var charlen;
var assign_chracter_name_to_other_id;
var assign_poducts_name_to_other_id;
var expand_size;
var pasteFalg;

$(function () {
    $(document).ready(function () {
        intialHideShow();
        //Default initialization of richtext editor
        editor_object = $('#'+textEditorId).summernote({
            disableDragAndDrop: true,
            placeholder: 'Write here...',
            focus: true,
            toolbar: [
                ['style', ['bold', 'italic', 'underline', 'clear']],
                ['font', ['strikethrough', 'superscript', 'subscript']],
                ['fontsize', ['fontsize']],
            ]

        });

        //end


        //Focus event for richtext editor
        /*here we are heighlighting background color of svg editable feilds */
        $('#' + textEditorId).on(richTextAreaFocus, function (event) {
            onFocusTextAreaMethod();
        });
        
		function onFocusTextAreaMethod() {
            if (editor_object[zeroIndex].attributes.customAttr != undefined) {
                setBackgroundColorOnFocus(editor_object[zeroIndex].attributes.customAttr.value);
            }
        }

		//Set the background color on svg ids

        function setBackgroundColorOnFocus(id){
                    var bgColor;
                    var borderColor;
                    var borderStyle;
                	bgColor=backGroundPaleSlateColorvalue;
                	$('#' + id).addClass(highlight);
			        $('#'+id).css({ 'background-color': bgColor, 'border-color': borderColor, 'border-style':borderStyle});
			 }
        //end

        // For remove the backgroung highlight on click on anywhere
        $(document).click(function (event) {
            onClickDocUnhighlight( event);
        });

        //method for on click on anywhere for un hightlighting the action
        function onClickDocUnhighlight( event) {
            var highlightText = $("." + highlight).attr('id');
            removeFocusOnClick(event, highlightText);
        }
        
        // Method for removing the background highlight
        function removeFocusOnClick(event,highlightText){
        	if ($("#" + highlightText).hasClass(highlight)) { //Check  wheather classname is exist or not
                     if (event.target.id != highlightText) { //Verify wheather click is on same element or not
                        if (event.currentTarget.activeElement.className != 'note-editable') {
                            $("#" + highlightText).removeClass(highlight);
                            $('#' + highlightText).css({ 'background-color': 'transparent' });
                        }
                    }
                }
        }
        

        

        //Dynamic text change event
        //update svg text value and its width based on characters
        $('#' + textEditorId).on(richTextAreaChange, function () {
            onTextChangeMethod();
        });


        
        function onTextChangeMethod() {

            var textValue = $('#' + textEditorId).summernote('code').replace(regExForFindPtag, newLine)
                .replace(regExForFingBRtag, newLine)
                .replace(regExForFindAllSpaces, "")
                .replace(regExForRemoveAMP, "");

            if (editor_object[zeroIndex].attributes.customAttr != undefined) {
                // alert(document.getElementById(editor_object[zeroIndex].attributes.customAttr.value).scrollHeight);
                if (assign_chracter_name_to_other_id != undefined) {
                	if(document.getElementById(assign_chracter_name_to_other_id)=='[object HTMLInputElement]')
                	{
                	document.getElementById(assign_chracter_name_to_other_id).value = textValue;	
                	}
                	else
                	{
                	document.getElementById(assign_chracter_name_to_other_id).textContent = textValue;
                	}
                   
                }
                if (assign_poducts_name_to_other_id != undefined) {
                    document.getElementById(assign_poducts_name_to_other_id).textContent = textValue;
                }
                if (editor_object[zeroIndex].attributes.customFiledAttr.value == svgFeildType) {
           
                    dynamicUpdateAndResizeOfTextFeild(editor_object[zeroIndex].attributes.customAttr.value, textValue);
                }
                else {
                    dynamicUpdateAndResizeOfTextArea(editor_object[zeroIndex].attributes.customAttr.value, textValue);
                }
            }
        }
        //Assign text value for preview(textFileds) and dynamically set width to text(SVG)
		function dynamicUpdateAndResizeOfTextFeild(id,value){
			document.getElementById(id).value = value;
            var textbox = document.getElementById(id);
            chcek();
		    if (!textbox.startW) { textbox.startW = textbox.offsetWidth; }
		    var style = textbox.style;
		    style.width = widthZero;
		    var desiredW = textbox.scrollWidth;
		    // desiredW += textbox.offsetHeight;
		    style.width = Math.max(desiredW, textbox.startW) + 'px';
		}
		//Assign text value for preview(textArea) and dynamically set width to textArea(SVG)
		function dynamicUpdateAndResizeOfTextArea(id,value){
			document.getElementById(id).value = value;
             var textbox = document.getElementById(id);
             chcek();
             // alert(textbox.scrollHeight);
            // if (!textbox.startH) { textbox.startH = textbox.offsetHeight; }
            // var style = textbox.style;
            // style.height = widthZero;
            // var desiredW = textbox.scrollWidth;
            // desiredW += textbox.offsetHeight;
            // style.width = Math.max(desiredW, textbox.startW) + 'px';
			// alert(document.getElementById(id).style.height);
            // alert(document.getElementById(id).scrollHeight);
			 $(document.getElementById(id)).outerHeight(expand_size).outerHeight(document.getElementById(id).scrollHeight);
		    // document.getElementById(id).style.height=expand_size+'px';
		    // setTimeout(function () {
      //           // if(document.getElementById(id).scrollHeight>50)
      //           // {
      //             document.getElementById(id).style.height = (document.getElementById(id).scrollHeight) + "px";  
      //           // }
		        
		    // // alert(document.getElementById(id).scrollHeight-expand_size);
      //       }, setTimeOutvalue);
		}


		//end

		//Keydown event for rich texteditor
		//Max length validation 
        $('#' + textEditorId).on(richTextAreaKeyDown, function (we, e) {
            onTextKeyDown(e);
        });
        
        //method for text key down method where validations for max characters
        function onTextKeyDown(e) {
            
            var id=document.getElementById(editor_object[zeroIndex].attributes.customAttr.value);
            latest_keycode = e.keyCode;
            var t = e.currentTarget.innerText;
            chcek();
            // console.log((document.getElementById(editor_object[zeroIndex].attributes.customAttr.value).value).length);
           if (t.length >= charLength) {
                //delete key
                if (e.keyCode != backspace) {
                    e.preventDefault();
                }
                throwErrorMessage(charLength);
            }
            // else {
            //     // console.log('down:'+t.length);
            //     removeErrorMessage();
            // }
        }
        //end

    	//Keyup event for rich texteditor
		//Max length validation 
            $('#' + textEditorId).on(richTextAreaKeyUp, function (we, e) {
                onTextKeyUp(e);
                chcek();
             });

             //method for text key up  method where validations for max characters
            function onTextKeyUp(e) {
                var t = e.currentTarget.innerText;
                if (t.length >= charLength) {
                    throwErrorMessage(charLength);
                }
                else {
                     // console.log('up:'+t.length);
                    removeErrorMessage();
                }
            }

            //end


 			/*  key paste event for rich text editor
              Passing the valid character length on richtext area 
			*/
            $('#' + textEditorId).on(richTextAreaPaste, function (ev, e) {
                onTextPasteMethod(e);
            });
            
             //method for text paste here we are pasting up to the valid charcters based on buffer length
            function onTextPasteMethod(e) {
                // pasteFalg=true;
                var t = e.currentTarget.innerText;
                var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
                e.preventDefault();
                var maxPaste = bufferText.length;
                if (t.length + bufferText.length > charLength) {
                    maxPaste = charLength - t.length;
                    // textlengthAtPaste=maxPaste;
                 // console.log('maxPaste:'+maxPaste);
                    throwErrorMessage(charLength);
                }
                else {
                    removeErrorMessage();
                }
                if (maxPaste > conditionalZero) {
                    // textlengthAtPaste=maxPaste;
                    // console.log('maxPaste1:'+maxPaste);
                    throwErrorMessage();
                    document.execCommand('insertText', false, bufferText.substring(0, maxPaste)); 
                   // document.execCommand('insertText', false, "");
                }
            }
            //end

        });
});


/* Set initial display on page load */
function intialHideShow() {	
    $('#' + editableArea).css({ 'display': displayTypeBlock });
    // $('.box-2').css({'display':'none'}); 
    $('.'+ imageViewBox).css({ 'display': displayTypeNone });
    $('#' + showPopUpForAddTitles).css({ 'display': displayTypeNone });
    $('#'+ richTextAreaFeild).css({ 'display': displayTypeNone });
    $('#'+ circleFocusId).css({ 'display': displayTypeNone });
    $('#' + imageEditSection).css({ 'display': displayTypeNone });
    $('#'+ videoUploadDivId).css({ 'display': displayTypeNone });
    $('#'+subTitleUploadFromLocalMechineId).css({ 'display': displayTypeNone });
    $('#'+stockImagesId).css({ 'display': displayTypeNone });
    $('#'+backGrndID).css({ 'display': displayTypeNone });
    $('#' + defaultActionTitle).css({ 'display': displayTypeBlock });
}



/* here On click on svg text feild > hightlight's the Rich text area to edit ..
we are updating the text in svg to Rich text feild (if text exist's) for previewing
*/
function dataPreview(id, charlen, type_of_textfiled, size_from_textfiled, assignTo, assign_poducts_name) {
    removeErrorMessage();
    assignVariableOnClickOnTextPreview(size_from_textfiled, assign_poducts_name, assignTo, charlen); //asigning the char length for validation globally
    hideShowWeddingVenueNameAndDateTime(id);
    hideShowElement(id); //hiding and showing the elements when click on text feild of SVG
    removeAssignedCusttomAttr();
    updateTextArea(id, type_of_textfiled);//updating text from SVG to richtextarea
}
function hideShowWeddingVenueNameAndDateTime(id)
{
if (id==WeddingVenueName) {
        $("#"+dateTimePickerId).hide();
    }
}
function assignVariableOnClickOnTextPreview(size_from_textfiled, assign_poducts_name, assignTo, charlen) {
    expand_size = size_from_textfiled;
    assign_poducts_name_to_other_id = assign_poducts_name;
    assign_chracter_name_to_other_id = assignTo;
    charLength = charlen;
}

/* hide and show the display and setting hightlight on text editor click */
function hideShowElement(id) {
    var highlightText = $("."+highlight).attr('id');
    if ($("#" + highlightText).hasClass(highlight)) {
        if (id != highlightText) {
            $("#" + highlightText).removeClass(highlight);
            $('#' + highlightText).css({'background-color': transparentColor });
        }
    }
    $("#" + id).addClass(highlight);
$('#' + defaultActionTitle).css({ 'display': displayTypeNone });
$('#'+richTextAreaFeild).css({ 'display': displayTypeBlock });
$('#' + imageEditSection).css({ 'display': displayTypeNone });
$('#'+stockImagesId).css({ 'display': displayTypeNone });
}
 
//removing assigned custom attributed on page click or different removing when click one text feild(svg ) to other text feild
function removeAssignedCusttomAttr(){
	editor_object.removeAttr('customAttr');//removing custom attr on click
    editor_object.removeAttr('customFiledAttr');
}
/* updating text from SVG to richtextarea 
setting current Id to custom attribute
*/
function updateTextArea(id, typeOfTextFiled) {
    var updated_val = document.getElementById(id).value.split("\n").join("<br/>");
   
    // .replace(regExForFindPtag, newLine)
    //             .replace(regExForFingBRtag, newLine)
    //             .replace(regExForFindAllSpaces, "");
    resetRichTextArea();
   $('#'+textEditorId).summernote({focus:true});
    $('#' + textEditorId).summernote('code', updated_val);
    // var data = $('#'+textEditorId).val();
    // var emoticon = ':)';
    $('#'+textEditorId).val();
    $('#'+textEditorId).focus();
    // $('.note-editable').find('[contenteditable]').placeCursorAtEnd();
//     var range = $('#'+textEditorId).summernote('createRange');
//     $('#'+textEditorId).summernote('saveRange');
// // move cursor and select another
// $('#'+textEditorId).summernote('restoreRange');
     // $('#' + textEditorId).find('[contenteditable]').placeCursorAtEnd();
moveCursorToEnd($(id));


     // var originalValue = updated_val.val();
    // updated_val.val('');
    // updated_val.blur().focus().val(originalValue);
    // var $el = document.getElementById('textEditorId').$el;
// $el.find('[contenteditable]').placeCursorAtEnd();
    var richTextAreaObject = document.getElementById(textEditorId);

    setCustomeAttribute(richTextAreaObject,id,typeOfTextFiled);
    
    if (editor_object[zeroIndex].attributes.customAttr != undefined) {
    	setSelectedFieldTitleToEditArea(editor_object[zeroIndex].attributes.customAttr.value);      
    }
}
//function
function moveCursorToEnd(input) {
    var originalValue = input.val();
    input.val('');
    input.blur().focus().val(originalValue);
}
//reseting the rich text area ..empty the text area 
function resetRichTextArea(){
	$('#' + textEditorId).summernote('reset');
}

///Setting custom attribute while updating the text to text area ...here we are assigning id of svg to custom atribute and also type type of text feild
function setCustomeAttribute(richTextAreaObject,id,typeOfTextFiled){
	richTextAreaObject.setAttribute("customAttr", id);
    richTextAreaObject.setAttribute("customFiledAttr", typeOfTextFiled);
}

//here we setting the ttitle for current action  i.e where the current feild action takes place ... above text area 
function setSelectedFieldTitleToEditArea(id){
	  var currentFeildTitle = $('#'+id);
        $('#'+placeHolder).text(currentFeildTitle[zeroIndex].placeholder);
}
//end


//Validation error method on execeding of char limit
function throwErrorMessage(charlen) {
    $("#" + errmsg).html(errorMessageOnExceedsCharacterLength + space + charlen).show();
}

//Validation fadeout method on decresing of char limit i.e not showing the error 
function removeErrorMessage() {
    $("#" + errmsg).html("").show().fadeOut("slow");
}

function chcek()
{
   
  var textBoxStatus;
  var imgStatus;
//   var filledDetailsStatus;
for(var i=0;i<ids.length;i++){
//   alert(document.getElementById(ids[i]).value);
  if(document.getElementById(ids[i]).value!=''){

    // document.getElementById("myCheck").checked=false;
    textBoxStatus=true;
    document.getElementById("myCheck").checked=true;
   
  }
  else{
    
    
    // textBoxStatus=false;
    // document.getElementById("myCheck").checked=false;
  }
}

if(imgids[0]!=''){
    for(var i=0;i<imgids.length;i++){
        if(document.getElementById(imgids[i]).src.split('/')[0]!='http:'){
          // document.getElementById("myCheck").checked=true;
          imgStatus=true;
          document.getElementById("myCheck").checked=true;
        }
        else{
         
          // imgStatus=false;
          // document.getElementById("myCheck").checked=false;
        }
      }
}

if(textBoxStatus==true || imgStatus==true){
  
  document.getElementById("myCheck").checked=true;
  document.getElementById("filledDetailsStatus").value=true;
  
  $('#saveId').prop('type','submit');
  $("#errorMessage").removeClass("alert alert-danger");
  $("#errorMessage").html("").show().fadeOut("slow");
}
else{
    $("#errorMessage").addClass("alert alert-danger");
    $("#errorMessage").html('Please fill the details').show();
}
}