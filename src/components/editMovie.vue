<template>
	<div>
		<Heade></Heade>
		<div class="container edit">
			<input type="text" class="form-control" placeholder="电影名称" v-model="movie.movieName" disabled="true">
			<select class="form-control" v-bind:value="movie.movieType">
				<option>爱情</option>
				<option>喜剧</option>
				<option>动作</option>
				<option>剧情</option>
				<option>科幻</option>
				<option>恐怖</option>
				<option>动画</option>
				<option>惊悚</option>
				<option>犯罪</option>
				<option>冒险</option>
			</select>
			<textarea class="form-control" rows="2" placeholder="电影介绍" v-model="movie.movieSummary"></textarea>
			<input type="text" name="" placeholder="导演" class="form-control" v-model="movie.movieDirector">
			<input type="text" name="" class="form-control" placeholder="主演:例如 赵顺然 / 朱颜曼滋" v-model="movie.movieActor">
			<input type="text" name="" placeholder="时长(分钟)" class="form-control" v-model="movie.movieLong">
			<input type="text" name="" placeholder="语言" class="form-control" v-model="movie.movieLanguage">
			<input type="text" name="" placeholder="票价" class="form-control" v-model="movie.price">
			<a href="javascript:void(0)" class="upload form-control">选择文件
	    		<input class="change" type="file" multiple="multiple" id="file" />
			</a>
			<button class="btn btn-primary" @click="submit">提交</button>
			</div>
		<Foot></Foot>
	</div>
</template>

<script>
	import Heade from './Heade'
	import Foot from './Foot'
	export default {
		name : "editMovie",
		data() {
			return {
				movie : {}
			}
		},
		beforeMount () {
				var params = {
				    movieName : this.$route.query.movieName					
				};

				this.$http.post('/api/movie/get', params)
		          .then((response) => {
					this.movie = response.data.movie;	          	
		        }); 
		        console.log(this.movie._id);
		},	
		methods : {
			submit : function() {	
				var formData = new FormData();
				var file = $("#file").get(0).files[0];

				
				var movie = {
					movieName : this.movie.movieName,
					movieType : $('.edit').find('select').eq(0).val(),
					movieSummary : this.movie.movieSummary,
					movieDirector: this.movie.movieDirector,
					movieActor:  this.movie.movieActor,
					movieLong : this.movie.movieLong,
					movieLanguage : this.movie.movieLanguage,
					price : this.movie.price,
/*					path :  formData document.getElementById("file").files[0]*/
				};

				console.log(movie);

               /* formData.append("path", file, 'new.jpg');*/
                var path =  document.getElementById("file").files[0] || this.movie.path;
                formData.append("path", path); 
              	formData.append('movieName', movie.movieName);
              	formData.append('movieType', movie.movieType);
              	formData.append('movieSummary', movie.movieSummary);
              	formData.append('movieDirector', movie.movieDirector);
              	formData.append('movieActor', movie.movieActor);
              	formData.append('movieLong', movie.movieLong);
              	formData.append('movieLanguage', movie.movieLanguage);
              	formData.append('price', movie.price);

		        this.$http.post('/api/movie/update', formData)
		          .then((response) => {
		          	if(response.data.error) {
		          		$('#err').val("添加失败，请重试");
		          	}else {
		          		this.$router.push('/movie');
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
	.upload{
	    position: relative;
	    text-decoration: none;
	}
	.change{
	    position: absolute;
	    overflow: hidden;
	    right: 0;
	    top: 0;
	    opacity: 0;
	}
	.edit {
		margin-bottom: 13rem;
	}
</style>