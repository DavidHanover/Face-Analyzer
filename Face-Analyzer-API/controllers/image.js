const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: 'f64c6cb8448a431588ff2321664f755c'
});

const handleAPICall = (req, res) => {
  app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
  .then(data => res.json(data))
  .catch( err => res.status(400).json('ERROR: API Handling Failed!'))
}

const handleImage = (req, res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {res.json(entries[0]);
	})
	.catch(err => res.status(400).json('ERROR: Failed To Count Entry!'))
}

module.exports = {
	handleImage: handleImage,
	handleAPICall: handleAPICall
}