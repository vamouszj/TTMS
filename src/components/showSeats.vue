<template>
	<div class="container-fluid">
		<router-link to="/auditorium" class="back">返回</router-link>
		<div class="container">
			<select class="form-control" @change="initSeats" >
				<option v-for="item in hallIndex" v-bind:value="item">{{ item }}号影厅</option>
			</select>

			<div class="container" @click="change">
				<div class="seats-container seats">
					<ul class="list-ul" v-for="seat in seats">
						<li><span  v-bind:id="seat.seatId" v-bind:state="seat.seatState"></span></li>				
					</ul>
				</div>
			</div>
			<button class="btn btn-primary" @click="submit">提交</button>
		</div>
	</div>
</template>

<script>
	import Heade from './Heade'
	import Foot from './Foot'
	export default {
		name : 'showSeats',
		data() {
			return {
				hallIndex: [],   //所有影厅的编号
				seats : []        
			}
		},
		beforeMount: function() {
			//得到所有影厅的编号
			this.$http.post('/api/hall/getNums')
	          .then((response) => {  
				 this.hallIndex = response.data.hallIndex;

				//得到第一个option所对应的座位的信息   
				var index = this.hallIndex[0];
				 
				this.$http.post('/api/hall/getSeats', {hallNum : index})
		          .then((response) => {  
					 this.seats = response.data.seats;    	
			    }); 

		    }); 			
		},
		mounted () {
			this.checkIfUserId();
			var that = this;
			window.setInterval(() => {
				that.changeSeats();
			}, 1000);
		},
 		methods : {
 			checkIfUserId() {
		        if(window.sessionStorage.userid) {
		          this.userName = window.sessionStorage.userid;
		        }else {
		          this.$router.push('/');
		        }
		    },
 			/*当改变影厅select框的内容时*/
			initSeats : function($event) {
				var value = $('select').eq(0).val();

				this.seats = []; 
				this.$http.post('/api/hall/getSeats', {hallNum : value})
		          .then((response) => {  
					 this.seats = response.data.seats;    	
			    }); 

				this.changeSeats();			
			},
			/*改变可视座位的颜色*/
			changeSeats : function() {
				var spans = $('span');

				for(var i = 0, len = this.seats.length; i < len; i++) {
					if( this.seats[i].seatState == 1) {
						spans.eq(i).css('background', 'red');
					}
				}
			},
			change : function($event) {
				var el = $event.target;
				var index = parseInt(parseInt($(el).attr('id') - this.seats[0].seatId));

				if(el.tagName.toLowerCase() != 'span') {
					return;
				}
				
				if($(el).css("backgroundColor") == 'rgb(255, 0, 0)') {
					$(el).attr('state', 0);
					this.seats[index].seatState = 0;

					$(el).css({
						'backgroundColor': '#ccc'   /*可用座位*/
					});
				}else if ($(el).css("backgroundColor") == 'rgb(204, 204, 204)') {
					$(el).attr('state', 1);
					this.seats[index].seatState = 1;

					$(el).css({
						'backgroundColor': 'red'   /*不可用状态*/
					});					
				}	
			},
			submit: function() {
				var value = $('select').eq(0).val();
				this.$http.post('/api/hall/setSeats', {hallNum : value, seats : this.seats})
		          .then((response) => {  
					 alert("修改成功"); 	
			    });  
			    this.changeSeats();				
			}
		},
		components: {
			Heade,
			Foot
		}

	}
</script>

<style scoped>
	select.form-control {
		width: 38%;
		margin: 4rem 38rem 1.8rem 38rem;
	}
	.back {
		position: absolute;
		left: 37rem;
		top: 4rem;
		padding: 1rem  2rem;
		border: 1px solid #ccc;
		border-radius: 20px;
	}
	.list-ul {
		list-style: none;
	}
	.list-ul li {
		float: left;

/*		width: 3%;
		height: 3rem;*/
/*		background: #ddd;*/
	}
	.list-ul li span {
		display: inline-block;
		width: 2.3rem;
		height: 2rem;
		margin: 0.2rem;
		background: #ccc;
	}
	div.seats-container {
		width: 70%;
		margin: 0 auto;
	}
	div.seats {
		width: 40%;
	}
	button.btn-primary {
		width: 38%;
		margin: 2rem 33rem;
		float: right;

	}

</style>