import React from 'react';

const Register = ({ routeChange }) => {
	return(
	<article className="br5 ba b--black-10 shadow-5 mv4 w-100 w-50-m w-25-1 mw6 center">
		<main className="pa4 black-80">
		  <form className="measure">
		    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
		      <legend className="f4 fw6 ph0 mh0">Create a New Account!</legend>
		      <div className="mv3">
		        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
		        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text"name="enterName"  id="enterName"/>
		      </div>
		      <div className="mv3">
		        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
		        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
		      </div>
		      <div className="mv3">
		        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
		        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
		      </div>
		    </fieldset>
		    <div className="">
		      <input onClick = {() => routeChange('home')} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Create Account"/>
		    </div>
		    <div className="lh-copy mt3">
		    </div>
		  </form>
		</main>
	</article>
		)
}

export default Register;