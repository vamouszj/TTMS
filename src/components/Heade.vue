<template>
	<nav class="navbar navbar-default">
  <div class="container-fluid">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="#">美佳影院</a>
    </div>

    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav">
<!--         <li class="active"><a href="#">Link <span class="sr-only">(current)</span></a></li>
        <li><a href="#">Link</a></li> -->
        <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">员工管理 <span class="caret"></span></a>
          <ul class="dropdown-menu">
            <li><router-link to="/addemployee">增加员工</router-link></li>
            <li><router-link to="/index">员工列表</router-link></li>
          </ul>
        </li>

        <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">影厅管理 <span class="caret"></span></a>
          <ul class="dropdown-menu">
            <li><router-link to="/auditorium">影厅列表</router-link></li>
            <li><router-link to="/showSeats">座位管理</router-link></li>
          </ul>
        </li>

        <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">放映安排 <span class="caret"></span></a>
          <ul class="dropdown-menu">
            <li><router-link to="/newproject">最新放映安排</router-link></li>
            <!-- <li><router-link to="/oldproject">往期放映安排</router-link></li> -->
          </ul>
        </li>

        <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">影片管理 <span class="caret"></span></a>
          <ul class="dropdown-menu">
            <li><router-link to="/movie">待放映影片</router-link></li>
            <li><router-link to="/alreadyonscreen">已放映影片</router-link></li>
          </ul>
        </li>
        <li><router-link to="/count">统计</router-link></li>
      </ul>
<!--       <form class="navbar-form navbar-left">
        <div class="form-group">
          <input type="text" class="form-control" placeholder="Search">
        </div>
        <button type="submit" class="btn btn-default">Submit</button>
      </form> -->
      <ul class="nav navbar-nav navbar-right">
        <li><a href="#" id="userCount">{{userName}}</a></li>
        <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">选项 <span class="caret"></span></a>
          <ul class="dropdown-menu">
            <li><router-link to="/">切换用户</router-link></li>
          </ul>
        </li>
      </ul>
    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
</nav>
</template>

<script>
	export default {
		name: 'Heade',
    data() {
      return {
        userName : ''
      }
    },
    mounted() {
      this.checkIfUserId();
    },
    methods : {
      checkIfUserId() {
        if(window.sessionStorage.userid) {
          this.userName = window.sessionStorage.userid;
        }else {
          this.$router.push('/');
        }
      }
    }
	}
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>

