import React, { Component } from 'react';
import SignIn from './components/SignIn/SignIn';
import Navigation from './components/Navigation/Navigation';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import particlesOptions from './options/particleOptions.js';
import './App.css';



const initialState = {
    input:'',
    imageURL:'',
    box:{},
    route: 'signIn',
    isSignedIn: false,
    user: {
      id: '',
      name: '',
      email:'',
      entries: 0,
      joined: ''
    }
  };


class App extends Component {
constructor(){
  super();
  this.state = {
    input:'',
    imageURL:'',
    box:{},
    route: 'signIn',
    isSignedIn: false,
    user: {
      id: '',
      name: '',
      email:'',
      entries: 0,
      joined: ''
    }
  }
}

loadUser = (u) => {
  this.setState({user: {
        id: u.id,
        name: u.name,
        email:u.email,
        entries: u.entries,
        joined: u.joined
      }})
}

onInputChange = e => this.setState({input: e.target.value});

calculateBox = (data) =>{
  const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
  const urlImage = document.getElementById('inputImage');
  const imgWidth = Number(urlImage.width);
  const imgHeight = Number(urlImage.height);
  return {
    leftCol: clarifaiFace.left_col * imgWidth,
    topRow: clarifaiFace.top_row * imgHeight,
    rightCol: imgWidth - clarifaiFace.right_col * imgWidth,
    bottomRow: imgHeight - clarifaiFace.bottom_row * imgHeight
  }
}

displayFaceBox = (box) => {
  this.setState({ box });
}

onSubmit = (e) => {
  const {input, user} = this.state;
  this.setState({imageURL : input});
  fetch('http://localhost:3000/imageurl', {
      method:'post',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({
        input: input
      })
    })
  .then(response => response.json())
  .then((response) => {
    if(response){
      fetch('http://localhost:3000/image', {
      method:'put',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({
        id: user.id
      })
    })
      .then(response => response.json())
      .then(count => {
        this.setState(Object.assign(user, {entries: count}))
      })
      .catch(err => console.log);
    }this.displayFaceBox(this.calculateBox(response))})
  .catch(err => console.log);
}

routeChange = (route) => {
  if (route === 'home'){
    this.setState({isSignedIn : true})
  } else {
    this.setState(initialState)
  }
  this.setState({route : route})
}

render() {
  const { isSignedIn, imageURL, route, box } = this.state;
  return (      
    <div className="App">
    <Particles className='particles' params={particlesOptions}/>
     <Navigation routeChange = {this.routeChange} isSignedIn = {isSignedIn}/>
      { route === 'signIn'
        ? <SignIn routeChange = {this.routeChange} loadUser = {this.loadUser}/> 
        : route === 'home'
        ? <div>
            <Logo/>
            <Rank name={this.state.user.name} entries={this.state.user.entries}/>
            <ImageLinkForm onInputChange={this.onInputChange} onSubmit = {this.onSubmit}/>
            <FaceRecognition box = {box} imageURL = {imageURL}/>
          </div>
         : route === 'register'
         ? <Register routeChange = {this.routeChange} loadUser = {this.loadUser}/>
         : <div>Wow, this is broken.</div>           
        }    
      </div>
      );
  }
}
export default App;