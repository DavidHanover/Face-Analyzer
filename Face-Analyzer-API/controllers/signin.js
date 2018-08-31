const handleSignin = (req, res, bcrypt, db) => {
	const { email, password } = req.body;
	if(!email||!password){
		return res.status(400).json("ERROR: User Details Incomplete!")
	}
	db.select('email', 'hash').from('login')
	.where('email', '=', email)
	.then(data => {
		const isValid = bcrypt.compareSync(password, data[0].hash)
		if(isValid){
			return db.select('*').from('users')
			.where('email', '=', email)
			.then(user => {
				res.json(user[0]);
			})
			.catch(err => res.status(400).json('ERROR: Unable to Get User!'))
		} else {
			res.status(400).json('ERROR: Credentials Incorrect!')
		}
	})
	.catch(err => res.status(400).json('ERROR: Credentials Incorrect!'))
}

module.exports = {
	handleSignin: handleSignin
}