<template>
	<div id="YouSync">

		<div id="mainView">
            
                <youtube id="playCss"
                    :unique-id="messageid"
                    :ref="this.uniqueID"
                    :video-id="leID" 
                    :player-vars="playerVars"
                    @ready="ready" 
                    @playing="playing" 
                    @paused="paused"
                    @ended="ended"	
                    loading="lazy"
                ></youtube>
           
			<span ref="alert" id="alert" :v-if="this.alert === 'Resyncing. Clients not in sync.'" >{{this.alert}} </span>
		</div>
		
		<div class="youtubeControls"> 
				<!-- <button @click="playVideo">Play</button> Hidden from view now
				<button @click="pauseVideo">Pause</button>
				<button @click="seekTo">Seek To</button> -->
				<button :id="this.uniqueID" @click="playAll($event)">Play</button>
				<button :id="this.uniqueID" @click="pauseAll($event)">Pause</button>
                <button :id="this.uniqueID" @click="seekOnOthers($event)">Sync</button>
				<button :id="this.uniqueID" @click="backToStart($event)">Restart</button>
                
                <button :id="this.uniqueID" @click="muteAll($event)">Mute</button>
                <button :id="this.uniqueID" @click="unmuteAll($event)">Unmute</button>
				<button :id="this.uniqueID" @click="startTheShow($event)">Show</button>
                <button :id="this.uniqueID" @click="stopTheShow($event)">StopShow</button>
				<!-- <p>Message is: {{ youtubeId }}</p>   -->
                <!--<button @click="randomKPop">RandomKPop</button>-->
		</div>


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
	import io from 'socket.io-client'; 


	export default {
        name: 'YouSyncMessage',
        props: ['name', 'room', 'leID', 'messageid'],
		data(){
			return {
                socket: {},
                playerVars: {
                    'rel': 0,
                    // 'controls': 0
                },
                context: 0,
                position :{x: 0, y: 0},
                videoId: 'nx3egm8xIo8',
                events: [],
                username: "",
                youtubeId: "bwmSjveL3Lc", //2S24-y0Ij3Y
                randomkpop:[],
                currentTime: "",
                alert: "",
                state: "",
                personalTime: "",
                difference: 0,
                uniqueID: this.messageid,
                check: false,
                repetitive: null
               



                //seekTo
                // seconds: "35",
                // allowSeekAhead : true,
			}
		},
		created(){
           
			this.socket = io("http://localhost:3000/"); // http://192.168.100.3:3000/" "http://localhost:3000/" Client socket to > server adress / Gitpod change 
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
		methods: {
				seekOnOthers(event){
                    // Get Sender current time and pass it along seekOnOthers
                    let targetId = event.currentTarget.id;

					this.$refs[targetId].player.getCurrentTime().then(value => {
						//console.log('The one i clicked seek button is on:'+value)
						this.socket.emit("seekOnOthers", value, targetId)
					});
					
                },
                playAll(event){
                     let targetId = event.currentTarget.id; //Needs to be outside here
                    //console.log(targetId + "initiated play");
                
					this.$refs[targetId].player.getCurrentTime().then(value => {
						// Do something with the value here
                        //console.log('I paused at '+ value)
                       
						this.socket.emit("play_all", value, targetId  )
					});
				},
				pauseAll(event){
                    let targetId = event.currentTarget.id;

					this.$refs[targetId].player.getCurrentTime().then(value => {
						// Do something with the value here
                        //console.log('I paused at '+ value)
                      
						this.socket.emit("pause_all", value, targetId)
					});
                },
                backToStart(event){
                    let targetId = event.currentTarget.id;
					this.socket.emit("backToStart_all", targetId)
				},
                startTheShow(event){
                    
                    // console.log(targetId+ "from outside") checked
                     let targetId = event.currentTarget.id;
                     this.repetitive = window.setInterval(() => {
                        //  console.log(targetId + "from inside setInterval") chcked

						this.$refs[targetId].player.getCurrentTime().then(value => {
							// Do something with the value here
							//console.log(value)
							
							this.socket.emit("getCurrentTime", value, targetId)
							
						});


						}, 1500)
                },
                stopTheShow(){
                    window.clearInterval(this.repetitive);
                },





				ready (event) { //This guys tells me state of player, OH it shouts automatically
						this.player = event.target;
						console.log('Player is ready.')
						this.socket.emit("ready");
				},
				ended (){
					console.log('Yay. You`ve stayed until the end . Video ended!')
					this.socket.emit("ended");
				}, 
				playVideo() {
					this.player.playVideo()
				},
				pauseVideo(){
					this.player.pauseVideo()
				},
				// seekTo(){
				// 	this.player.seekTo(5 , true)
				// },

				muteAll(){
					this.socket.emit("mute_all")
				},
				unmuteAll(){
					this.socket.emit("unmute_all")
				},
				changeSong(){
					// console.log(this.youtubeId); OK check
					
					// TO DO - Determine if playlist and play it all!

					//Determine if typed a full link or just ID
					if  (this.youtubeId.includes("www.youtube.com/watch")){
						this.socket.emit("changeSong_all", this.$youtube.getIdFromUrl(this.youtubeId))
						//this.$refs.youtubeIdInput.value="";
					} else {
						this.socket.emit("changeSong_all", this.youtubeId)
						//this.$refs.youtubeIdInput.value="";
					}

					
						
						//console.log(this.youtubeId)	
						//So it can access data () with this
				},

				// All clients call these automatically when the API itself detects change
				// playing () {

				// 	// Don't initialize state here, but on server and receive ;)
				// 	//this.state = "playing"

				// 	this.player.getCurrentTime().then(value => {
				// 		// Do something with the value here
				// 		//console.log('See'+ value)
						
				// 		this.socket.emit("playing", value)
				// 	});
							
				// },
				// paused () {
					
				// 	this.player.getCurrentTime().then(value => {
				// 		// Do something with the value here
				// 		//console.log('I paused at '+ value)
				// 		this.socket.emit("paused", value)
				// 	});

				// },
				
				// buffering (){
				// 	//this.value = this.player.getPlayerState()
					
				// 	this.socket.emit("buffering");
				// }, 
				getNotifications(){
					if (this.state !== "")
					console.log(this.state)
				},



			},



	}

</script>

	<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

    #main-view{
        /* position:relative; */
    }

    /*Responsive Yt Embeds*/ 
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

    #alert{
        position: absolute;
        z-index: 99999;
        top: 2px;
        right:2px;
        /* background: white;
        border: 1px solid orange; */
        color:black;
        background:white;
        opacity:0.6;
        width:55px;
        font-size:11px;
    }
    #youtubeLogs{
    


    }
    #YouSync{
        max-width:426px;
        width:100%;
    }
    #playCss{
        /* display:none; */
        width:100%;
        max-height:190px;
        max-width:338px;
        
    }
    .youtubeControls button{
        background-color:lightseagreen;
        font-size:11px;
        /* margin-top:150px; */

      
    }
    .youtubeControls{
          margin-top:170px;
    }
    ul.list-container  {
        list-style-type: none;
        font-size: 14px;
        height: 150px;
        /* width:400px; */
        margin:0;
        overflow-y: auto;
        background-color: #33485E;
        color:#ffffff;
        padding: 12px;
        border-radius: 0px 0px 8px 8px;
    }
    .timestamp{
        opacity: 0.75;
        font-size:12px;
        color: #ffffff;
        font-weight: 400;
        padding-left:3px;
        float: right;
    }

    /*MacOs Terminal*/ 

	#bar {
			text-align: center;
			/* width: 424px; */
			height: 25px;
			background-color: #DAD9D9;
			margin: 0 ;
			font-family: monospace;
			padding: auto;
			float: none;
			border-radius: 5px;
			position: relative;
	}
	#red {
			background-color: #E94B35;
			border-radius: 100%;
			width: 15px;
			height: 15px;
			margin: 0 auto;
			left: -200px;
			bottom: -20%;
			position:relative;
	}
	#yellow {
			background-color: #f0f000;
			border-radius: 100%;
			width: 15px;
			height: 15px;
			margin: 0 auto;
			left: -180px;
			bottom: 40%;
			position:relative;
			display: block;
	}
	#green {
			background-color: #1AAF5C;
			border-radius: 100%;
			width: 15px;
			height: 15px;
			margin: 0 auto;
			left: -160px;
			bottom: 99%;
			position:relative;
			display: block;
	}
    #whatfor{
        position: absolute;
        height: 15px;
        left: 170px;
        top: 5px;
    }

    /* .youtubeControls {} */
    #clear{
        float: right;
    }

    .play{
        color: #00ff00;
    }
    .pause{
            color: #f1f227;
    }
    .id {
        color: #be90d4;
    }
    .leftRoom{
        text-decoration: line-through;

    }
    .endView{
        color: #ff6347
    }

	</style>
