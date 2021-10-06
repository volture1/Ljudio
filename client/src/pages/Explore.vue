<template>
  <div class="explore">
    <div class="top">
      <h4 class="pagetitle">Explore</h4>
    </div>
    <h3 class="title-new">New</h3>
    <div class="section" v-if="this.newContent">
      <div class="new-section" v-for="content in newContent.items" :key="content">
        <div class="content-card">
          <div class="thumbnail-wrap">
            <img :src="content.snippet.thumbnails.high.url" class="thumbnail" alt="">
          </div>
          <div class="details-wrap">
            <div class="details-top">
              <div class="source">
                <YTicon />
                <p class="sourcename">Youtube</p>
              </div>
              <div class="options-btns">
                <div class="option-btn"></div>
                <div class="option-btn"></div>
                <div class="option-btn"></div>
              </div>
            </div>
            <div class="details-middle">
              <p class="title">{{truncate(content.snippet.title, 25)}}</p>
              <p class="uploader">{{content.snippet.channelTitle}}</p>
              <p class="description">{{truncate(content.snippet.description, 50)}}</p>
            </div>
            <div class="details-bottom">
              <p class="date">{{formatDate(content.snippet.publishTime)}}</p>
              <Playbutton class="playbtn"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <h3 class="title-view">Viewed</h3>
    <div class="section" v-if="highViewContent">
      <div class="viewed-section" v-for="content in highViewContent.items" :key="content">
        <div class="content-card">
          <div class="thumbnail-wrap">
            <img :src="content.snippet.thumbnails.high.url" class="thumbnail" alt="">
          </div>
          <div class="details-wrap">
            <div class="details-top">
              <div class="source">
                <YTicon />
                <p class="sourcename">Youtube</p>
              </div>
              <div class="options-btns">
                <div class="option-btn"></div>
                <div class="option-btn"></div>
                <div class="option-btn"></div>
              </div>
            </div>
            <div class="details-middle">
              <p class="title">{{truncate(content.snippet.title, 25)}}</p>
              <p class="uploader">{{content.snippet.channelTitle}}</p>
              <p class="description">{{truncate(content.snippet.description, 70)}}</p>
            </div>
            <div class="details-bottom">
              <p class="views">{{content.statistics.viewCount}} <span>views</span></p>
              <Playbutton class="playbtn"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <h3 class="title-channels">Channels</h3>
    <div class="section-channel" v-if="channelsContent">
      <div class="channels-section" v-for="content in channelsContent" :key="content">
        <div class="channel-card">
          <div class="upper-channel-part">
            <img :src="content.snippet.thumbnails.high.url" alt="" class="thumbnail-channel">
            <div class="upper-text">
              <p class="channelname">{{truncate(content.snippet.title, 20)}}</p>
              <div class="source-wrap">
                <YTicon />
                <p class="sourcename">Youtube</p>
              </div>
            </div>
          </div>
          <div class="middle-channel-part">
            <p class="channeldesc">{{truncate(content.snippet.description, 150)}}</p>
          </div>
          <div class="bottom-channel-part">
            <p class="channelcreationdate small"><span>Published</span> {{formatDate(content.snippet.publishedAt)}}</p>
            <p class="subscribers small">{{content.statistics.subscriberCount}} <span>subscribers</span></p>
            <p class="viewcount small">{{content.statistics.viewCount}} <span>views</span></p>
            <p class="videos small">{{content.statistics.videoCount}} <span>videos</span></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import YTicon from '../assets/icons/YTicon.vue';
import Playbutton from '../assets/icons/Playbutton.vue';

export default {
  components: {YTicon, Playbutton},
  data() {
    return {
      api_key: "AIzaSyDXqGC3bzyIcfV90q_V61IZaM68S6I4m9E",
      api_key2: "AIzaSyBxmo6nk1V46HzWExkCWBeMd81ah3UiyLk",
      url: "https://www.googleapis.com/youtube/v3/search",
      url2: "https://www.googleapis.com/youtube/v3/videos",
      url3: "https://www.googleapis.com/youtube/v3/channels",
      newContent: [],
      highViewContent: [],
      channelsContent: []
    }
  },
  methods: {
    async fetchNewContent() {
      let date = new Date();
      let data = await fetch(this.url + '?key=' + this.api_key2 + '&type=video&part=snippet&publishedBefore=' + date.toISOString() + '&order=date&maxResults=' + 6);
      data = await data.json();
      this.newContent = data;
    },
    async fetchHighViewCountContent() {
      let date = new Date();
      let pastdate = new Date(date);
      pastdate.setDate(pastdate.getDate() - 10);
      let formatDate = pastdate.toISOString();

      let data = await fetch(this.url + '?key=' + this.api_key2 + '&type=video&part=snippet&order=viewCount&publishedAfter=' + formatDate + '&maxResults=' + 6);
      data = await data.json();
      data = data.items;

      let ids = '';
      for(let i = 0; i < data.length; i++) {
        if(i == data.length-1) {
          ids += data[i].id.videoId;
          break;
        }
        ids += data[i].id.videoId + ',';  
      }

      let data2 = await fetch(this.url2 + '?key=' + this.api_key2 + '&part=snippet,statistics,contentDetails&id=' + ids + '&maxResults=' + 6)
      data2 = await data2.json();
      console.log(data2);
      this.highViewContent = data2;
    },
    async fetchChannelsContent() {
      let date = new Date();
      let pastdate = new Date(date);
      pastdate.setDate(pastdate.getDate() - 10);
      let formatDate = pastdate.toISOString();

      let data = await fetch(this.url + '?key=' + this.api_key2 + '&type=video&part=snippet&order=rating&publishedAfter=' + formatDate + '&maxResults=' + 6);
      data = await data.json();
      data = data.items;

      console.log(data);

      let ids = '';
      for(let i = 0; i < data.length; i++) {
        if(i == data.length-1) {
          ids += data[i].snippet.channelId;
          break;
        }
        ids += data[i].snippet.channelId + ',';  
      }

      let data2 = await fetch(this.url3 + '?key=' + this.api_key2 + '&part=snippet,statistics,contentDetails,contentOwnerDetails&id=' + ids + '&maxResults=' + 6)
      data2 = await data2.json();
      console.log(data2.items);
      this.channelsContent = data2.items;
    },
    truncate(str, length) {
      if(str.length < 20) {
        return str;
      }

      let res = '';
      for(let i = 0; i < length; i++) {
        res += str.charAt(i);
      }

      return res + '...';
    },
    formatDate(date) {
      let format = new Date(date);
      let formatted = format.getFullYear() + '-' + (format.getMonth() + 1) + '-' + format.getDate();
      return formatted;
    },
    getDuration(ms) {
      let minutes = Math.floor(ms/60000);
      let seconds = ((ms % 60000) / 1000).toFixed(0);
      return (
        seconds == 60 ? 
        (minutes+1) + '00' :
        minutes + ':' + (seconds < 10 ? '0' : '') + seconds
      );
    }
  },
  async mounted() {
    this.fetchNewContent();
    this.fetchHighViewCountContent();
    this.fetchChannelsContent();
  }
}
</script>

<style scoped>
  span {
    font-weight: 900;
    font-size: 10px;
  }

  .explore {
    width: 100vw;
    height: 90vh;
    margin-left: 20vw;
    padding: 2em;
  }

  .pagetitle {
    font-size: 28px;
  }

  .title-new {
    margin-top: 1em;
    margin-bottom: 1emem;
  }

  .title-view {
    margin-top: 4em;
    margin-bottom: 1em;
  }

  .title-channels {
    margin-top: 4em;
    margin-bottom: 1em;
  }

  .section {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2em;
  }

  .content-card {
    border-radius: 5px;
    background-color: rgba(196, 196, 196, 0.1);
    display: flex;
    flex-direction: row;
  }

  .thumbnail {
    height: 8vw;
    width: 10vw;
    border-radius: 5px;
    margin: .25em;
    margin-bottom: 0;
  }

  .details-wrap {
    width: 100%;
    height: 16vh;
    display: flex;
    flex-direction: column;
  }

  .details-top {
    padding: 0.5em 0.5em 0.25em 0.5em;
    display: flex;
    justify-content: space-between;
    align-content: center;
  }

  .details-middle {
    /* padding-top: 0.25em;
    padding-left: 0.25em; */
    padding: 0.25em
  }

  .details-bottom {
    display: flex;
    width: 100%;
    height: 100%;
    align-self: flex-end;
    justify-content: space-between;
    align-content: center;
    align-items: flex-end;
    padding-left: 0.25em;
    margin-top: 2em;
    padding-bottom: 0.25em;
  }

  .options-btns {
    display: flex;
    gap: 0.25em;
    cursor: pointer;
  }

  .options-btns:hover {
    opacity: 0.5;
  }

  .option-btn {
    width: 0.25em;
    height: 0.25em;
    border-radius: 50%;
    background-color: #fff; 
  }

  .source {
    display: flex;
    align-content: center;
    justify-content: center;
    gap: 0.5em;
  }

  .sourcename {
    font-size: 12px;
    opacity: 0.5;
  }

  .title {
    font-size: 14px;
    font-weight: 900;
  }

  .uploader {
    font-size: 12px;
    opacity: 0.5;
  }

  .description {
    font-size: 12px;
    font-weight: 900;
    opacity: 0.5;
    margin-top: 0.5em;
  }

  .date {
    /* margin-top: 4em; */
    margin-right: 1em;
    font-size: 12px;
    opacity: 0.5;
  }

  .views {
    margin-right: 1em;
    font-size: 12px;
    opacity: 0.5;
    /* font-weight: 900; */
  }

  .playbtn {
    /* margin-top: 2em; */
    margin-right: 0.5em;
    cursor: pointer;
  }

  .playbtn:hover {
    opacity: 0.5;
  }

  .thumbnail-channel {
    width: 3em;
    height: 3em;
    border-radius: 50%;
  }

  .channelname {
    font-weight: 900;
    font-size: 16px;
  }

  .upper-channel-part {
    display: flex;
  }

  .upper-text {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 22vw;
    padding-left: 0.5em;
    padding-right: 0.5em;
    padding-top: 0.5em;
  }

  .source-wrap {
    display: flex;
    align-self: flex-start;
  }

  .channel-card {
    padding: 0.5em;
    border-radius: 5px;
    background-color: rgba(196, 196, 196, 0.1);
    height: 100%;
    cursor: pointer;
  }

  .channel-card:hover {
    opacity: 0.75;
  }

  .channeldesc {
    font-weight: 900;
    font-size: 12px;
    margin-top: 1em;
    height: 2vw;
  }

  .bottom-channel-part {
    display: flex;
    gap: 2em;
    margin-top: 1em;
    align-content: center;
  }

  .small {
    font-size: 12px;
  }

  .section-channel {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 2em;
  }
</style>