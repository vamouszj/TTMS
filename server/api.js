const models = require('./db');
const express = require('express');
const router = express.Router();
var fs = require('fs');
var formidable = require('formidable');

/*登录检查*/
router.post('/api/login/getUser', (req, res) => {
	models.Login.findOne({
		userid : req.body.userid,
		password : req.body.password
	}).then((employeeInfo)=>{	
		var obj = {};
		if(employeeInfo) {
			console.log("用户存在...");
			obj.flag = employeeInfo.isSeller ? true : false;
			res.send(obj);
		}else {
			console.log("用户不存在....");
			res.send({
				error : "error" 
			});
		}
	});
});
/*得到所有的员工信息*/
router.get('/api/employees/getAll', (req, res) => {
	models.Employees.find((err, data) => {
		if(err) {
			console.log("读取全部员工出错");
		} else {
			res.send({
				persons: data
			});
		} 
	});
});
/*添加一个用户*/
router.post('/api/employees/add', (req, res) => {
	var obj = {
	    workId : req.body.workId,  /*员工号*/
	    workName : req.body.workName,  /*姓名*/
	    worker : req.body.worker, /*职位*/
	    personId :  req.body.personId,  /*身份证号*/
	    phoneNumber: req.body.phoneNumber /*电话号码*/		
	};

	new models.Employees({
	    workId : req.body.workId,  /*员工号*/
	    workName : req.body.workName,  /*姓名*/
	    worker : req.body.worker, /*职位*/
	    personId :  req.body.personId,  /*身份证号*/
	    phoneNumber: req.body.phoneNumber /*电话号码*/
    }).save((err, data) => {
		if(err) {
			res.send({error : 'error'});
		} else {
			res.send('createAccount successed');
		}    	
    });
});

/*删除一个用户*/ 
router.post('/api/employees/del', (req, res) => {
	models.Employees.remove({
		workId : req.body.workId
	}).then(() => {
		res.send({flag: '删除成功'});
	});
});

/*得到一个用户信息*/
router.post('/api/employees/get', (req, res) => {	
	models.Employees.findOne({
		workId : req.body.workId
	}).then((employeeInfo)=>{	
		if(employeeInfo) {
			res.send({
				person : employeeInfo
			});
		}else {
			res.send({
				error : "error" 
			});
		}
	});
});
/*修改一个用户的信息*/
router.post('/api/employees/update', (req, res) => {
    models.Employees.update({
        workId : req.body.workId
    }, {
	    workId : req.body.workId,  /*员工号*/
	    workName : req.body.workName,  /*姓名*/
	    worker : req.body.worker, /*职位*/
	    personId :  req.body.personId,  /*身份证号*/
	    phoneNumber: req.body.phoneNumber /*电话号码*/
    }).then(function() {
        res.send("successs");
    });
});
/************************************/

/*添加影厅*/
router.post('/api/hall/add', (req, res) => {
	new models.Halls({
		hallNum : req.body.hallNum,
		seatCount : req.body.seatCount,
		hallState : req.body.hallState,
		hallType : req.body.hallType
    }).save((err, data) => {
		if(err) {
			res.send({error : 'error'});
		} else {
			res.send('createAccount successed');
		}    	
    });
});
/*读取全部的影厅信息*/
router.get('/api/hall/getAll', (req, res) => {
	models.Halls.find((err, data) => {
		if(err) {
			console.log("读取全部影厅出错");
		} else {
			res.send({
				halls : data
			});
		} 
	});
});
/*得到一个影厅信息*/
router.post('/api/hall/get', (req, res) => {	
	models.Halls.findOne({
		hallNum : req.body.hallNum
	}).then((info)=>{	
		if(info) {
			res.send({
				auditorium : info
			});
		}else {
			res.send({
				error : "error" 
			});
		}
	});
});
/*修改一个影厅的信息*/
router.post('/api/hall/update', (req, res) => {
    models.Halls.update({
        hallNum : req.body.hallNum
    }, {
		hallNum : req.body.hallNum,
		seatCount : req.body.seatCount,
		hallState : req.body.hallState,
		hallType : req.body.hallType
    }).then(function() {
        res.send("successs");
    });
});
/*得到所有的影厅编号*/
router.post('/api/hall/getNums', (req, res) => {
	models.Halls.find((err, data) => {
		if(err) {
			console.log("读取影厅出错");
		} else {
			var hallNums = [];
			for(let i = 0, len = data.length; i < len; i++) {
				hallNums.push(data[i].hallNum);
			}
			res.send({
				hallIndex : hallNums
			});
		} 
	});
});
/*根据给定的影厅的编号给出相关的座位*/
router.post('/api/hall/getSeats', (req, res) => {

/*	用于向座位表中增加数据的代码
	var num = 1421;
	for(var i = 1; i <= 8; i++) {
		for(var j = 1; j <= 15; j++) {
			new models.Seats({
				seatId : num++,
				seatState : 0,
				hallNum : 5,
				row : i,
				column : j 
		    }).save();			
		}
	}*/

	var hallNum = req.body.hallNum;
	console.log(hallNum);
	models.Seats.find({"hallNum" : hallNum}, (err, data) => {
		res.send({
			seats : data
		})
	});
});

/*修改一个影厅每个座位的信息*/
router.post('/api/hall/setSeats', (req, res) => {
	var hallNum = req.body.hallNum;
	var seats = req.body.seats;
	models.Seats.find({"hallNum" : hallNum}, (err, data) => {
		for(var i = 0, len = data.length; i < len; i++) {
			var seat = seats[i];

			models.Seats.update({
		        seatId : seat.seatId
		    }, {
		    	seatState : seat.seatState
		    }).then(function() {
		        res.send("successs");
		    });
		}
	});
});

/*根据seatId修改对应的座位的状态*/
router.post('/api/seat/changeStateById', (req, res) => {
	var seatId = req.body.seatId;
	var seatState = req.body.seatState;
	models.Seats.update({
        seatId : seatId
    }, {
    	seatState : seatState
    }).then(function() {
        res.send("successs");
    });
});

/************************************/

/*添加电影*/
router.post('/api/movie/add', (req, res) => {
	var obj ={};
    var form = new formidable.IncomingForm({
        encoding:"utf-8",
        uploadDir:"../dist/resource",  //文件上传地址
        keepExtensions:true  //保留后缀
    });
    form.parse(req)
        .on('field', function(name, value) {  // 字段
            obj[name] = value;
        })
        .on('file', function(name, file) {  //文件
            obj[name] = file;
        })
        .on('error', function(error) {  //结束
            //callback(error);
        })
        .on('end', function() {  //结束
            //callback(null,obj);
                //./static/littleStory.jpg
             obj.path = obj.path.path.substring(1).split('\\').join('/').split('./dist/')[1];
             obj.state = 0;

			 new models.Movies(obj).save((err, data) => {
				if(err) {
					res.send({error : 'error'});
				} else {
					res.send('addMovie successed');
				}    	
		     });             
        });
});
/*得到所有的电影*/
router.get('/api/movie/getAll', (req, res) => {
	models.Movies.find((err, data) => {
		if(err) {
			console.log("读取全部影厅出错");
		} else {
			res.send({
				movies : data
			});
		} 
	});
});
/*根据电影名称查询电影*/
router.post('/api/movie/get', (req, res) => {	
    models.Halls.update({
        hallNum : req.body.hallNum
    }, {
		hallNum : req.body.hallNum,
		seatCount : req.body.seatCount,
		hallState : req.body.hallState,
		hallType : req.body.hallType
    }).then(function() {
        res.send("successs");
    });

	models.Movies.findOne({
		movieName : req.body.movieName
	}).then((info)=>{	
		if(info) {
			res.send({
				movie : info
			});
		}else {
			res.send({
				error : "error" 
			});
		}
	});
});

/*修改一个电影的信息*/
router.post('/api/movie/update', (req, res) => {
	var obj ={};
    var form = new formidable.IncomingForm({
        encoding:"utf-8",
        uploadDir:"../static/",  //文件上传地址
        keepExtensions:true  //保留后缀
    });
    form.parse(req)
        .on('field', function(name, value) {  // 字段
            obj[name] = value;
        })
        .on('file', function(name, file) {  //文件
            obj[name] = file;
        })
        .on('error', function(error) {  //结束
            //callback(error);
        })
        .on('end', function() {  //结束
            //callback(null,obj);
                //./static/littleStory.jpg
             if(obj.path.indexOf('\\') != -1) {
              obj.path = obj.path.path.substring(1).split('\\').join('/');	
             }
            
             console.log(obj);

			 models.Movies.update({
        		movieName : obj.movieName
    		 }, obj).then(function() {
        		res.send("successs");
    		});             
        });

});
/*得到所有未放映影片的信息*/
router.post('/api/movie/getSome', (req, res) => {	
	models.Movies.find({"state" : 0}, (err, data) => {
		res.send({
			movies : data
		})
	});
});



/************************************/

/*添加放映计划*/
router.post('/api/project/add', (req, res) => {
	new models.Project({
		projectId : req.body.projectId,
		movieName : req.body.movieName,
		scheduleTime : req.body.scheduleTime,
		hallNum : req.body.hallNum
    }).save((err, data) => {
		if(err) {
			res.send({error : 'error'});
		} else {
			res.send('createProject successed');
		}    	
    });
});
/*得到所有的演出计划*/
router.get('/api/project/getAll', (req, res) => {
	 models.Project.find((err, data) => {
		if(err) {
			console.log("读取全部演出计划出错");
		} else {
			res.send({
				projects : data
			});
		} 
	});
});

/*得到一个演出计划信息*/
router.post('/api/project/get', (req, res) => {	
	models.Project.findOne({
		projectId : req.body.projectId
	}).then((info)=>{	
		if(info) {
			res.send({
				project : info
			});
		}else {
			res.send({
				error : "error" 
			});
		}
	});
});

/*修改一个演出计划*/
router.post('/api/project/update', (req, res) => {
    models.Project.update({
        projectId : req.body.projectId
    }, {
		projectId : req.body.projectId,
		movieName : req.body.movieName,
		scheduleTime : req.body.scheduleTime,
		hallNum : req.body.hallNum
    }).then(function() {
        res.send("successs");
    });
});
/*得到一个电影的放映计划*/
router.post('/api/project/getByName', (req, res) => {
	models.Project.find({"movieName" : req.body.movieName}, (err, data) => {
		res.send({
			projects : data
		})
	});
});


/************************************/
/*增加电影票*/
router.post('/api/ticket/add', (req, res) => {
	var tickets = req.body.tickets;
	for(var i = 0; i < tickets.length; i++) {
		var ticket = tickets[i];
		new models.Ticket(ticket).save();		
	}
});

/***********************************/
/*得到销售量*/
router.post('/api/count/get', (req, res) => {
	models.Count.find((err, data) => {
		res.send({
			counts : data
		})
	});
});


module.exports = router;