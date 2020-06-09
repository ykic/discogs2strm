$(function () {
  // watch pjax
  const target = document.getElementById("pjax_container");
  if (target !== null) {
    const observer = new MutationObserver((records) => {
      console.log("update records");
      $("#artist").each(function () {
        console.log("artist dicography");
        const artist = $(
          "#page_content > div.profile > h1"
        ).text();
        const td = $(this).find(".title");
        td.each(function (i, e) {
          const title = $(e).children("a").text().trim();
          $(e).append(createSpotify(artist + " " + title));
          $(e).append(createAppleMusic(artist + " " + title));
          $(e).append(createBandcamp(artist + " " + title));
          $(e).append(createYouTube(artist + " " + title));
        });
      });
    });
    observer.observe(target, { childList: true });
  }

  // page - artist
  if (location.href.match("artist") !== null) {
    console.log("artist page");

    // profile
    const artist = $(
      "#page_content > div.lr.group > div.left > div > div.profile > h1"
    ).text();
    $("#page_content > div.lr.group > div.left > div > div.profile > h1").each(
      function (i, e) {
        console.log("artist profile");
        $(e).append(createSpotify(artist));
        $(e).append(createAppleMusic(artist));
        $(e).append(createBandcamp(artist));
        $(e).append(createYouTube(artist));
      }
    );

    // discography
    $("#artist").each(function () {
      console.log("artist dicography");
      const td = $(this).find(".title");
      td.each(function (i, e) {
        const title = $(e).children("a").text().trim();
        $(e).append(createSpotify(artist + " " + title));
        $(e).append(createAppleMusic(artist + " " + title));
        $(e).append(createBandcamp(artist + " " + title));
        $(e).append(createYouTube(artist + " " + title));
      });
    });
  }

  // page - release master
  if (
    location.href.match("release") !== null ||
    location.href.match("master") !== null
  ) {
    console.log("release page");

    // profile
    $("#profile_title").each(function (i, e) {
      console.log("release profile");
      const album = document.getElementById("profile_title").innerText.trim();
      $(e).append(createSpotify(album));
      $(e).append(createAppleMusic(album));
      $(e).append(createBandcamp(album));
      $(e).append(createYouTube(album));
    });

    // tracks
    const artist = $('#profile_title -> a')
    console.log(artist.text())
    $("#tracklist > div > table > tbody > tr").each(function (i, e) {
      console.log("release tracks");
      let trackArtist = $(e).find('td.tracklist_track_artists').text().slice(1).trim();
      if (trackArtist.length === 0) {
        trackArtist = $('#profile_title > span:nth-child(1) > span > a').text();
      }
      const track = $(e).find("span.tracklist_track_title").text().trim();
      const s = trackArtist + ' ' + track;

      $(e).append(createSpotify(s));
      $(e).append(createAppleMusic(s));
      $(e).append(createBandcamp(s));
      $(e).append(createYouTube(s));
    });
  }

  // page - label
  if (location.href.match("label") !== null) {
    // profile
    console.log("label page");
    const e = $("div.profile > h1");
    const label = $(e).text().trim();
    $(e).append(createSpotify(label));
    $(e).append(createAppleMusic(label));
    $(e).append(createBandcamp(label));
    $(e).append(createYouTube(label));

    // discography
    $("table.cards >tbody > tr.card").each(function (i, e) {
      const ea = $(e).find(".artist");
      const artist = $(ea).text().trim();
      $(ea).append(createSpotify(artist));
      $(ea).append(createAppleMusic(artist));
      $(ea).append(createBandcamp(artist));
      $(ea).append(createYouTube(artist));

      const ed = $(e).find(".title > a");
      const disc = $(ed).text().trim();
      $(ed).append(createSpotify(artist + " " + disc));
      $(ed).append(createAppleMusic(artist + " " + disc));
      $(ed).append(createBandcamp(artist + " " + disc));
      $(ed).append(createYouTube(artist + " " + disc));
    });
  }

  // page - label
  if (location.href.match("lists") !== null) {
    $("div.listitem_data > h3 > a").each(function (i, e) {
      const disc = $(e).text().trim();
      $(e).append(createSpotify(disc));
      $(e).append(createYouTube(disc));
      $(e).append(createBandcamp(disc));
    });
  }
});

// ** utils
function createSpotify(search) {
  const a = document.createElement("a");
  a.href = "https://open.spotify.com/search/" + search;
  a.target = "_blank";

  const img = createIcon("src/img/spotify.png");
  $(a).append(img);

  return a;
}

function createAppleMusic(search) {
  const a = document.createElement("a");
  a.href = "https://music.apple.com/search?term=" + search;
  a.target = "_blank";

  const img = createIcon("src/img/apple.png");
  $(a).append(img);

  return a;
}

function createYouTube(search) {
  const a = document.createElement("a");
  a.href = "https://www.youtube.com/results?search_query=" + search;
  a.target = "_blank";

  const img = createIcon("src/img/youtube.png");
  $(a).append(img);

  return a;
}

function createBandcamp(search) {
  const a = document.createElement("a");
  a.href = "https://bandcamp.com/search?q=" + search;
  a.target = "_blank";

  const img = createIcon("src/img/bandcamp.png");
  $(a).append(img);

  return a;
}

function createIcon(path) {
  const img = document.createElement("img");
  img.src = chrome.extension.getURL(path);
  img.width = 20;
  img.height = 20;
  img.padding = "10px";
  return img;
}
