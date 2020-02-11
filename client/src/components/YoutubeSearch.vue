<template>
  <div id="youtubeSearch">
    <!-- <Header/> -->
    <SearchForm v-on:search="search"/>
    <SearchResults
      v-if="videos.length > 0"
      v-bind:videos="videos"
      v-bind:reformattedSearchString="reformattedSearchString"
      @sendToParent="grabbedIdAgain"
    />
    <Pagination
      v-if="videos.length > 0"
      v-bind:prevPageToken="api.prevPageToken"
      v-bind:nextPageToken="api.nextPageToken"
      v-on:prev-page="prevPage"
      v-on:next-page="nextPage"
    />
  </div>
</template>

<script>
/*eslint-disable*/
// import Header from './YoutubeSearch/Header';
import SearchForm from './YoutubeSearch/SearchForm';
import SearchResults from './YoutubeSearch/SearchResults';
import Pagination from './YoutubeSearch/Pagination';
import axios from 'axios';

export default {
  name: 'YoutubeSearch',
  components: {
    // Header,
    SearchForm,
    SearchResults,
    Pagination
  },
  data() {
    return {
      videos: [],
      reformattedSearchString: '',
      api: {
        baseUrl: 'https://www.googleapis.com/youtube/v3/search?',
        part: 'snippet',//need to add statistics
        type: 'video',
        order: 'viewCount',
        maxResults: 12,
        q: '',
        key: 'AIzaSyCL21U-qh0NwQhH2I7WS9rinqpy8Oi3ZOE', //YOUR_API_KEY. Private Repo - Safe
        prevPageToken: '',
        nextPageToken: ''
      }
    };
  },
  methods: {
    search(searchParams) {
      this.reformattedSearchString = searchParams.join(' ');
      this.api.q = searchParams.join('+');
      const { baseUrl, part, type, order, maxResults, q, key } = this.api;
      const apiUrl = `${baseUrl}part=${part}&type=${type}&order=${order}&q=${q}&maxResults=${maxResults}&key=${key}`;
      this.getData(apiUrl);
    },

    prevPage() {
      const { baseUrl, part, type, order, maxResults, q, key, prevPageToken } = this.api;
      const apiUrl = `${baseUrl}part=${part}&type=${type}&order=${order}&q=${q}&maxResults=${maxResults}&key=${key}&pageToken=${prevPageToken}`;
      this.getData(apiUrl);
    },

    nextPage() {
      const { baseUrl, part, type, order, maxResults, q, key, nextPageToken } = this.api;
      const apiUrl = `${baseUrl}part=${part}&type=${type}&order=${order}&q=${q}&maxResults=${maxResults}&key=${key}&pageToken=${nextPageToken}`;
      this.getData(apiUrl);
    },

    getData(apiUrl) {
      axios
        .get(apiUrl)
        .then(res => {
          this.videos = res.data.items;
          this.api.prevPageToken = res.data.prevPageToken;
          this.api.nextPageToken = res.data.nextPageToken;
        })
        .catch(error => console.log(error));
    },
    grabbedIdAgain(params) {
      // this.storedid= params;
      console.log(params) // Got this from VideoGridItem
      this.$emit('sendToParent', params) //emitting further
    }
  }
};
</script>

<style lang="css">
  #app{
    width:100%;
    max-width:550px;
    margin:0 auto;
  }
  .card-text{
    color: rgb(96, 96, 96);
    margin:10px;
    line-height:18px;
      font-weight:400;
    font-family:Roboto, Arial, sans-serif;
    font-size:13px;
  }
  .card-title{
    font-size: 18px;
    margin:0px 10px 0px 10px;
    color:rgb(13, 13, 13);
    font-weight:400;
    font-family:Roboto, Arial, sans-serif;
  }
  .card-subtitle{
      margin:0px 10px 0px 10px;
    font-size:13px;
    color:rgb(96, 96, 96);
    font-family:Roboto, Arial, sans-serif;
    font-weight:400;
  }

  .card-thumbnail{
    float: left;
    width: 246px;
  }

  .card-body{
     float: left;
      width: calc(100% - 246px);
    /* max-width:374px;
    width:100%; */
    /* margin-bottom:16px; */
      height:142px;
      overflow:hidden;
      
  }
  #card-contents{
    margin-bottom:16px;
  }

  #card-contents:after {
  content: "";
  display: table;
  clear: both;
}
</style>