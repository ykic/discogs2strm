$(function () {
  // watch pjax
  const target = document.getElementById("pjax_container");
  if (target !== null) {
    const observer = new MutationObserver((records) => {
      console.log("update records");
      $("#artist").each(function () {
        console.log("artist dicography");
        const artist = $("#page_content > div.profile > h1").text();
        const td = $(this).find(".title");
        td.each(function (i, e) {
          const title = $(e).children("a").text().trim();
          createStreamingLinkIcons(e, artist + " " + title);
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
        createStreamingLinkIcons(e, artist);
      }
    );

    // discography
    $("#artist").each(function () {
      console.log("artist dicography");
      const td = $(this).find(".title");
      td.each(function (i, e) {
        const title = $(e).children("a").text().trim();
        createStreamingLinkIcons(e, artist + " " + title);
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
      createStreamingLinkIcons(e, album);
    });

    // tracks
    const artist = $("#profile_title -> a");
    console.log(artist.text());
    $("#tracklist > div > table > tbody > tr").each(function (i, e) {
      console.log("release tracks");
      let trackArtist = $(e)
        .find("td.tracklist_track_artists")
        .text()
        .slice(1)
        .trim();
      if (trackArtist.length === 0) {
        trackArtist = $("#profile_title > span:nth-child(1) > span > a").text();
      }
      const track = $(e).find("span.tracklist_track_title").text().trim();
      const s = trackArtist + " " + track;
      createStreamingLinkIcons(e, s);
    });
  }

  // page - label
  if (location.href.match("label") !== null) {
    // profile
    console.log("label page");
    const e = $("div.profile > h1");
    const label = $(e).text().trim();
    createStreamingLinkIcons(e, label);

    // discography
    $("table.cards >tbody > tr.card").each(function (i, e) {
      const ea = $(e).find(".artist");
      const artist = $(ea).text().trim();
      createStreamingLinkIcons(ea, artist);

      const ed = $(e).find(".title > a");
      const disc = $(ed).text().trim();
      createStreamingLinkIcons(ed, artist + " " + disc);
    });
  }

  // page - label
  if (location.href.match("lists") !== null) {
    $("div.listitem_data > h3 > a").each(function (i, e) {
      const disc = $(e).text().trim();
      createStreamingLinkIcons(e, disc);
    });
  }
});

// ** utils
function createStreamingLinkIcons(e, search) {
  $(e).append(createSpotify(search));
  $(e).append(createAppleMusic(search));
  $(e).append(createBandcamp(search));
  $(e).append(createYouTube(search));
}

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
