<template>
	<div>
		<Heade></Heade>
		<div class="container auditor">
			<input type="text" name="id" class="form-control" placeholder="演出厅编号" v-model="auditorium.hallNum">
			<select class="form-control" v-bind:value="auditorium.seatCount">
				<option>90</option>
				<option>120</option>
				<option>150</option>
			</select>
			<select class="form-control" v-bind:value="auditorium.hallState">
				<option>已安排</option>
				<option>未安排</option>
			</select>			
			<select class="form-control" v-bind:value="auditorium.hallType">
				<option>2D</option>
				<option>3D</option>
			</select>
			<button class="btn btn-primary" @click="submit">提交</button>
		</div>
		<Foot></Foot>
	</div>
</template>

<script>
	import Heade from './Heade'
	import Foot from './Foot'
	export default {
		name : "editAuditorium",
		data() {
			return {
				auditorium : {}
			}
		},
		beforeMount () {
				var params = {
				    hallNum : this.$route.query.hallNum					
				};

		        this.$http.post('/api/hall/get', params)
		          .then((response) => {
					this.auditorium = response.data.auditorium;	          	
		        }); 
		},	
		methods : {
			submit() {
				var auditorium = {
					hallNum : this.auditorium.hallNum,
					seatCount : $('.auditor').find('select').eq(0).val(),
					hallState : $('.auditor').find('select').eq(1).val(),
					hallType: $('.auditor').find('select').eq(2).val()
				};
				
				this.$http.post('/api/hall/update', auditorium)
		          .then((response) => {  
					   this.$router.push('/auditorium');    	
		        });
			}
		},

		components: {
			Heade,
			Foot
		}
	}
</script>

<style scoped>
	div.container .form-control{
		margin: 2rem auto;
		width: 32rem;
		text-align: center;
	}
	.radio-inline{
		width: 13rem;
	}
	button.btn{
		width: 32rem;
	}

</style>