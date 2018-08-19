import React from 'react';

const Navigation = ({ routeChange, isSignedIn }) => {
	return (
		<div>
			{isSignedIn ? (
				<nav style={{display:'flex', justifyContent:'flex-end'}}>
					<p onClick = {() => routeChange('signIn')} className='f3 link dim black underline pa3 pointer'>Sign Out</p>
				</nav>
			) :	(
				<nav style={{display:'flex', justifyContent:'flex-end'}}>
					<p onClick = {() => routeChange('register')} className='f3 link dim black underline pa3 pointer'>Register</p>
					<p onClick = {() => routeChange('signIn')} className='f3 link dim black underline pa3 pointer'>Sign In</p>
				</nav>
			)}
		</div>
	);
}


export default Navigation;