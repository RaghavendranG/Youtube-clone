const videoCardContainer = document.querySelector(".video-container");
const searchCardContainer = document.querySelector(".search-container");
const videoPlayerContainer = document.querySelector(".video-player");
const channelContainer = document.querySelector(".channel-information");

const logo = document.querySelector(".logo");

const home = document.querySelector("#home");

home.onclick = () => {
    window.location.href = "https://youtube-clone-1dc686.netlify.app";
}

logo.onclick = () => {
    window.location.href = "https://youtube-clone-1dc686.netlify.app";
}
// const api_key = "AIzaSyDu4UEyxC_H_uB3fBT0zmLXhF-vwQ5Vb9o";

const api_key = "AIzaSyCvy9XW7OkErnAwe247RkJZDEth2-m0xKM";

let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";

fetch(
  video_http +
    new URLSearchParams({
      key: api_key,
      part: "snippet",
      chart: "mostPopular",
      maxResults: 50,
      regionCode: "IN",
    })
)
  .then((res) => res.json())
  .then((data) => {
    data.items.forEach((item) => {
      getChannelIcon(item);
    });
  })
  .catch((err) => console.log(err));

function getChannelIcon(video_data) {
  fetch(
    channel_http +
      new URLSearchParams({
        key: api_key,
        part: "snippet",
        id: video_data.snippet.channelId,
      })
  )
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      video_data.channelThumbnail =
        data.items[0].snippet.thumbnails.default.url;
      videoCard(video_data);
    });
}

function videoCard(data) {
  videoCardContainer.style.display = 'grid';
  videoCardContainer.innerHTML += `
    <div class="video" onclick="playVideo('${data}')">
        <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="">
        <div class="content">
            <img src="${data.channelThumbnail}" onclick="channelInformation('${data}')" class="channel-icon" alt="">
            <div class="info">
                <h4 class="title">${data.snippet.title}</h4>
                <p class="channel-name">${data.snippet.channelTitle}</p>
            </div>
        </div>
    </div>
    `;
}

function playVideo(data) {
    videoCardContainer.style.display = 'none';
    searchCardContainer.style.display = 'none';
    videoPlayerContainer.innerHTML += `
    <div class=container>
<iframe src="https://youtube.com/embed/watch?v='${data.id}'" width="700" height="400" frameborder="0" allowfullscreen">
</iframe>
</div>


`;
}

function channelInformation(info) {
    videoCardContainer.style.display = 'none';
    searchCardContainer.style.display = 'none';
    channelContainer.innerHTML = `
    <div class="video"
    <div class="content">
            <img src="${info.channelThumbnail}" class="channel-icon" alt="">
            <div class="info">
                <h2 class="title">${info.snippet.channelTitle}</h4>
                <p class="channel-name">${info.snippet.description}</p>
            </div>
        </div>
        </div>
    `;
}

const searchInput = document.querySelector(".search-bar");
const searchBtn = document.querySelector(".search-btn");
let searchLink =
  "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=&key=";



searchBtn.addEventListener("click", function() {
    searchCardContainer.innerHTML = " ";
    const searchValue = document.getElementById("searchVal").value;
    fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q='${searchValue}'&key=${api_key}`)
    .then((response) => response.json())
    .then((results) =>{
        results.items.forEach((items) => {
            ChannelIcon(items);
        });
      })
    .catch((error) => console.log(error));
  });

  function ChannelIcon(video_data) {
    fetch(
      channel_http +
        new URLSearchParams({
          key: api_key,
          part: "snippet",
          id: video_data.snippet.channelId,
        })
    )
      .then((res) => res.json())
      .then((data) => {
        video_data.channelThumbnail =
          data.items[0].snippet.thumbnails.default.url;
          searchCard(video_data);
      });
  }
  
  function searchCard(data) {
    videoCardContainer.style.display = 'none';
    searchCardContainer.style.display = 'grid';
    searchCardContainer.innerHTML += `
      <div class="video" onclick="playVideo('${data.id}')">
          <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="">
          <div class="content">
              <img src="${data.channelThumbnail}" onclick="channelInformation('${data}')" class="channel-icon" alt="">
              <div class="info">
                  <h4 class="title">${data.snippet.title}</h4>
                  <p class="channel-name">${data.snippet.channelTitle}</p>
              </div>
          </div>
      </div>
      `;
  }

  const subscription = document.querySelector("#subscription");
let subscriptionLink = "https://www.googleapis.com/youtube/v3/subscriptions?";

 