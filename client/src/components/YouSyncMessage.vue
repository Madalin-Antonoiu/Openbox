<template>
	<div id="YouSync">




		<!-- <div id="youtubeLogs">
			<div id="bar"> 
				<span id="whatfor">Youtube Logs</span>
				
				<div id="red"></div>
				<div id="yellow"></div>
				<div id="green"></div>
			</div>
			<ul class="list-container" v-chat-scroll > 
				<li 
						v-for="(event, i) in events" :key="`${i}-${event.id}`"
						ref="playingPaused"
				
				> 
					<span class="id">{{event.id}} </span> 
					<span :class="{'play': event.action.includes('playing'), 
						'pause': event.action.includes('paused'), 
						'': event.action == 'joined room.', 
						'leftRoom': event.action == 'left room.',
						'endView' : event.action == 'ended watching.',
										
										}"
						> {{event.action}}
					</span>   

                    <a style="color: lightblue" 
                    class="videoid" 
                    v-if="event.videoid" 
                    :href="'https://www.youtube.com/watch?v='+event.videoid"
                    target="_blank"
                    rel="noopener noreferrer"
                    >link</a>

                    <span v-if="event.currentTime">{{event.currentTime}} </span>
                  
		
					<span v-if="event.senderCurrentTime">{{event.senderCurrentTime}} </span>
					
					<dynamic-from-now class="timestamp" :interval="60000"></dynamic-from-now>
				</li>
			</ul>

		</div>
 -->



	</div>
</template>

<script>
	/* eslint-disable */



	export default {
        name: 'YouSyncMessage',
        props: ['name', 'room', 'leID', 'messageid'],
		data(){
			return {
               
               



                //seekTo
                // seconds: "35",
                // allowSeekAhead : true,
			}
		},
		created(){
           
		},
		mounted(){
            //  console.dir(this.$refs); 



            // console.dir(this.$refs.madut.$el.attributes[1].value)  
           
            // console.dir(this.$refs[this.uniqueID]); 
            // if (this.$refs[this.uniqueID].$attrs.unique-id.contains("S09GwSyHviNDEGYYFpDO"))
            // console.log(this.$refs[this.uniqueID])
            //console.log(this.uniqueID)

			//Check state every second for other player, not self
			// window.setInterval(() => {
			// 	this.getNotifications()
			// }, 1000)
		
			

				
			this.socket.on('getCurrentTime', data => {  

				//Restul 3 primesc asta
                //let targetId = data.targetId;
				// #### THis is the magical formula i`ve been waiting to develop ! It finally compares both times without delay! ##############
				this.$refs[data.targetId].player.getCurrentTime().then(value => {
                            
                        this.difference = data.currentTime - value

						if (value < data.currentTime - 0.150 || value > data.currentTime + 0.150) {
						
							//this.player.seekTo(data.currentTime, true); // might need to time it out by .400 or so
						
							//this.$refs.syncWithMe.click();
							
								//this.player.seekTo(data.currentTime, true); - to auto sync
							

							// // Forces video to play right after seek
							//
							//console.log('They are not in .2 sync')
							this.alert= "🟡" + parseFloat(this.difference.toFixed(3))
						}
						
						else {
							//console.log('Clients are in sync')
							//Clients in sync
							this.alert= "🟢" + parseFloat(this.difference.toFixed(3))
						}
				});
					

		
				//this.events.push(data);
			})

			this.socket.on('seekOnOthers', data => {  
				 //1. Write to dom - Check
				//this.events.push(data)
				//console.log('Received back from server:' + " "+ data.senderCurrentTime)
				this.$refs[data.targetId].player.seekTo(data.senderCurrentTime, true); // Basically saying this ytb component with ref of id seek
				
				//All the logic should be done server side

			})
				
			this.socket.on('pause_all', data => {  
				//this.events.push(data);
				this.$refs[data.targetId].player.pauseVideo();
            })
            
			this.socket.on('play_all', data => {  
                
                //this.events.push(data);

                this.$refs[data.targetId].player.playVideo(); // Hitting play button only on the id that generated it
                // }
            })
            this.socket.on('backToStart_all', data => {  

                //this.events.push(data);
				this.$refs[data.targetId].player.seekTo(0, true)	
			})

			//Shutting this off for it is annoying atm
			//var username = prompt('What\'s your username?');

			//if (username){ 

				// this.socket.emit('little_newbie', username);

				// Sectia primire de catre Client inapoi de la server

            // I can do click on player playing/ paused after
            this.socket.on('playing', data => {  
				//this.state = data.id + " is " + data.action;

				//console.log("This state is now :" + this.state ) //Works
				//console.log(data.action + " " + data.id) //Works
				this.state = data.id + " is " + data.action + " at "+ data.currentTime;
				
				this.events.push(data);
			})


			this.socket.on('paused', data => {  

				this.state = data.id + " is " + data.action;
				this.events.push(data);		
			})

			this.socket.on('disconnect', data => {  
				this.events.push(data);
			})


			this.socket.on('ready', data => {  
					this.events.push(data); //write to array, which will output to dom with v-for
			})
			this.socket.on('ended', data => {  
					this.events.push(data); //write to array, which will output to dom with v-for
			})



			this.socket.on('mute_all', data => {  
			
				this.player.mute()
				this.events.push(data);
			})
			this.socket.on('unmute_all', data => { 
				this.player.unMute()
				this.events.push(data);
			})
			this.socket.on('changeSong_all', data => {  

				//console.log( 'This comes from mounted' + this.youtubeId)	
				//So this socket gets but not all.. the pbolem is in Socketio emit!
				this.player.loadVideoById(data.videoid, 0, "large")
				this.events.push(data);
				//console.log(data.youtubeId); This check is OK!
		
			})


			// this.socket.on('little_newbie', data => {  
			// 	this.events.push(data); //write to array, which will output to dom with v-for
			// })

			//}

			//setInterval(this.getNow, 5000);//refs are available only after mounted

        },
        computed: {
            player() {
                return this.$refs[this.uniqueID].youtube.player
            }
        },




	}

</script>

	<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

	</style>
