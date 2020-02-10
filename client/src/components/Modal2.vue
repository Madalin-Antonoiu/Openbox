<template>
  <div class="materialize-modal">
    <!-- Modal Trigger / Triggered from within ChatHeader -->

    <!-- Modal Structure -->
    <div id="modal2" class="modal">
      <div class="modal-content">

        <YouSync />
      </div>

      <div class="modal-footer">

        <span class="modal-close waves-effect waves-green btn-flat">Close</span>

      </div>
    </div>

  </div>
</template>

<script>
/*eslint-disable*/
 import YouSync from '@/components/YouSync'


  export default {
    name: "Modal2",
    components: {
      YouSync,
    },
    /*Materialize Global Modal */
    data() {
      return {
      modalInstance: null,
      closeAfterTimeElapsed: true,
      seconds: 1
      }
    },
    mounted() {
      const modal = document.getElementById('modal2')
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

<style>
  #modal2{
    width: 500px;
    height:550px;
  

  }
  .modal-overlay{
    opacity:0 !important;
  }


</style>
