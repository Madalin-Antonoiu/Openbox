<template>
  <div id="card-contents">
    <div class="card-thumbnail">
      <button :id="video.id.videoId" class="btn-small" style="position:absolute;bottom:0;" @click="sendIdToParent($event)">+</button> 
      <a :href="'https://www.youtube.com/watch?v=' + video.id.videoId" target="_blank">
        <img class="card-img-top" :src="video.snippet.thumbnails.medium.url" alt="YouTube thumbnail" width="246">
      </a>
    </div>

    <div class="card-body">
      <h5 class="card-title">{{ video.snippet.title }}</h5>
      <h6
        class="card-subtitle mb-2 text-muted"
      >{{ video.snippet.channelTitle }} | {{ video.snippet.publishedAt | formatDate }}</h6>
       <p class="card-text">{{ video.snippet.description }}</p> 
     
    </div>
  </div>
</template>

<script>
/*eslint-disable*/
export default {
  name: 'VideoGridItem',
  props: ['video'],
  data(){
    return{
      stored:""
    }
  },
  methods:{

    sendIdToParent(event){
        this.stored = event.target.id;
        // Emit event
        console.log(this.stored);
        this.$emit('sendIdToParent', this.stored);
      //console.log(event.target.id)
    },
  }
};
</script>

<style scoped>
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
