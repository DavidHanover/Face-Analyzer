import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import particlesOptions from './options/particleOptions.js';
import './App.css';



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
  console.log('click');
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
                     {/*       <FaceRecognition/>*/}         
      </div>
    );
  }
}



export default App;
