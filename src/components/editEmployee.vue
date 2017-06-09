<!-- 修改员工信息 -->
<template>
	<div>
		<Heade></Heade>
		<div class="container employ">
		<input type="text" class="form-control" placeholder="员工号" v-model="person.workId" disabled="true">
		<input type="text"  class="form-control" placeholder="姓名" v-model="person.workName">
		<input type="text" name="" class="form-control" placeholder="身份证号" v-model="person.personId">
		<input type="text" name="" class="form-control" placeholder="电话号码" v-model="person.phoneNumber">
		<select class="form-control" v-bind:value="person.worker">
			<option>售票员</option>
			<option>经理</option>
			<option>后勤</option>
			<option>管理员</option>
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
		name : "editemployee",
		components: {
			Heade,
			Foot
		},
		data() {
			return {
				person : {
				},
			}
		},
		beforeMount () {
				//发送ajax请求，请求该员工信息
				var params = {
				    workId : this.$route.query.workId					
				};

		        this.$http.post('/api/employees/get', params)
		          .then((response) => {
					this.person = response.data.person;	          	
		        }); 				
		},	
		methods : {
			submit() {
				var person = {
				    workId : this.person.workId,  /*员工号*/
				    workName : this.person.workName,  /*姓名*/
				    worker : $('.employ').find('select').eq(0).val(),
				    personId : this.person.personId,  /*身份证号*/
				    phoneNumber: this.person.phoneNumber /*电话号码*/
				};
				
				console.log(person);
				//发送请求，保存修改员工信息
				this.$http.post('/api/employees/update', person)
		          .then((response) => {  
					      	
		        }); 
			}
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
	.employ select {
		text-align: center;
	}

</style>