<template>
<div>
	<Heade></Heade>
	<div class="container">
			<div class="control">
				<router-link to="/addproject"><button class="btn btn-default btn-sm">添加</button></router-link>						
			</div>
		<table class="table table-hover">
		<tbody>
			<tr>
				<th>#</th>
				<th>电影名称</th>
				<th>放映时间</th>
				<th>放映影厅</th>
				<th>操作</th>
			</tr>
			<tr v-for="(project, index) in projects">
				<td>{{ index }}</td>
				<td>{{ project.movieName }}</td>
				<td>{{ project.scheduleTime }}</td>
				<td>{{ project.hallNum }}号影厅</td>
				<td>
					<router-link :to="{ path: '/editproject', query: { projectId: project.projectId }}">修改</router-link>
				</td>
			</tr>
						
		</tbody>
		</table>
	</div>
	<Foot></Foot>
</div>
</template>

<script>
	import Heade from './Heade'
	import Foot from './Foot'

	export default {
		name : 'newProject',
		data() {
			return {
				projects : []
			}
		},
		beforeMount() {
	        this.$http.get('/api/project/getAll')
	          .then((response) => {
	          	console.log(response.data);
				this.projects = response.data.projects;	          	
	        }); 					
		},
		components: {
			Heade,
			Foot
		}
	}
</script>
<style scoped>
	.container table th {
		text-align: center;
	}
	.control button {
		float: left;
		margin: 1rem;
	}
</style>