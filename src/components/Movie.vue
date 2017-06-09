<template>
	<div>
		<Heade></Heade>
		<div class="">
			<div class="control container-fluid">
				<router-link to="/addmovie"><button class="btn btn-default btn-sm">添加</button></router-link>					
			</div>
			<div class="container-fluid container-introduction" v-for="movie in movies">
				<div class="left">
					<img v-bind:src="movie.path">
				</div>	
				<div class="right">
					<ul>
						<li>电影: {{ movie.movieName }}</li>
						<li>导演: {{ movie.movieDirector }} </li>
						<li>主演: {{ movie.movieActor }}</li>
						<li>类型：{{ movie.movieType }}</li>
						<li>语言: {{ movie.movieLanguage }}</li>
						<li>片长: {{ movie.movieLong }}分钟</li>
						<li>简介：{{ movie.movieSummary }}</li>
						<li>价格: {{ movie.price }}</li>

						<li><router-link :to="{path:'editmovie', query: {movieName : movie.movieName}}" class="edit">修改</router-link></li>
					</ul>
				</div>
			</div>			
		</div>
		<Foot></Foot>
	</div>
</template>

<script>
	import Heade from './Heade'
	import Foot from './Foot'

	export default {
		name : 'Movie',
		data() {
			return {
				movies : []
			}
		},
		beforeMount() {
			this.init();
		},
		methods: {
			init() {
		        this.$http.get('/api/movie/getAll')
		          .then((response) => {
		          	console.log(response.data);
					this.movies = response.data.movies;	          	
		        }); 							
			}
		},	
		components : {
			Heade,
			Foot
		}
	}
</script>

<style scoped>
	div.container-introduction {
		padding: 4rem;
		margin-top: 0.3rem;
		background: #F8F8F8;
		margin-bottom: 6.5rem;
	}
	.container-introduction .left {
		width: 30%;
		float: left;
	}
	.left img {
		width: 40%;
		height: 40%;
		box-shadow: 5px 5px 5px #ccc;
		border: 1px solid #ccc;
	} 
	.container-introduction .right {
		margin-top: 0.9%;
		float: left;
		width: 70%;

	}
	.right ul {
		list-style: none;
		font-size: 1.5rem;
		text-align: left;
		color: #7787A8;
	}
	.hiden {
		display: none;
	}
	.control button {
		float: right;
	}
</style>