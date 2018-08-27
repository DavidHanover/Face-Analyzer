const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')

const postgres = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'funk10162',
    database : 'face-analyzer'
  }
});

console.log(postgres.select('*').from('users'));

const app = express();
app.use(cors()); 
app.use(bodyParser.json());

const db = {
	users:[
		{
			id: '123',
			name: 'John',
			email:'john@gmail.com',
			password:'cookies',
			entries: 0,
			joined: new Date()
		},
		{
			id: '124',
			name: 'Sally',
			email:'sally@gmail.com',
			password:'bananas',
			entries: 0,
			joined: new Date()
		},

	]
}

app.get('/', (req, res) =>{
	res.send(db.users);
})

app.post('/signin', (req, res) => {
	if( req.body.email === db.users[0].email &&
		req.body.password === db.users[0].password){
		res.json(res.json(db.users[0]));
	} else {
		res.status(400).json('log-in failed!');
	}
})

app.post('/register', (req, res) => {
	const { email, password, name } = req.body;
	db.users.push({
		id: '125',
		name: name,
		email: email,
		entries: 0,
		joined: new Date()
	})
	res.json(db.users[db.users.length - 1]);
})

app.get('/profile/:id', (req, res) => {
	const { id } = req.params;
	let found = false;
	db.users.forEach( u => {
		if (u.id === id){
			found = true;
			return res.json(u);
		}
	})
		if(!found){
			res.status(400).json("No such user!");
		}
})

app.put('/image', (req, res) => {
	const { id } = req.body;
	let found = false;
	db.users.forEach( u => {
		if (u.id === id){
			found = true;
			u.entries++;
			return res.json(u.entries);
		}
	})
		if(!found){
			res.status(400).json("No such user!");
		}
})

const po = 3000;
app.listen(po, () => {
	console.log(`app responded on port ${po}`)
})

/*
planning the API....
/ = this is working?
/signing = POST success/fail
/register = POST new user?
/profile = GET user?
/image = PUT to user
*/