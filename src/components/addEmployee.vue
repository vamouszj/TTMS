<!-- 添加员工 -->
<template>
	<div>
		<Heade></Heade>
		<div class="container employ">
			<input type="text" class="form-control" placeholder="员工号" v-model="person.workId">
			<input type="text" class="form-control" placeholder="姓名" v-model="person.workName">
			<input type="text" name="" class="form-control" placeholder="身份证号" v-model="person.personId">
			<input type="text" name="" class="form-control" placeholder="电话号码" v-model="person.phoneNumber">
			<select class="form-control">
				<option>售票员</option>
				<option>经理</option>
				<option>后勤</option>
				<option>管理员</option>
			</select>
			<button class="btn btn-primary" @click="addUser">提交</button>
 			<span id="err"></span>
			</div>
		<Foot></Foot>
	</div>
</template>

<script>
	import Heade from './Heade'
	import Foot from './Foot'
	export default {
		name : "addEmployee",
		data() {
			return {
				person : {}
			}
		},
		methods : {
			addUser() {
				var params = {
				    workId : this.person.workId,  /*员工号*/
				    workName : this.person.workName,  /*姓名*/
				    worker : $('.employ').find('select').eq(0).val(), /*职位*/
				    personId : this.person.personId,  /*身份证号*/
				    phoneNumber: this.person.phoneNumber /*电话号码*/
				};
				console.log(params);
		        this.$http.post('/api/employees/add', params)
		          .then((response) => {
		          	if(response.data.error) {
		          		$('#err').val("添加失败，请重试");
		          	}else {
		          		this.$router.push('/index');
		          	}		          	
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