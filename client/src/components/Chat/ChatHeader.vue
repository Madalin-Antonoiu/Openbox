<template>


  <div class="chat-header">
    <div class="chat-header-title valign-wrapper">
        <i @click="router.replace('/')" class="material-icons blue-text" style="vertical-align: -6px; cursor: pointer;">chevron_left</i>
      <span class="new badge room-badge" data-badge-caption="">Room: {{room}}</span>
    </div>


      <div class="right">
          <Modal :name="name" :room="room"/> 
          <a class="btn-floating btn-small waves-effect waves-light blue modal-trigger" data-target="modal1"><i class="material-icons">settings</i></a>
      </div>


  </div>


</template>

<script>
  import Modal from '@/components/Chat/Modal'

export default {
    name: 'ChatHeader',
    props: ['name','room'],
    components: {
      Modal,
    }
}
</script>


<style>

  .chat-header{
    z-index: 9999;
    box-shadow: 0 5px 5px rgba(182, 182, 182, 0.75); /*Rlly cool*/
    display: flex;
    justify-content: space-between;
    padding: 10px;
    background: #eee;
    color: #666;
    width:100%;
    /*Container Control
    outline: 1px solid violet !important;
    outline-offset: -1px;*/
  }
  .room-badge{
    margin-left:0 !important;
    user-select: none;
  }

</style>
