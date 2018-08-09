$(function()
    {
        $(document).ready(function ()
        {
         /// diable swipe for owl pages adhi
      
            $(".disable-owl-swipe").on("touchstart mousedown", function(e){
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
                      owelShow(defaultActionTitle,editableArea);
                      owelHide(richTextAreaFeild,imageEditSection,stockImagesId,backGrndID,nothingEditableId);
                       
                    }
                    $('.owl-controls .owl-page').eq(i)
                        .css({
                          'background':'url("' + productExplainerPageNavigationImageFilePath +i+ '.PNG' + '")',
                                'background-size': 'cover',
                            })
                });
            }

            $('.owl-page').click(function(event)
            {
                currentIndex = $('div.active').index();
                removeErrorMessage();
                if(currentIndex==3 || currentIndex==4 || currentIndex==6)
                {
                  owelShow(defaultActionTitle);
                //   owelHide(defaultActionTitle);
                 
                }
                else
                {
                  owelShow(defaultActionTitle);
                  owelHide(nothingEditableId);
                    
                }
                owelHide(richTextAreaFeild,imageEditSection);
                $('.box-2').css({'display':'none'}); 
                $('.box').css({'display':'none'});
                
                editor_object.removeAttr('customAttr');
                editor_object.removeAttr('customFiledAttr');
                resetRichTextArea();
            })

      

        
        })
    })
