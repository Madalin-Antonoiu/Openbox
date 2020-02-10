<template>
  <div class="materialize-modal">
    <!-- Modal Trigger / Triggered from within ChatHeader -->

    <!-- Modal Structure -->
    <div id="modal2" class="modal">
      <div class="modal-content">
        <p><span class="teal-text">User</span>: {{name}}</p>
        <p><span class=" indigo-text lighten-2">Room:</span> {{room}} , <span >20 msg</span></p>

      </div>
      <div class="modal-footer">

        <span class="modal-close waves-effect waves-green btn-flat">Close</span>
     
      </div>
    </div>

  </div>
</template>

<script>
/*eslint-disable*/


  export default {
    name: "YouSyncModal",
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
      const modal = document.querySelector('.modal')
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

    }
  }
</script>

<style scoped>
  #modal2{
    width: 400px;
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
