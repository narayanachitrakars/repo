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
                      owelHide(richTextAreaFeild,imageEditSection,stockImagesId,backGrndID,nothingEditableId,addIcons,addMembers,addService);
                      }
                    $('.owl-controls .owl-page').eq(i)
                        .css({
                          'background':'url("' + comapnyProfilePageNavigationImageFilePath +i+ '.PNG' + '")',
                                'background-size': 'cover',
                            })
                });
            }

            $('.owl-page').click(function(event)
            {
                currentIndex = $('div.active').index();
                removeErrorMessage();
                owelShow(defaultActionTitle);
                owelHide(addService,addMembers,addIcons);
                owelHide(richTextAreaFeild,imageEditSection);
                switch(currentIndex) {
                    case 4:
                    owelShow(addService);
                    owelHide(addIcons,addMembers);
                        break;
                    case 6:
                    owelShow(addIcons);
                    owelHide(addService,addMembers);
                        break;
                    case 7:
                    owelShow(addMembers);
                    owelHide(addService,addIcons);
                        break;
                       
                }

               
               
                $('.box-2').css({'display':'none'}); 
                $('.'+imageViewBox).css({'display':'none'});
                
                editor_object.removeAttr('customAttr');
                editor_object.removeAttr('customFiledAttr');
                resetRichTextArea();
            })
        
        })
    })

    function addServ(val){
 
        hideorShowServices( parseInt(document.getElementById("mySelect").value));
        }
       
       //For hidding showing the services on drop down
        function hideorShowServices(id){
            for(i = 2 ; i <= id ;i++){
       
               $('#Hand'+ i).css({'display':'block'});
                $('#services'+ i).css({'display':'block'});
                // $('#btnmin'+ i).css({'display':'block'});
             }
            
              for(i = id + 1 ; i <= 6 ;i++)
             {        
              $('#Hand'+ i).css({'display':'none'});
                $('#services'+ i).css({'display':'none'});
                // $('#btnmin'+ i).css({'display':'none'});
            }
        }
       
       
       
       function addIconsParent(val){
        
        addOrRemoveIcons(parseInt(document.getElementById(val).value) );
        }
       //For hidding showing the logo on drop down
        function addOrRemoveIcons(id){
        
        for(i = 2 ; i <= id ;i++){
       
               $('#fidclient_'+ i).css({'display':'block'});
               
             }
            
              for(i = id + 1 ; i <= 6 ;i++)
             {        
              $('#fidclient_'+ i).css({'display':'none'});
            }
       
        }
       function addMember(val){ 
        addOrRemoveMember(parseInt(document.getElementById(val).value) );
        }
       //For hidding showing the logo on drop down
        function addOrRemoveMember(id){
        
        console.log("meme");
        for(i = 2 ; i <= id ;i++){
       
               $('#member_'+ i).css({'display':'block'});
                $('#designation_'+ i).css({'display':'block'});
                 $('#name_'+ i).css({'display':'block'});
               
             }
            
              for(i = id + 1 ; i <= 5 ;i++)
             {        
               $('#member_'+ i).css({'display':'none'});
                $('#designation_'+ i).css({'display':'none'});
                 $('#name_'+ i).css({'display':'none'});
            }
       
        }
