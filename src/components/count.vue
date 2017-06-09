<template>
	<div>
		<Heade></Heade>
		<div class="container chart-container">
			<div id="myChart" class="chart"></div>	
		</div>
		<Foot></Foot>		
	</div>
</template>

<script>
	import Heade from './Heade'
	import Foot from './Foot'
	export default {
		name : 'Count',
		data() {
			return {
				counts : []
			}
		},
		components: {
			Heade,
			Foot
		},
		methods : {
			draw() {
        // 基于准备好的dom，初始化echarts实例
	        	let myChart = this.$echarts.init(document.getElementById('myChart'))
	        // 绘制图表
	        	myChart.setOption({
				    color: ['#3398DB'],
				    tooltip : {
				        trigger: 'axis',
				        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
				        }
				    },
				    grid: {
				        left: '3%',
				        right: '4%',
				        bottom: '3%',
				        containLabel: true
				    },
				    xAxis : [
				        {
				            type : 'category',
				            data : ['周一', '周二', '周三', '周四', '周五', '周六', '周天'],
				            axisTick: {
				                alignWithLabel: true
				            }
				        }
				    ],
				    yAxis : [
				        {
				            type : 'value'
				        }
				    ],
				    series : [
				        {
				            name:'售出影票',
				            type:'bar',
				            barWidth: '60%',
				            data: this.counts
				        }
				    ]			
				});
			}
		},
		mounted () {
			//
			this.$http.post('/api/count/get')
			   .then((response) => {

			   	var counts = response.data.counts;
			   	for(var i = 0, len = counts.length; i < len; i++) {			   		
					this.counts.push(counts[i].number);	          	
			   	}
			   	this.draw();
			});	
			   
			
		}
	}
</script>

<style scoped>
	.chart-container {
		margin-bottom: 13rem;
	}
	.chart {
		width: 50rem;
		height: 50rem;
		margin: 0.3rem auto;
	}
</style>