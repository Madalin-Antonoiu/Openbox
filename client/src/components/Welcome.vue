<template>
  <div class="welcome container">
    <div class="card">
      <div class="card-content center-align blurred-text">
        <h2 class="teal-text text-lighten-2">OpenBox</h2>

          <form @submit.prevent="validateAndEnterChat">

        <div class="input-field">
          <i class="material-icons prefix">assistant</i>
          <input id="room" name="room" type="text"  class="validate" v-model="room" :class="{ 'invalid': attemptSubmit && missingRoom, 'valid': !missingRoom }" autocomplete="off">
          <label for="room">Room Name</label>
          <span  class="helper-text" data-error="You must enter room name to join." data-success="Correct"></span> <!-- Not writting anything inside for a helper -->
        </div>

        <div class="input-field">
          <i class="material-icons prefix">account_circle</i>
          <input id="name" name="name" type="text"  class="validate" v-model="name" :class="{ 'invalid': attemptSubmit && missingName , 'valid': !missingName }" autocomplete="off">
          <label for="name">Your Name</label>
          <span class="helper-text" data-error="You must enter your name to join." data-success="Correct"></span>
        </div>



            <button class="btn teal lighten-2">Enter Chat</button>
          </form>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Welcome',
  data () {
    return {
      room: "",
      name: "",
      attemptSubmit: false,
    }
  },
  computed: {
    missingName() {  return  this.name === '' }, ////document.getElementById('room').classList.add('invalid');
    missingRoom() {  return  this.room === '' },
  },
  methods : {
    validateAndEnterChat(){
        this.attemptSubmit = true; // Attempted to submit
        if (this.missingName){
         document.getElementById('name').classList.add('invalid');

        }
        else if ( this.missingRoom) {
            document.getElementById('room').classList.add('invalid');
          //event.preventDefault(); // Prevent the click if one of those is wrong
        } else {
          this.$router.push({ name: 'Chat', params: {name: this.name, room: this.room} }) // Get the data and
        }
    }




  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="css">

 .card{
    max-width: 450px;
    margin: 0 auto;

    background-image: url(https://images.unsplash.com/photo-1531214159280-079b95d26139?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80);
    background-repeat: no-repeat;
    background-size: cover;

  }
  .blurred-text{
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0, 0.5); /* Black w/opacity/see-through */
    z-index: 2;
  }
  .card .card-content{
    padding: 12px;

  }

 .welcome {
    /*width: 100%;*/
    max-width: 400px;
 }

 .welcome h2 {
  font-size: 3em;
  margin-bottom: 50px;
 }
 .welcome button {
  margin: 30px auto;
 }
.hide{
  display: none;
}
.welcome span{
  margin-bottom: 30px;
}
.material-icons{
  color: white;
}
input {
  color: white;
}
</style>
