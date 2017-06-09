<template>
	<div class="container-fluid" >
		<div class="container">
			<div class="login-div">
				<input type="text" name="userId" placeholder="请输入11位用户账号" class="form-control" id="userId" @blur="checkUserId" v-model="userid">
				<input type="password" name="password" placeholder="请输入密码" class="form-control" id="password" v-model="password">
				
				<button id="btn-size" class="btn btn-primary size-btn" @click="checkLogin">登录</button>
				<p id="errMsg" class="err-p"></p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name : 'login',
		data() {
			return {
				userid: '',
				password: ''
			}
		},
		methods : {
			checkUserId: function($event) {
				$('#errMsg').text("");
				var userId = $event.target.value;
				var regexp = /^[0-9]{8}$/;
			
				if(!regexp.test(userId))  {
					$('#errMsg').text("用户名不正确");
				}
			},
			checkLogin : function() {
				
				if(!$("#userId").val() || !$('#password').val()) {
					$('#errMsg').text("用户名或密码不正确");
					return;
				}

		        var params = { 
					userid: this.userid,
					password: this.password
		        };

		        this.$http.post('/api/login/getUser', params)
		          .then((response) => {
		          	if(response.data.error) {
		          		$('#errMsg').text("用户名或密码不正确");
		          	}else {
		          		sessionStorage.userid = params.userid;
		          		window.sessionStorage.lastname="Smith";

		          		response.data.flag ? this.$router.push('/sellticket') : this.$router.push('/index');
		          	}
		        }); 		
			}
		}
	}
</script>

<style scoped>
	div.container-fluid {
		background: #2F9ED3;
		width: 100%;
		height: 100%;
	}
	div.container {
		width: 80rem;
		height: 35rem;
		background: url(../assets/bg.jpg);
		position: relative;
		top: 16rem;
	}
	div.login-div{
		position: absolute;
		top: 9rem;
		right: 10rem;
	}
	div.login-div .form-control,.btn{
		width: 23rem;
		margin-top: 2rem;
	}
	p.err-p {
		color: red;
	}
</style>



