const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

const db = mongoose.connection;
db.once('error', () => console.log('Mongo connection error'));
db.once('open', () => console.log('Mongo connection successed'));

/*定义模式*/
const loginSchema = mongoose.Schema({
    userid : String,
    password : String,
    isSeller : {
        type : Boolean,
        default : false
    }
});

const employeeSchema = mongoose.Schema({
    workId : String,  /*员工号*/
    workName : String,  /*姓名*/
    worker : String,	/*职位*/
    personId : String,  /*身份证号*/
    phoneNumber : String /*电话号码*/
});


const hallSchema = mongoose.Schema({
	hallNum : String,
	seatCount : String,
	hallState : String,
	hallType : String
});

const seatsSchema = mongoose.Schema({
	seatId : String,
	seatState : String,
	hallNum : String,
	row : String,
	column : String 	
});

const movieSchema = mongoose.Schema({
	movieName : String,
	movieType : String,
	movieSummary : String,
	movieDirector: String,
	movieActor:  String,
	movieLong : String,
	movieLanguage : String,
	price : String,
	path : String,
	state : String	
});

const projectSchema = mongoose.Schema({
	projectId : String,
	movieName : String,
	scheduleTime : String,
	hallNum : String
});

const ticketSchema = mongoose.Schema({
	movieName: String,
	schedulTime: String,
	price: String,
	hallNum: String,
	ticketState : String,
	row : String,
	col : String
});

const countSchema = mongoose.Schema({
	number : String
});



const Moedls = {
	Login: mongoose.model('Login', loginSchema),
	Employees : mongoose.model('Employees', employeeSchema),
	Halls : mongoose.model('Halls', hallSchema),
	Seats : mongoose.model('Seats', seatsSchema),
	Movies : mongoose.model('Movies', movieSchema),
	Project : mongoose.model('Project', projectSchema),	
	Ticket : mongoose.model('Ticket', ticketSchema),
	Count : mongoose.model('Count', countSchema),
}

module.exports = Moedls;


