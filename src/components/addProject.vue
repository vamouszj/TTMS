<template>
	<div>
		<Heade></Heade>
		<div class="container">
			<input type="text" placeholder="电影编号" class="form-control" id="movieName" v-model="project.projectId">		
			<input type="text" placeholder="电影名称" class="form-control" id="movieName" v-model="project.movieName">
			<input type="text" class="form-control" placeholder="如: 9:00-10:40" id="scheduleTime" v-model="project.scheduleTime">
			<select class="form-control" id="hallNum">  <!-- 可以安排演出的厅 -->
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
		name : "addProject",
		data() {
			return {
				hallIndex : [3, 4, 5],
				project :{}
			}
		},
		beforeMount() {
			this.$http.post('/api/hall/getNums')
	          .then((response) => {  
				 this.hallIndex = response.data.hallIndex;
		    }); 			
		},
		methods : {
			submit : function() {

				var project = {
					projectId : this.project.projectId,
				    movieName : this.project.movieName,
		    		scheduleTime : this.project.scheduleTime,
					hallNum : $('#hallNum').val()					
				};

				console.log(project);

		        this.$http.post('/api/project/add', project)
		          .then((response) => {
		          	if(response.data.error) {
		          		alert("添加失败，请重试");
		          	}else {
		          		this.$router.push('/newproject');
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
	div.container select {
		text-align: center;
	}
	.radio-inline{
		width: 13rem;
	}
	button.btn{
		width: 32rem;
	}

</style>