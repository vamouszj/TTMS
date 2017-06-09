<template>
	<div>
		<Heade></Heade>
		<div class="container">
			<div class="control">
				<router-link to="/addemployee"><button class="btn btn-default btn-sm">添加</button></router-link>						
			</div>

			<table class="table table-hover">
			<tbody>
				<tr>
					<th>#</th>
					<th>员工号</th>
					<th>姓名</th>
					<th>职位</th>
					<th>身份证号</th>
					<th>联系方式</th>
					<th>操作</th>
				</tr>
				<tr v-for="(person, index) in persons">
					<td>{{ index }}</td>
					<td>{{ person.workId }}</td>
					<td>{{ person.workName }}</td>
					<td>{{ person.worker }}</td>
					<td>{{ person.personId }}</td>
					<td>{{ person.phoneNumber }}</td>
					<td>
						<router-link :to="{ path: 'editemployee', query: { workId: person.workId }}">修改 </router-link>

						<a href="#" v-bind:wd="person.workId" @click="deleteUser">删除</a>
					</td>
				</tr>	
			</tbody>
			</table>
		</div>
		<router-view></router-view>
		<Foot></Foot>
	</div>
</template>

<script>
	import Heade from './Heade'
	import Foot from './Foot'

	export default {
		name : 'Index',
		data () {
			return {
				persons : [],				
			}
		},
		beforeMount () {
			this.init();		
		},
		methods : {
			init() {
		        this.$http.get('/api/employees/getAll')
		          .then((response) => {
		          	console.log(response.data);
					this.persons = response.data.persons;	          	
		        }); 				
			},
			deleteUser: function($event) {
				$($event.target).parent().parent().remove();

				var obj = {
					"workId" : $($event.target).attr('wd')
				};
				console.log(obj);
		        this.$http.post('/api/employees/del', obj)
		          .then((response) => {
						          	
		        }); 
			},

		},
		components : {
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