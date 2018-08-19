import React from 'react';
import Tilt from 'react-tilt';
import AIbrain from './AIbrain.png';
import './Logo.css';

const Logo = () => {
	return(
		<div className='ma4 mt0'>
			<Tilt className="Tilt br1 shadow-2" options={{ max : 55, reverse:true }} style={{ height: 200, width: 200 }} >
			 	<div className="Tilt-inner pa3">
			 		<img src={AIbrain} style = {{paddingTop:'15px'}}alt="Brain Logo"/>
			 	</div>
			</Tilt>			
		</div>
		)
}

export default Logo;