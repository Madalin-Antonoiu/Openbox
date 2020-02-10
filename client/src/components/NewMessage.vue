<template>
  <div class="new-message-area">

  <div class="utils">
    <p id="emptySend" class="red-text center-align" v-if="feedback"> {{ feedback }}</p>
    <button @click.prevent="toogleDialogEmoji">😃</button>

    <div id="modalo2" class="right">
      <Modal2 /> 
          <a class="btn-floating btn-small waves-effect waves-light blue modal-trigger" data-target="modal2"><i class="material-icons">settings</i></a>
    </div>

  </div>
        



  <div id="frameCont" style="display:none;" class="video-container"> </div>
  <!-- <iframe id="frm1" width="560" height="315"  frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>-->
  <!-- :src=newMessage -->
  <form class="msger-inputarea" @submit.prevent="generateInputEvent"> <!-- Retired functionality @submit.prevent="addMessage" -->

    <span id="scriptIcon" class="flatIcon valign-wrapper" style="display: none;"></span>

     <!-- @keyup is an absolute MUST, so the checks happen after value is taken into newMessage -->
      <input  id ="submit" type="text" class="msger-input" placeholder="Enter your message..."  autofocus autocomplete="off" v-model="newMessage" @keyup="keymonitor" > <!-- -->

      <button id="goButton" type="submit" class="chat-send-btn">Send</button> <br>

    </form>

        <VEmojiPicker
          v-show="showDialog"
          labelSearch="Search"
          style="{ width: 4px }"
          @select="onSelectEmoji"
        />



    </div>

</template>

<script>
  /*eslint-disable */
  import db from '@/firebase/init'
  import VEmojiPicker from "v-emoji-picker";
  import Modal2 from '@/components/Modal2'

  export default {
    name: 'NewMessage',
    props: ['name', 'room'],
    components : {
       VEmojiPicker,
       Modal2
    },
    data(){
        return {
            newMessage: "",
            feedback: null,
            showDialog: false,
            buffer: [],
            gluglu: false,
            videoId: "",
            iframeMarkup: ""
        }
    },
    methods: {
      keymonitor(){
        //##### The script i love the most from all i have ever written until Feb 2020 #########
        let icon = document.getElementById('scriptIcon');
        let input = document.getElementById('submit')
        if (this.newMessage.startsWith("/", 0)){ //main if, Visual Changes [enters scripts range]
          console.log('Started with /')
            if (this.newMessage.startsWith("s", 1)){
              //Show Google icon
              document.getElementById('submit').style.paddingLeft="23px"; //Move cursor with padding left on icon show
              icon.classList.add('googleIcon')
              input.placeholder ="Search on Google..."
              this.newMessage =""
              document.getElementById("goButton").textContent="Search";
              console.log('Attached Google icon')
            }
            else if (this.newMessage.startsWith("y", 1)) {
              //Show YT icon
              //Group these 3 in a function and pass parameter of background Image ;)
              document.getElementById('submit').style.paddingLeft="23px";
                icon.classList.add('youtubeIcon')
              this.newMessage =""
              document.getElementById('submit').placeholder="Search on Youtube..."
              document.getElementById("goButton").textContent="Search"
              document.getElementById("goButton").style.backgroundColor="red";
              console.log('Attached Youtube icon')
            }
            else if (this.newMessage.startsWith("l", 1)) { //will be removed eventually
              //Show YT icon
                document.getElementById('submit').style.paddingLeft="23px";
                icon.classList.add('youtubeIcon')
              
                document.getElementById("frameCont").style.display="block";
                this.newMessage =""
                document.getElementById('submit').placeholder="Paste a Youtube link"
                document.getElementById("goButton").textContent="Share It"
                document.getElementById("goButton").style.backgroundColor="red";
                console.log('Attached Youtube icon')
                
            
            } 
            else if (this.newMessage.startsWith("/clear", 0)){ // /clear
              const myNode = document.getElementById("capture");
              while (myNode.firstChild) {
               myNode.removeChild(myNode.firstChild);
              }
              //Clear input
              this.newMessage = ""
            }
            else {
              console.log('No s, no y fulfilled yet.')
            }   // Secondary if-else if
        } // Main if
          else {  // Main else, Logical Changes
                console.log('Just visual, not scripts starting with /, clear all icons, these are regular messages?')
            
            if (this.newMessage.includes("https://www.youtube.com/", 0)){
                let short = this.newMessage.substr(3);
                this.videoId = this.getId(short);
                this.iframeMarkup = '<iframe width="560" height="315" src="https://www.youtube.com/embed/' 
                    + this.videoId + '" frameborder="0" allowfullscreen></iframe>';
                  document.getElementById('frameCont').innerHTML = this.iframeMarkup ;
                
                     
                //document.getElementById('submit').style.paddingLeft="23px";
                //icon.classList.add('youtubeIcon')
              
                document.getElementById("frameCont").style.display="block";
                this.newMessage =""
                document.getElementById('submit').placeholder="Say something and share it"
                document.getElementById("goButton").textContent="Share It"
                document.getElementById("goButton").style.backgroundColor="red";
                //console.log('Attached Youtube icon')
                  //console.log(iframeMarkup);
                }
                 else if ( this.newMessage === "" && event.key === "Backspace"){ // Backspace should reset only when string is empty
                  icon.classList.remove('googleIcon', 'youtubeIcon')
                  document.getElementById('submit').style.paddingLeft="0px"; //Move cursor back on hide
                  input.placeholder="Enter your message..."
                  document.getElementById("goButton").style.backgroundColor="";
                  document.getElementById("goButton").textContent="Send";
                  document.getElementById("frameCont").style.display="none";
                 } //The order really matters, so it first gets to this one before gets to Enter alon ;)
                 else if (event.key === "Enter" && icon.classList.contains('googleIcon') ){ // Cauta pe Google = Enter && Icon Google + Icon not hidden
                    //Search Google
                    let typed = this.newMessage; //Removes the /s from input for the Google searc // no longer needed
                    window.open('https://google.com/search?q='+ typed )
                    //Clears after search
                    icon.classList.remove('googleIcon')
                    this.newMessage = "" // clears input
                    this.feedback = null // clears error
                      //For Input & Send button
                      document.getElementById('submit').placeholder="Enter your message..."
                      document.getElementById('submit').style.paddingLeft="0px"
                      document.getElementById("goButton").style.backgroundColor="";
                 }
                 else if (event.key === "Enter" && icon.classList.contains('youtubeIcon') ){ // Cauta pe Google = Enter && Icon Google + Icon not hidden
                    //Search Youtube
                    let typed = this.newMessage; //Removes the /s from input for the Google searc // no longer needed
                    window.open('https://youtube.com/results?search_query='+ typed )
                    //Clears after search
                    icon.classList.remove('youtubeIcon')
                    this.newMessage = "" // clears input
                    this.feedback = null // clears error
                      //For Input & Send button
                      document.getElementById('submit').placeholder="Enter your message..."
                      document.getElementById('submit').style.paddingLeft="0px"
                      document.getElementById("goButton").style.backgroundColor="";
                      document.getElementById("goButton").textContent="Send";
                 }
                 else if (event.key === "Enter"){ // Aici chiar trimitem mesaj !
                  console.log('Dupa atatea verificari, trimiti si tu un mesaj... Bravo!')
                  db.collection('messages').add({
                      content: this.newMessage,
                      name: this.name,
                      timestamp: Date.now(),
                      room: this.room,
                      embed: this.videoId
                      //this.room
                  }).catch( err =>{
                      console.log(err)
                  })
                  //Clears after message sent
                  input.placeholder="Enter your message..."
                  document.getElementById("goButton").style.backgroundColor="";
                  document.getElementById("goButton").textContent="Send";
                  document.getElementById("frameCont").style.display="none";
                  this.newMessage = "" // clears input
                  this.feedback = null // clears error
                  
                  document.getElementById('frameCont').innerHTML = ""; //clears the iFrame
                 }
                 else {
                   console.log('V- no backspace yet...')
                 }
          }// Main else,
      },//keymonitor
      toogleDialogEmoji() {
        this.showDialog = !this.showDialog;
        //You need to give it some delay so the DOM recognizes that you enlarged it, that`s why setTimeout
        setTimeout(function() {  window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight) }, 100); // scroll to bot ;)
      },
      onSelectEmoji(emoji) {
        this.newMessage += emoji.data;
        // Optional
        // this.toogleDialogEmoji();
      },
      generateInputEvent(){
        let input = document.getElementById("submit");
        let ev = document.createEvent('Event');
        ev.initEvent('onkeyup');
        ev.which = "Enter"
        input.dispatchEvent(ev);
      },
      getId(url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11)
          ? match[2]
          : null;
      }
    }, //methods
  }
</script>

<style lang="css">
      /*Cpen*/
  .new-message-area{
    z-index:99999;
    box-shadow: 0px -4px 3px rgba(182, 182, 182, 0.75);
  }
  #EmojiPicker{
    padding: 10px; /*Mirroring the above component*/
    min-width: 100%;
    }
  .grid-emojis{
    grid-template-columns: repeat(10, 10%) !important;
  }
  input {
    padding: 8px;
    font-size: 16px;
    margin-right: 2px;
    border-radius: 4px;
    border: 1px solid #848484;
  }
  button {
    background: #ececec;
    border-radius: 4px;
    padding: 5px;
    font-size: 22px;
    border: 1px solid #848484;
  }
  form {
    position: relative;
  }
  ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: grey;
    opacity: 1; /* Firefox */
  }
  :-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: grey;
  }
  ::-ms-input-placeholder { /* Microsoft Edge */
    color: grey;
  }
  .chat-send-btn {
    width:59px;
    height: 45px;
    margin-left: 10px !important;
    background:  #26a69a;
    color: #fff;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.23s;
  }
  .chat-send-btn:hover {
    background: rgb(0, 180, 50);
  }
  .msger-input {
    flex: 1  !important;
    background: #ddd  !important;
    width:100% !important;
  }
    .msger-inputarea {
    display: flex !important;
    padding: 10px  !important;
    border-top: var(--border)  !important;
    background: #eee  !important;
  }
  .msger-inputarea * {
    margin-left:5px;
    border: none  !important;
    border-radius: 3px  !important;
    font-size: 1em  !important;
  }
      .new-message{
          margin-left: 10px;
      }
  .utils button{
    font-size: 14px;
  }
  .utils {
    padding-left: 10px;
  }
  .flatIcon{
    width: 18px;
    height: 18px;
    background-size: cover;
    background-repeat: none;
    position: absolute;
    top: 25px;
    left: 7px;
  }
  .displayNone{
    display: none!important;
  }
  .googleIcon {
    background-image: url("https://image.flaticon.com/icons/svg/281/281764.svg");
    display: block !important;
  }
  .youtubeIcon {
   background-image: url("https://image.flaticon.com/icons/svg/185/185983.svg");
   display: block !important;
  }


 
  #modalo2 a{
    height:20px;
    width:20px;
    
  }
  #modalo2 a i {
    font-size:14px;
  }
  

 

</style>