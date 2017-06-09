<template>
	<div class="container-fluid">
	<div class="container">
		<div class="choose-seat">
 			<div class="show" @click="change">
 			        <div class="seat-tip">
                         <span>可选座位</span>
                         <span>已售座位</span>
                         <span>已选座位</span>
                     </div>
 			        <div class="seat-color">
                         <span class="color-order"></span>
                         <span class="color-selled"></span>
                         <span class="color-green"></span>
                     </div>                     
					<h3>银幕</h3>
					<div class="seats-container seats">
						<ul class="list-ul" v-for="seat in seats">
							<li><span v-bind:id="seat.seatId" v-bind:state="seat.seatState" v-bind:row="seat.row" v-bind:column="seat.column" class="span-seat"></span></li>				
						</ul>
					</div>
			</div>		
		</div>
		<div class="sidebar-menu">
			<h3>购票选座</h3>
 			<select class="form-control" @change="query">
				<option v-for="movie in movies" v-bind:value="movie.price">{{movie.movieName}}</option>
			</select>
			<select class="form-control" @change="changeHall" id="project">
				<option v-for="project in projects" v-bind:value="project.hallNum">{{project.scheduleTime}}</option>
			</select>	 
			<hr>
			<ul class="side-ul">
				<li><span class="item">影厅</span><strong id="ting">{{nowHall}}厅</strong></li>
          		<li><span class="item">票价</span><strong><em id="price">¥{{nowPrice}}</em>/张</strong></li>
          		<li><span class="item">总价</span><span class="val">¥{{countPrice}}</span><span class="fee gray"></span></li>
          		<li><span class="item">座位</span>点击左侧座位直接选择</li>
			</ul>
			<ul class="side-ul side-seats">
				<li v-for="item in nowChoose">{{item.row}}排{{item.col}}座</li>
			</ul>
	
			<button class="btn" @click="submit">确认</button>

		</div>
	</div>		
	</div>	
</template>

<script>
	export default {
		name : 'sellTicket',
		data() {
			return {
				nowHall : 0,
				nowPrice: 0,
				nowChoose : [],
				movies : [],
				projects: [],
				seats : [],
				countPrice : 0      				
			}					
		},
		beforeMount: function() {
			//得到所有未放映影片的信息，并且得到有关该电影的安排演出的计划

			this.$http.post('/api/movie/getSome')
	          .then((response) => {
				this.movies = response.data.movies;	
				this.nowPrice = this.movies[0].price;

				var movieName = this.movies[0].movieName;

				this.$http.post('/api/project/getByName', {"movieName" : movieName})
		          .then((response) => {
					this.projects = response.data.projects;

					var first = this.projects[0].hallNum;
					this.nowHall = this.projects[0].hallNum;

			        this.$http.post('/api/hall/getSeats', {"hallNum" : first})
			          .then((response) => {
						this.seats = response.data.seats;	          	
			        });				
		        });          	
	        }); 						
		},	
		mounted() {	
			window.setInterval(() => {
 				this.changeColor();
			}, 100);		 			
		},
		methods : {
			changeColor : function() {
				var spans = $('.span-seat');

				for(var i = 0, len = this.seats.length; i < len; i++) {
					if( this.seats[i].seatState == 2) {
						spans.eq(i).css('background', 'red');
					}else if( this.seats[i].seatState == 1) {
						spans.eq(i).css('visibility', 'hidden');
					}
				}				
			},
			query : function($event) {
				var that = this;
				//1.当选中的电影发生改变时，修改票价后面的价格
				this.nowPrice = $($event.target).val();

				//2.修该选择时间的option的内容，更新projects
				var movie = $($event.target).find("option:selected").text();

		        this.$http.post('/api/project/getByName', {"movieName" : movie})
		          .then((response) => {
		          	if (response.data.projects.length <= 0) {
		          		this.projects = [{scheduleTime : '暂时未安排'}];
		          		return;
		          	}
					this.projects = response.data.projects;

					//3.更新座位情况
					var first = this.projects[0].hallNum;
					this.nowHall = this.projects[0].hallNum;   
			        this.$http.post('/api/hall/getSeats', {"hallNum" : first})
			          .then((response) => {
						this.seats = response.data.seats;	          	
			        });	
		        });					
			},
			changeHall : function($event) {
				var that = this;
				//1.修改nowHall所对应的演出厅的编号
				this.nowHall = $($event.target).val();
				//2.修改演出厅的座位
				var hallNum = this.nowHall;
		        this.$http.post('/api/hall/getSeats', {"hallNum" : hallNum})
		          .then((response) => {
					this.seats = response.data.seats;	          	
		        });	
			},
			change : function($event) {  /*作用：改变座位状态，向后台发送请求*/
				var el = $event.target;
				if(el.tagName.toLowerCase() != 'span') {
					return;
				}

				//1.修改座位状态
				if ($(el).css("backgroundColor") == 'rgb(204, 204, 204)') {
					$(el).attr('state', 2);   /*2选定*/
					$(el).css({
						'backgroundColor': 'green'   /*选中状态*/
					});	

				//当前选中的位置添加该位置,计算总价
				var row = $(el).attr('row');
				var col = $(el).attr('column');	

				this.nowChoose.push({
					row : row,
					col : col
				});
				this.countPrice = this.nowChoose.length * this.nowPrice;

				//3.向后台发送请求
				var seatId = $(el).attr('id');
				var seatState = $(el).attr('state');			
				
		        this.$http.post('/api/seat/changeStateById', {"seatId" : seatId, "seatState" : seatState});

				}else if($(el).css("backgroundColor") == 'rgb(0, 128, 0)') { /*当想取消选中某个座位时*/
					$(el).attr('state', 0);

					$(el).css({
						'backgroundColor': '#CCC'   /*可选择状态*/
					});	

					var row = $(el).attr('row');
					var col = $(el).attr('column');	
					var i = 0;
					while(this.nowChoose[i].row != row || this.nowChoose[i].col != col) {
						i++;
					}

					this.nowChoose.splice(i, 1);
					this.countPrice = this.nowChoose.length * this.nowPrice;

					var seatId = $(el).attr('id');
					var seatState = $(el).attr('state');
					
			        this.$http.post('/api/seat/changeStateById', {"seatId" : seatId, "seatState" : seatState});					
				}else if($(el).css("backgroundColor") == 'rgb(255, 0, 0)') {
					
				  var r = confirm("确认退票");
				  if (r == true){
				  	  $(el).attr('state', 0);
					  $(el).css({
						'backgroundColor': '#CCC'   /*恢复可选用状态*/
					  });

					var seatId = $(el).attr('id');
					var seatState = $(el).attr('state');
					
			        this.$http.post('/api/seat/changeStateById', {"seatId" : seatId, "seatState" : seatState});
			        this.countPrice = this.nowChoose.length * this.nowPrice;
				  }				  	
			   }
			   	this.changeColor();					
			},
			submit : function() {
				alert("正在生成电影票，请稍后");	
				var movieName = $('.sidebar-menu').eq(0).find('select').eq(0).find('option:selected').text();
				var schedulTime = $('.sidebar-menu').eq(0).find('select').eq(1).find('option:selected').text();
				var price = this.nowPrice;
				var hallNum = this.nowHall;
				var tickets = [];

				//choosed得到座位信息	
				var baseObj = {
					movieName: movieName,
					schedulTime: schedulTime,
					price: price,
					hallNum: hallNum,
					ticketState: 1,		 /*已售出*/			
				}

				for(var j = 0; j < this.nowChoose.length; j++) {
					baseObj.row = this.nowChoose[j].row;
					baseObj.col = this.nowChoose[j].col;	
					tickets.push(baseObj);
				}

				//提交影票，为一个数组
		        this.$http.post('/api/ticket/add', {"tickets" : tickets})
		          .then((response) => {
					alert("出票成功");
					//this.changeColor();

		        });	
		        this.$router.push('/sellTicket');
			}			
		}
	}
</script>

<style scoped>
.container-fluid {
	background: #F9F9F9;
}
.choose-seat {
	width: 50%;
	height:60.3rem;
	float: left;
	margin-left: 14rem;
	background: #FFF;
	border: 1px solid #DDD;
}
.sidebar-menu {
	width: 30%;
	height:60.3rem;
	float: left;
	border: 1px solid #DDD;
/*	background: #FFF;	*/
}
.sidebar-menu select {
	text-align: center;
}
.seat-tip {
	height:35px;
	line-height:35px;
	text-align:center;
	font-size:14px;
}
.list-ul {
	list-style: none;
}
.list-ul li {
	float: left;
}
.list-ul li span {
	display: inline-block;
	width: 2.3rem;
	height: 2rem;
	margin: 0.2rem;
	background: #ccc;
}
div.seats-container {
	width: 70%;
	margin: 0 auto;
}
div.seats {
	width: 80%;
}
.seat-color span {
	width: 20px;
	height: 20px;
	display: inline-block;
	margin: 1px 15px;
}
.color-order {
	background: #ccc;
}
.color-selled {
	background: red;
}
.color-green {
	background: #6D9617;
}
.sidebar-menu .form-control {
	width: 80%;
	margin: 1rem auto;
}
.side-ul {
	list-style: none;
	text-align: left;
}
button.btn {
	background: #FF8F0C;
	width: 80%;
}
.item {
	margin-right: 2rem;
	color: #999;
	font-size: 1.6rem;
}
 .val {
	margin-left:10px;
	font-size:24px;
	line-height:30px;
	vertical-align:-3px;
	font-family:Arial;
	color:#F80;
}
.side-seats li{
	display: inline-block;
	width: 8rem;
	margin: 1rem 2rem;
	height: 3rem;
	line-height: 3rem;
	text-align: center;
	background: #FFF;
}

</style>


