import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Index from '@/components/Index'
import addEmployee from '@/components/addEmployee'
import editEmployee from '@/components/editEmployee'
import addAuditorium from '@/components/addAuditorium'
import auditorium from '@/components/auditorium'
import editAuditorium from '@/components/editAuditorium'
import showSeats from '@/components/showSeats'
import addMovie from '@/components/addMovie'
import Movie from '@/components/Movie'
import editMovie from '@/components/editMovie'
import alreadyOnScreen from '@/components/alreadyOnScreen'
import newProject from '@/components/newProject'
import addProject from '@/components/addProject'
import editProject from '@/components/editProject'
import Count from '@/components/count'
import SellTicket from '@/components/sellTicket'


Vue.use(Router)

export default new Router({
  mode : 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    },  
    {
      path: '/addemployee',
      name: 'addemployee',
      component: addEmployee    	
    },  
    {
	  path: '/editemployee',
	  name : 'editemployee',
	  component: editEmployee
    },
    {
    	path : '/addauditorium',
    	name : 'addAuditorium',
    	component: addAuditorium  
    },  
    {
    	path : '/auditorium',
    	name : 'auditorium',
    	component: auditorium
    },
    {
    	path : '/editAuditorium',
    	name : 'editAuditorium',
    	component: editAuditorium 	
    },   
    {
    	path : '/showSeats',
    	name : 'showSeats',
    	component: showSeats
    }, 
    {
      path : '/addMovie',
      name : 'addMovie',
      component : addMovie
    },  
    {
      path : '/movie',
      name : 'movie',
      component: Movie
    },
    {
      path : '/editmovie',
      name : 'editMovie',
      component: editMovie,
    },
    {
      path : '/alreadyonscreen',
      name : 'alreadyOnScreen',
      component: alreadyOnScreen
    }, 
    {
      path : '/newproject',
      name : 'newProject',
      component: newProject
    },
    {
      path : '/addproject',
      name : 'addProject',
      component: addProject
    }, 
    {
      path : '/editproject',
      name : 'editProject',
      component: editProject
    }, 
    {
      path : '/count',
      name : 'Count',
      component: Count
    },
    {
      path : '/sellticket',
      name : 'sellTicket',
      component : SellTicket
    }                 
  ]
})
