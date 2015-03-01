
  function deferredAddZip(url, filename, zip) {
    var deferred = $.Deferred();
    JSZipUtils.getBinaryContent(url, function (err, data) {
        if(err) {
            deferred.reject(err);
            console.log(err);
        } else {
            zip.file(filename, data, {binary:true});
            deferred.resolve(data);
        }
    });
    return deferred;
  }

  function download_all(urls) 
  {
    var zip = new JSZip();
    var deferreds = [];

    $.each(urls, function(k,v) {
      var song = JSON.parse(v)
      var url = song.sources[0].file;
      var full_url = "https://archive.org" + url;
     
      // 64kbps support not working yet...
      // if ($(".content:contains('64kbps')").size() > 0) {
      //  full_url = full_url.replace(".mp3","_64kb.mp3");
      // }
     
      var title = url.substring(url.lastIndexOf('/')+1);
      deferreds.push(deferredAddZip(full_url, title, zip));
    });
    
    $.when.apply($, deferreds).done(function () {
      var blob = zip.generate({type:"blob"});
      $("#downloadAll").prop("disabled",false);
      $("#progress").text("Compressing: Finished");
      var url = window.location.pathname;
      var show = url.substring(url.lastIndexOf('/')+1);
      saveAs(blob, show + ".zip");

    }).fail(function (err) {
      console.log("Ahh craig:" + err);
    });

 }



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

    var list = $('#midcol').find('script').html();
    var myList = list.match(/\{\"title\"(.*?\}\]\})/g);  

    for (var i = 0; i < myList.length; i++) {
        var song = JSON.parse(myList[i])
        var newUrl = "http://www.archive.org".concat(song.sources[0].file);
 	    myContent.append("<a href=\"" + newUrl + "\" class=\"downloadfile\" download>" + song.title + "</a>");
        myContent.append("<br/>");
    }

    myBox.append("<input id=\"downloadAll\" type=\"button\" value=\"Download Show\" />");                 
    myBox.append(myContent);
    
    
    $('#downloadAll').click(function(){
        $("#downloadAll").prop("disabled",true);
        if ($("#progress").length == 0) {
            $("<div id='progress'></div>").insertAfter("#downloadAll");
        }
        download_all(myList);
    });
    
   
        
}