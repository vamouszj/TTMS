<template>
	<div>
		<Heade></Heade>
		<div class="container">
			<div class="control">
				<router-link to="/addauditorium"><button class="btn btn-default btn-sm">添加</button></router-link>						
			</div>

			<table class="table table-hover">
			<tbody>
				<tr>
					<th>#</th>
					<th>演出厅编号</th>
					<th>座位数</th>
					<th>状态</th>
					<th>类型</th>
					<th>操作</th>
				</tr>
				<tr v-for="(auditorium, index) in auditoriums">
					<td>{{ index }}</td>
					<td>{{ auditorium.hallNum }}</td>
					<td>{{ auditorium.seatCount }}</td>
					<td>{{ auditorium.hallState }}</td>
					<td>{{ auditorium.hallType }}</td>
					<td>
						<router-link :to="{ path: 'editAuditorium', query: { hallNum: auditorium.hallNum }}">修改 </router-link>
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
		name : 'auditorium',
		data() {
			return {
				auditoriums : [] 
			}
		},
		beforeMount() {
			this.init();
		},
		methods: {
			init() {
		        this.$http.get('/api/hall/getAll')
		          .then((response) => {
		          	console.log(response.data);
					this.auditoriums = response.data.halls;	          	
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
.container table th {
	text-align: center;
}
.control button {
	float: left;
	margin: 1rem;
}
</style>