import React, { Component } from 'react';
import Clarifai from 'clarifai';
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

const app = new Clarifai.App({
  apiKey: 'f64c6cb8448a431588ff2321664f755c'
});


class App extends Component {
constructor(){
  super();
  this.state = {
    input:'',
    imageURL:'',
    box:{},
    route: 'signIn',
    isSignedIn: false
  }
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
  const input = this.state.input;
  this.setState({imageURL : input});
  app.models.predict(Clarifai.FACE_DETECT_MODEL, input)
  .then(response => this.displayFaceBox(this.calculateBox(response)))
  .catch(err => console.log);
}

routeChange = (route) => {
  this.setState({route: route});
  route === 'home' 
  ? this.setState({isSignedIn : true})
  : this.setState({isSignedIn : false});
}

render() {
  const { isSignedIn, imageURL, route, box } = this.state;
  return (      
    <div className="App">
    <Particles className='particles' params={particlesOptions}/>
     <Navigation routeChange = {this.routeChange} isSignedIn = {isSignedIn}/>
      { route === 'signIn'
        ? <SignIn routeChange = {this.routeChange}/> 
        : route === 'home'
        ? <div>
            <Logo/>
            <Rank />
            <ImageLinkForm onInputChange={this.onInputChange} onSubmit = {this.onSubmit}/>
            <FaceRecognition box = {box} imageURL = {imageURL}/>
          </div>
         : route === 'register'
         ? <Register/>
         : <div>Wow, this is broken.</div>           
        }    
      </div>
      );
  }
}
export default App;