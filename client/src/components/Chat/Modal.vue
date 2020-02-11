<template>
  <div class="materialize-modal">
    <!-- Modal Trigger / Triggered from within ChatHeader -->

    <!-- Modal Structure -->
    <div id="modal1" class="modal">
      <div class="modal-content">
        <p><span class="teal-text">User</span>: {{name}}</p>
        <p><span class=" indigo-text lighten-2">Room:</span> {{room}} , <span >20 msg</span></p>
        <p>Total messages: 120msg</p>
        <p>Other settings</p>
        <p>Rank: Rookie</p>
      </div>
      <div class="modal-footer">
        <span class="waves-effect waves-red btn-flat">Delete all messages</span>
        <span class="waves-effect waves-red btn-flat">Delete room messages</span>
        <span @click.prevent="clearChat()" class="waves-effect waves-red btn-flat">Clear chat</span>
        <span class="modal-close waves-effect waves-green btn-flat">Close</span>
         <button class="button btn" @click="fullChatHistoryImage()"> Img </button>
      </div>
    </div>

  </div>
</template>

<script>
/*eslint-disable*/
import domtoimage from 'dom-to-image-more';

  export default {
    name: "Modal",
    props: ['name', 'room'],
    /*Materialize Global Modal */
    data() {
      return {
      modalInstance: null,
      closeAfterTimeElapsed: true,
      seconds: 1
      }
    },
    mounted() {
      const modal = document.getElementById('modal1')
      this.modalInstance = M.Modal.init(modal)

      const select = document.querySelector('select');
      M.FormSelect.init(select);

      M.updateTextFields();
      },
      methods: {
        /*@click:handleClick() to make modal close within 1000ms*/
        handleClick() {
          if (this.closeAfterTimeElapsed) {
            setTimeout(() => { this.modalInstance.close() }, this.seconds * 1000)
          }
        }
    },
    methods:{
      clearChat(){
          const myNode = document.getElementById("capture");
          while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
          }
      },
      fullChatHistoryImage(){
        var node = document.getElementById('capture');
        
          domtoimage.toPng(node, { height: node.scrollTop = node.scrollHeight})
            .then(function (dataUrl) {
                var img = new Image();
                img.src = dataUrl;
                img.classList.add("historyImg");
                document.body.appendChild(img);

            })
            .catch(function (error) {
                console.error('oops, something went wrong!', error);
            });

                      const records = document.querySelectorAll('.historyImg')
          
          records .forEach(record => {

            record.addEventListener('click', event => {
                  //console.log( event.target.id );
                        event.target.style.display="none"
            });

          }); // Must change, not perfect
          },
      domigifyDownload(){
        domtoimage.toJpeg(document.getElementById('capture'), { quality: 0.95 }).then(function (dataUrl) {
                var link = document.createElement('a');
                link.download = 'my-image-name.jpeg';
                link.href = dataUrl;
                link.click();
          })
      },
    }
  }
</script>

<style>
  #modal1{
    width: 300px;
  }
  .modal-overlay{
    opacity:0 !important;
  }
/* Support for 3 chat history imgs side by side */
 .historyImg{ 
    position: absolute;
    right: 0;
    top: 0;
    z-index: 9999;
    max-height: 100vh;
    max-width: 400px;
    outline: 1px rgb(184, 90, 90) dashed;
    outline-offset: -1px;
  }
   .historyImg:nth-of-type(2){
    right:80px;
  }
     .historyImg:nth-of-type(3){
    right:160px;
  }
</style>
