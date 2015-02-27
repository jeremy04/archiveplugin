if ($('#wrap').length) {

    
    
    var myBox = $('.thats-right').find('.boxy').find('center');
    myBox.append('<h2>Songs</h2>');
    var myContent = $('<p class="value"/>');
    
    
    
    var list = $('#wrap').find('div:last-of-type').find('script:last-child').html().trim();
    var start = list.indexOf(',') +1; 
    var end = list.indexOf('{"start"'); 
    var finalList = list.substring(start, end).trim(); 

    finalList = finalList.substring(0, finalList.length-1) + ';'; 
    finalList = "var myList = "+finalList;
    eval(finalList);
    
    //console.log(finalList);
    
    
    var urls = []

    
    for (var i = 0; i < myList.length; i++) {  
        //console.log(myList[i].title + " -- " + myList[i].sources[0].file); 
 	 
        urls[i] = myList[i].sources[0].file;
 	 
        var str1 = "http://www.archive.org";
 	  
        var newUrl = str1.concat(urls[i]);
 	 
        //console.log(newUrl);
        myContent.append("<a href=\"" + newUrl + "\" class=\"downloadfile\" download>" + myList[i].title + "</a>");
        myContent.append("<br/>");
    }
    
    myBox.append("<input id=\"downloadAll\" type=\"button\" value=\"Download Show\" />");
    myBox.append(myContent);
 
    
    $('#downloadAll').click(function(){
        for (i = 0; i < myList.length; i++) {
        $('.downloadfile')[i].click();
        };
    });
    
}





else {


    var myBox = $('#col1').find('.box:first-child');
    myBox.append('<h2>Songs</h2>');
    var myContent = $('<p class="content"/>');

    var list = $('#midcol').find('script').html().trim();
    var start = list.indexOf(',') +1; 
    var end = list.indexOf('{"start"'); 
    var finalList = list.substring(start, end).trim(); 
    finalList = finalList.substring(0, finalList.length-1) + ';'; 
    finalList = "var myList = "+finalList;
    eval(finalList);

    var urls = []

    for (var i = 0; i < myList.length; i++) {  
        //console.log(myList[i].title + " -- " + myList[i].sources[0].file); 
 	 
        urls[i] = myList[i].sources[0].file;
 	 
        var str1 = "http://www.archive.org";
 	  
        var newUrl = str1.concat(urls[i]);
 	 
        //console.log(newUrl);
        myContent.append("<a href=\"" + newUrl + "\" class=\"downloadfile\" download>" + myList[i].title + "</a>");
        myContent.append("<br/>");
    }

    myBox.append("<input id=\"downloadAll\" type=\"button\" value=\"Download Show\" />");                 
    myBox.append(myContent);
    
    
    $('#downloadAll').click(function(){
        for (i = 0; i < myList.length; i++) {
        $('.downloadfile')[i].click();
        };
    });
    
   
        
}