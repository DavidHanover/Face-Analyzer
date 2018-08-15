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
    imageURL:''
  }
}

onInputChange = (e) =>{
  this.setState({input: e.target.value});
}

onSubmit = (e) => {
  this.setState({imageURL: this.state.input});
  app.models.predict(
    Clarifai.FACE_DETECT_MODEL,
    this.state.input
    ).then(
    function(response) {
  console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
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
      <FaceRecognition imageURL = {this.state.imageURL}/>         
      </div>
    );
  }
}



export default App;
