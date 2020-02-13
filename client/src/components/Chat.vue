<template>

  <div class="chat" >
    <div id="cht">
      <ChatHeader :name="name" :room="room"  />
      <ChatMessages :name="name" /> <!-- No longer need to pass room-->
      <NewMessage :name="name" :room="room" />
    </div>


   -->

    <!-- <footer id="footer">
      <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
    </footer> -->

  </div>

</template>

<script>
  import ChatHeader from '@/components/Chat/ChatHeader'
  import ChatMessages from '@/components/Chat/ChatMessages'
  import NewMessage from '@/components/Chat/NewMessage'
 

  export default {
    name: 'Chat',
    props: ['name', 'room'],
    components: {
      ChatHeader,
      ChatMessages,
      NewMessage,

    },
}

</script>


<style scoped>
  #cht{
    /* display:none; */
    /* position:absolute;
    width:400px;
    right:5px;
    top:5px; */
 
  }
  #sync{
    /* display:none; */
    /* position:absolute;
    width:400px;
    left:5px;
    top:5px; */
  }






  .canvas {
    position:relative;
  }
  .chat {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-flow: column wrap;
    flex-flow: column wrap;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    box-shadow: 0px 2px 5px rgba(0,0,0,0.5); /*Rlly cool*/

  }



#footer{
  background-color: #212121;
    color: #aaa;
    text-align: center;
    width: 100%;
    /* margin-top: 50px; */
    /* padding-top: 50px;
        /* position: fixed; */
    /* bottom: 0px; */
    /* left: 0px; */
}
</style>
