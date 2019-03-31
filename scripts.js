var _curPage = "home";
var _prevPage = "";
var _clicked; //img.id of _clicked thumbnail
var _firstImgIdx = 0; //first of those displayed on the screen
var _picsPerPage = 6;

/* brief: click event handler
 * params: page - string specifying <main>'s id             */
function nav(page)
{
  _prevPage = _curPage;
  _curPage = page;
  _firstImgIdx = 0; //reset whenever naving to new page
  hideAll(); //hide all <main>s
  showFull(false); //hide fullscreen popup

  document.getElementById(_prevPage + "_menuBtn").classList = "";
  document.getElementById(_curPage + "_menuBtn").classList = "curPage";

  switch(page)
  {
    case 'home':
      document.getElementById('home_symbiosisImg').src = 'photos/symbiosis/' + PHOTOS.symbiosis[0];
      document.getElementById('home_museImg').src = 'photos/muse/' + PHOTOS.muse[0];
      document.getElementById('home_odysseyImg').src = 'photos/odyssey/' + PHOTOS.odyssey[0];
      document.getElementById('home_communeImg').src = 'photos/commune/' + PHOTOS.commune[0];
      document.getElementsByTagName('nav')[0].style.display = "none";
    case 'about':
      document.getElementById(page).style.display = 'block';
    break;

    case 'commune': 
    case 'muse': 
    case 'odyssey': 
    case 'symbiosis':
      document.getElementById('gallery').style.display = 'block';
      loadGallery();
    break;

    default:
      console.log(page + " not found");
    break;
  }
}

/* brief: loads "thumbnail" images into <main> */
function loadGallery()
{
  var galleryDiv = document.getElementById('photos');

  //remove any imgs currently being displayed
  if(galleryDiv.hasChildNodes)
  {
    var g = galleryDiv.childNodes.length - 1;
    for( ; g >= 0; g--)
    {
      galleryDiv.removeChild(galleryDiv.childNodes[g]);
    }
  }

  //display requested set of images
  var i = _firstImgIdx;
  var len = PHOTOS[_curPage].length;
  do
  {
    var fig = document.createElement('figure');
    fig.className = 'gallery';
    galleryDiv.appendChild(fig);
    var img = document.createElement('img');
    fig.appendChild(img);
    img.id = i;
    img.alt = _curPage + ' pic' + i;
    img.src = 'photos/' + _curPage + '/' + PHOTOS[_curPage][i];
    img.onclick = function()
    {
      _clicked = this.id;
      showFull(true);
    }
    i++;
  } while(i < _firstImgIdx+_picsPerPage && i < len);

  //only show nav arrows if they're relevant
  if(_firstImgIdx === 0)
  {
    document.getElementById('left').style.display = 'none';
  }
  else
  {
    document.getElementById('left').style.display = 'block';
  }

  if(_firstImgIdx >= len-_picsPerPage)
  {
    document.getElementById('right').style.display = 'none';
  }
  else
  {
    document.getElementById('right').style.display = 'block';
  }
}

/* brief: loads the next set of "thumbnails"
 * params: direction - string indicating inc/decrement pic index */
function slide(direction)
{
  switch(direction)
  {
    case 'left':
      _firstImgIdx -= _picsPerPage;
      if(_firstImgIdx < 0) _firstImgIdx = 0;
    break;

    case 'right':
      var lastIdx = PHOTOS[_curPage].length - _picsPerPage;
      _firstImgIdx += _picsPerPage;
      if(_firstImgIdx > lastIdx) _firstImgIdx = lastIdx; //will display max pics possible
      if(_firstImgIdx < 0) _firstImgIdx = 0;
    break;

    default:
      console.log(direction + " is not a valid slide direction");
    break;
  }
  loadGallery();
}

/* brief: "thumbnail" onclick event; loads the pic selected in fullscreen mode
 * params: show - boolean to toggle fullscreen mode                         */
function showFull(show)
{
  var popupDiv = document.getElementById('fullscreen');

  if(show)
  {
    popupDiv.style.display = 'block';
    var curPicIdx = parseInt(_clicked);
    var fullImage = document.getElementById('fullPhoto');
    fullImage.alt = _curPage + ' pic' + curPicIdx;
    fullImage.src = 'photos/' + _curPage + '/' +PHOTOS[_curPage][curPicIdx];
    document.getElementsByTagName('nav')[0].style.display = "none";
    document.getElementById('fullNav').style.display = "block";
  }
  else
  {
    popupDiv.style.display = 'none';
    document.getElementsByTagName('nav')[0].style.display = "block";
    document.getElementById('fullNav').style.display = "none";
  }
}

/* brief: onclick handler for fullscreen nav buttons
 * params: dir - string cmd to inc/decrement pic idx */
function fullNav(dir)
{
  var prevBtn = document.getElementById('prev');
  var nextBtn = document.getElementById('next');
  nextBtn.style.display = 'inline-block';
  prevBtn.style.display = 'inline-block';
  switch(dir)
  {
    case 'prev':
      _clicked--;
      if(_clicked <= 0)
      {
        _clicked = 0;
        prevBtn.style.display = 'none';
      }
      showFull(true);
      break;
    case 'next':
      _clicked++;
      lastIdx = PHOTOS[_curPage].length - 1;
      if(_clicked >= lastIdx)
      {
        _clicked = lastIdx;
        nextBtn.style.display = 'none';
      }
      showFull(true);
      break;
    case 'exit':
      showFull(false);
      break;
    default: break;
  }
}

function hideAll()
{
  var pages = document.querySelectorAll('main');
  for(var i=0; i < pages.length; i++)
  {
    pages[i].style.display = 'none';
  }
}
