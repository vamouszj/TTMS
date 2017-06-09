<template>
	<div>
		<Heade></Heade>
		<div class="container auditor">
			<input type="text" class="form-control" placeholder="演出厅编号">
			<select class="form-control">
				<option>90</option>
				<option>120</option>
				<option>150</option>
			</select>
			<select class="form-control">
				<option>已安排</option>
				<option>未安排</option>
			</select>			
			<select class="form-control">
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
		name : "addAuditorium",
		components: {
			Heade,
			Foot
		},
		methods : {
			submit() {
				let auditorium = {			
					hallNum : $('.auditor').find('input').eq(0).val(),
					seatCount : $('.auditor').find('select').eq(0).val(),
					hallState : $('.auditor').find('select').eq(1).val(),
					hallType: $('.auditor').find('select').eq(2).val()
				};
				console.log(auditorium);
		        this.$http.post('/api/hall/add', auditorium)
		          .then((response) => {
		          	if(response.data.error) {
		          		alert("添加失败，请重试");
		          	}else {
		          		this.$router.push('/auditorium');
		          	}		          	
		        }); 

			}

		},		
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