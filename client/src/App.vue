<template>
  <div id="app">
     <router-view/>
  </div>
</template>

<script>


export default {
  name: 'App',
}
</script>

<style>

 *,
  *:before,
  *:after {
    margin: 0;
    padding: 0;
    /*box-sizing: inherit;*/
  }

  body {
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: Helvetica, sans-serif;
    margin: 0;
    padding: 0;
    border: 0 none;
    box-sizing: border-box;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    min-height: 100vh; /*Absolute-must for height that will at some point go past 100vh (Emoji trigger)*/
  }


  #app{
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
  }


</style>
