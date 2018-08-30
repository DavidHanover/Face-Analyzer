const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '',
    database : 'face-analyzer'
  }
});

db.select('*').from('users').then(data => {
console.log(data);
});

const app = express();
app.use(cors()); 
app.use(bodyParser.json());

app.get('/', (req, res) =>{
	return db.select('*').from('users')
	.then( u => res.json(u));
})

app.post('/signin', (req, res) => {
	db.select('email', 'hash').from('login')
	.where('email', '=', req.body.email)
	.then(data => {
		const isValid = bcrypt.compareSync(req.body.password, data[0].hash)
		if(isValid){
			return db.select('*').from('users')
			.where('email', '=', req.body.email)
			.then(user => {
				res.json(user[0]);
			})
			.catch(err => res.status(400).json('ERROR: Unable to Get User!'))
		} else {
			res.status(400).json('ERROR: Credentials Incorrect!')
		}
	})
	.catch(err => res.status(400).json('ERROR: Credentials Incorrect!'))
})

app.post('/register', (req, res) => {
	const { email, password, name } = req.body;
	const hash = bcrypt.hashSync(password);
	db.transaction(trx => {
		trx.insert({
			hash: hash,
			email: email
		})
		.into('login')
		.returning('email')
		.then(loginEmail => {
			return trx('users')
			.returning('*')
			.insert({
				email: loginEmail[0],
				name: name,
				joined: new Date()
			}).then(user => {
				res.json(user[0]);
			})

		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
	.catch(err => res.status(400).json('ERROR: Unable to register!'))
})

app.get('/profile/:id', (req, res) => {
	const { id } = req.params;
	db.select('*').from('users').where({id}).then(user => {
		if(user.length){
				res.json(user[0]);
			} else {
				res.status(400).json('ERROR: No User Found!')
			}
	}).catch(err => res.status(400).json('Error getting user!'))
})

app.put('/image', (req, res) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {res.json(entries[0]);
	})
	.catch(err => res.status(400).json('ERROR: Failed To Count Entry!'))
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