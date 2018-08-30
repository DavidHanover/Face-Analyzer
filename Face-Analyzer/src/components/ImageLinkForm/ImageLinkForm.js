import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onSubmit}) => {
	return(
		<div>
			<p className="f3">
			<b>{'This Artificial Intelligence app detects faces in your photos!'}</b>
			</p>
			<div className="center">
				<div className='form center pa4 br3 shadow-5'>
					<input type="text" className='f4 pa2 w-70 center' 
					onChange = {onInputChange}/>
					<button className='center w-30 grow f5 link ph3 pv2 dib white bg-navy' 
					onClick = {onSubmit}>
						<div className="center">
							Detect
						</div>
					</button>
				</div>
			</div>
		</div>
		)
}

export default ImageLinkForm;