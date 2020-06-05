$(function () {
  // watch pjax
  const target = document.getElementById('pjax_container')
  if (target !== null) {
    const observer = new MutationObserver(records => {
      console.log('update records')
      $('#artist').each(function () {
        const td = $(this).find('.title');
        td.each(function (i, e) {
          const title = $(e).children('a').text().trim();
          const spotify = createSpotify(artist + ' ' + title);
          const youtube = createYouTube(artist + ' ' + title);
          $(this).append(spotify);
          $(this).append(youtube);
        });
      });
    })
    observer.observe(target, { childList: true })
  }

  // page - artist
  if (location.href.match('artist') !== null) {
    console.log('artist page')

    // profile
    const artist = $('#page_content > div.lr.group > div.left > div > div.profile > h1').text()
    $('#page_content > div.lr.group > div.left > div > div.profile > h1').each(function (i, e) {
      console.log('artist profile')
      const spotify = createSpotify(artist);
      const youtube = createYouTube(artist);

      $(e).append(spotify);
      $(e).append(youtube);
    });

    // discography
    $('#artist').each(function () {
      console.log('artist dicography')
      const td = $(this).find('.title');
      td.each(function (i, e) {
        const title = $(e).children('a').text().trim();
        const spotify = createSpotify(artist + ' ' + title);
        const youtube = createYouTube(artist + ' ' + title);

        $(e).append(spotify);
        $(e).append(youtube);
      });
    });
  }

  // page - release master
  if ((location.href.match('release') !== null) || (location.href.match('master') !== null)) {
    console.log('release page')

    // profile
    $('#profile_title').each(function (i, e) {
      console.log('release profile')
      const album = document.getElementById('profile_title').innerText.trim()
      const spotify = createSpotify(album);
      const youtube = createYouTube(album);

      $(e).append(spotify);
      $(e).append(youtube);
    });

    // tracks
    $('#tracklist > div > table > tbody > tr').each(function (i, e) {
      console.log('release tracks')
      const track = $(e).find('.track').text().trim();
      const spotify = createSpotify(track);
      const youtube = createYouTube(track);

      $(e).append(spotify);
      $(e).append(youtube);
    });
  }

  // page - label
  if (location.href.match('label') !== null) {
    console.log('label page')
    $('#page_content > div:nth-child(1) > div.left > div > div.profile').each(function (i, e) {
      console.log('label title')
      const ee = $(e).find('h1').text().trim();
      const label = $(ee).text().trim();
      const spotify = createSpotify(label);
      const youtube = createYouTube(label);

      $(ee).append(spotify);
      $(ee).append(youtube);
    });
  }

});

// ** utils
function createSpotify(search) {
  const a = document.createElement("a");
  a.href = 'https://open.spotify.com/search/' + search;
  a.target = "_blank";

  const img = createIcon('spotify.png');
  $(a).append(img);

  return a
}

function createYouTube(search) {
  const a = document.createElement("a");
  a.href = 'https://www.youtube.com/results?search_query=' + search
  a.target = "_blank";

  const img = createIcon('youtube.png');
  $(a).append(img);

  return a
}

function createIcon(path) {
  const img = document.createElement('img');
  img.src = chrome.extension.getURL(path);
  img.width = 20;
  img.height = 20;
  return img;
}