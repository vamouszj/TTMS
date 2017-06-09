<template>
	<div>
		<Heade></Heade>
		<div class="movie-contain">
			<div class="container-fluid container-introduction">
				<div class="left">
					<img src="../assets/littleStory.jpg">
				</div>
				<div class="right">
					<ul>
						<li>导演: 乔梁 </li>
						<li>主演: 赵顺然 / 朱颜曼滋 / 姜瑞佳 / 高子沣 / 杨青 </li>
						<li>类型：剧情 / 爱情</li>
						<li>语言: 汉语</li>
						<li>片长: 100分钟</li>
						<li>简介：宁静的小城，纯真的岁月，全城高考的紧张气氛凝聚的高中，由一场大胆的表白掀起了全校传递情书的风潮，一封知名不具的仰慕信展开了一个故事</li>
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
		name : 'alreadyOnScreen',
		components : {
			Heade,
			Foot
		}
	}
</script>

<style scoped>
	div.container-introduction {
		padding: 4rem;
		margin-top: 2rem;
		background: #F8F8F8;
	}
	.container-introduction .left {
		width: 30%;
		float: left;
	}
	.left img {
		width: 63%;
		height: 44%;
		box-shadow: 5px 5px 5px #ccc;
		border: 1px solid #ccc;
	} 
	.container-introduction .right {
		margin-top: 1.8%;
		float: left;
		width: 70%;

	}
	.right ul {
		list-style: none;
		font-size: 1.5rem;
		text-align: left;
		color: #7787A8;
	}
	.movie-contain {
		margin-bottom: 10rem;
	}
</style>