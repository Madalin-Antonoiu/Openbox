<template>

    <ul class="chat-messages" v-chat-scroll id="capture"> <!-- capture Must stay here for full chat record image + CLEAR CHAT -->
      <li  v-for="message in messages" :key="message.id" :class="{'message right-message': name === message.name, 'message left-message': name !== message.name}">
        <span class="message-avatar"
          :style='
            [ name !== message.name ?
              { backgroundImage: "url(" + "https://image.flaticon.com/icons/svg/547/547420.svg" + ")"} :
              { backgroundImage: "url(" + "https://image.flaticon.com/icons/svg/1596/1596810.svg" + ")"}
            ]'>
        </span>
        <div class="message-bubble">
          <div class="message-info">
            <span v-if="name !== message.name" class="message-info-name">{{ message.name }}</span>
          </div>
          <div class="message-text" 
          :style='
            [ message.embed ?
              { maxWidth: "100%", width: "350px"} :
              { maxWidth: "180px"}
            ]'
          
          
          >

            <span v-if="message.embed">
              <div class="video-container">
                <iframe width="560" height="315" 
                  :src=" 'https://www.youtube.com/embed/' + message.embed" 
                  frameborder="0" 
                  allowfullscreen>
                </iframe>
              </div>
            </span>

            {{ message.content }}   
            
            <span class="message-info-time">{{ message.timestamp}}</span></div>

        </div>
      </li>
 
    </ul>

</template>

<script>
  import db from '@/firebase/init'
  import moment from 'moment'
  export default {
    name: 'ChatBody',
    props: ['name', 'room'],
    data(){
      return {
        messages: [],
      }
    },
    created(){
      let ref = db.collection('messages').orderBy('timestamp')
      ref.onSnapshot(snapshot => {
        snapshot.docChanges().forEach( change => {
          if(change.type == 'added'){
            let doc = change.doc
            this.messages.push({
              id: doc.id,
              name:doc.data().name,
              content: doc.data().content,
              timestamp: moment(doc.data().timestamp).fromNow(),
              room: doc.data().room,
              currentUser: this.name,
              embed: doc.data().embed
            })
          }
        })
      })
    },
    
  }
</script>

<style lang="css" scoped>
  .video-container {
  position: relative;
  padding-bottom: 56.25%;
  padding-top: 30px; height: 0; overflow: hidden;
  }
  
  .video-container iframe,
  .video-container object,
  .video-container embed {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  }
  /*.chat-messages*/
  .chat-messages {
    overflow-y: auto;
    padding: 10px;
    background-color: #fcfcfe;
    height: calc(100vh - 159px); /*Ca sa dea exact minus header si new message*/ 
    /*Container Control
    outline: 1px solid red !important;
    outline-offset: -1px;*/
  }
  .chat-messages::-webkit-scrollbar {
    width: 6px;
  }
  .chat-messages::-webkit-scrollbar-track {
    background: #ddd;
  }
  .chat-messages::-webkit-scrollbar-thumb {
    background: #bdbdbd;
  }
  /*.messages*/
  .messages {
    padding: 3px;
  }
  .messages-box {
    overflow: auto;
    visibility: hidden;
  }
  .messages, .messages-box:hover, .messages-box:focus {
    visibility: visible;
  }
  .messages-box::-webkit-scrollbar{
    width: 12px;
    background-color: #134446;
  }
  .messages-box::-webkit-scrollbar-track{
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    border-radius: 10px;
    background-color: #F5F5F5;
  }
  .messages-box::-webkit-scrollbar-thumb{
      border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: #009688;
  }
  /*message*/
  .message {
    display: flex;
    align-items: flex-end;
    margin-bottom: 10px;
  }
  .message:last-of-type {
    margin: 0;
  }
  .message-bubble {
    max-width: 450px;
    padding: 8px;
    border-radius: 15px;
    background: #ececec;
  }
  .message-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
  }
  .message-info-name {
    margin-right: 10px;
    font-weight: bold;
    font-size:18px;
  }
  .message-info-time {
    font-size: 0.85em;
    opacity:0.6;
    float:right;
    margin-left:3px;
  }
  .left-message .message-bubble {
    border-bottom-left-radius: 0;
  }
  .right-message {
    flex-direction: row-reverse;
  }
   .right-message .message-avatar {
    margin: 0 0 0 10px;
  }
  .right-message .message-bubble {
    background: #044C62;
    color: #FFFCFF;
    border-bottom-right-radius: 0;
  }
  .message-text{
    max-width:180px;
  }
  .message-avatar {
    width: 50px;
    height: 50px;
    margin-right: 10px;
    background: #ddd;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    border-radius: 50%;
  }
</style>