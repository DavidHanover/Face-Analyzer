import React, { Component } from 'react';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
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
  }
}

onInputChange = (e) =>{
  console.log(e.target.value);
}

onSubmit = (e) => {
  app.models.predict("a403429f2ddf4b49b307e318f00e528b", "https://samples.clarifai.com/face-det.jpg").then(
    function(response) {
  console.log(response);
      // do something with response
    },
    function(err) {
      // there was an error
    }
  );
}

  render() {
    return (      
      <div className="App">
      <Particles className='particles'
              params={particlesOptions}
            />
      <Navigation/>
      <Logo/>
      <Rank />
      <ImageLinkForm onInputChange={this.onInputChange} onSubmit = {this.onSubmit}/>
      <FaceRecognition/>         
      </div>
    );
  }
}



export default App;
