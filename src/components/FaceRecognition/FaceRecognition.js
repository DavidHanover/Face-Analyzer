import React from 'react';

const FaceRecognition = (p) => {
	return(
		<div className="center">
			<img src={p.imageURL} alt="" width='800px' height='auto'/>
		</div>
		)
}

export default FaceRecognition;