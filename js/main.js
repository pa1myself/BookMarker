document.getElementById('myform').addEventListener('submit', saveBookmark);

function saveBookmark(e){
  
 var SiteName = document.getElementById('SiteName').value;
 var SiteUrl = document.getElementById('SiteUrl').value;

 if(!validateForm(SiteName, SiteUrl)){
    return false;
  }


 var bookmark = {
     name: SiteName,
     url: SiteUrl
 }

 if(localStorage.getItem('bookmarks') === null){
    var bookmarks = [];
    bookmarks.push(bookmark);
   
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  document.getElementById('myform').reset();

  fetchBookmarks();


 e.preventDefault();
}

function deleteBookmark(url){
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        for(var i =0;i < bookmarks.length;i++){
          if(bookmarks[i].url == url){
            bookmarks.splice(i, 1);
          }
        }
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

        fetchBookmarks();

 }


function fetchBookmarks(){

    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    var bookmarksResults = document.getElementById('bookmarksResults');
  

    bookmarksResults.innerHTML = '';
    for(var i = 0; i < bookmarks.length; i++){
      var name = bookmarks[i].name;
      var url = bookmarks[i].url;

      
    bookmarksResults.innerHTML +=   '<div class="well">'+
                                      '<h3>'+name+
                                      ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> ' +
                                      //' <a class="btn btn-default" target="_blank" href="'+addhttp(url)+'">Visit</a> ' +
                                      ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' +
                                      '</h3>'+
                                      '</div>';
   

    }
}


function validateForm(SiteName, SiteUrl){
    if(!SiteName || !SiteUrl){
        alert('Please fill in the form');
        return false;
    }
    
    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    
    if(!SiteUrl.match(regex)){
      alert('Please use a valid url');
      return false;
    }

    return true;
}