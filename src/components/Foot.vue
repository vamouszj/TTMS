<template>
	<div class="container-fluid">
		<img src="../assets/footer.jpg">
		<p> Copyright © 2017 美佳剧院 版权所有</p>
	</div>
</template>

<script>
	export default {
		name: 'foot'
	}
</script>

<style scoped>
	div.container-fluid {
		position:fixed;
		bottom: 0rem;
		height: 12rem;
		width: 100%;
		margin-top: 3rem;
		background: rgba(34, 40, 45, 0.7);
		z-index: 9999;
	}
	div.container-fluid img {
		width: 4%;
		margin: 1.1em auto;
	}
	div.container-fluid p {
		color: white;
	}
</style>