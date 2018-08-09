/* highlighting the text feild(SVG) on mouse hover */
function mousehoverEvent(id)
{
	if( $('#'+id).hasClass(highlight))
	{}
	else
	{
		var li = document.getElementById(id);
		// alert(li.className);
		// document.getElementById(id).classList.add("democlass");
		// $('#'+id).attr('class','st1 st2 focusArea');

// alert(li.className);
 		$('#'+id).css({'background-color':'#C1C0BF'});
 	}
}  

/* dishightlighting the text feild(SVG) on mouse leave */
function mouseleaveEvent(id)
{
 if( $('#'+id).hasClass(highlight)){}
 else
 {
    $('#'+id).css({'background-color':'transparent'});
 }
}

