<template>
	<div>
		<Heade></Heade>
		<div class="container">
			<input type="text" placeholder="电影编号" class="form-control" id="movieName" v-model="project.projectId" disabled="true">		
			<input type="text" placeholder="电影名称" class="form-control" id="movieName" v-model="project.movieName">
			<input type="text" class="form-control" placeholder="如: 9:00-10:40" id="scheduleTime" v-model="project.scheduleTime">
			<select class="form-control" id="hallNum" v-bind:value="project.hallNum">  <!-- 可以安排演出的厅 -->
				<!-- 
					可能出现后台的可用影厅数据中不包含该演出计划的影厅编号（解决办法：该演出计划的影厅编号）
					<option>{{ project.hall_num }}</option>
				 -->
				<option v-for="index in hallIndex" v-bind:value="index">{{ index }}号影厅</option>
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
		data() {
			return {
				project : {},
				hallIndex : []
			}
		},	
		beforeMount() {
			var params = {
			    projectId : this.$route.query.projectId					
			};
			this.$http.post('/api/project/get', params)
		          .then((response) => {
					this.project = response.data.project;	          	
	        });
			//发送ajax请求，
			this.$http.post('/api/hall/getNums')
	          .then((response) => {  
				 this.hallIndex = response.data.hallIndex; 
		    });  
			//通过ajax请求得到该演出计划的相关信息		
		},
		methods : {
			submit() {
				var project = {
					projectId : this.project.projectId,
				    movieName : this.project.movieName,
		    		scheduleTime : this.project.scheduleTime,
					hallNum : $('#hallNum').val()					
				};
				
				this.$http.post('/api/project/update', project)
		          .then((response) => {  
					  this.$router.push('/newproject');	    	
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