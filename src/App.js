import React from 'react';
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import './App.css';
import Particles from 'react-particles-js';

const app = new Clarifai.App({
  apiKey: '5a46560a07fc4fb287f0d2d814142a3a'
 });

const particlesOptions = {
  particles: {
    number:{
      value: 200,
      density: {
        enable: true,
        value_area: 800
      }
    }
  },
  interactivity:{
    detect_on: 'window',
    events:{
      onhover:{
        enable: true,
        mode: 'repulse'
      },
      onclick: {
        enable: true,
        mode:'bubble'
      },
      resize: true
    }
  },
  modes:{
    grab:{
      distance:400,
      line_linked:{
        opacity:1
      }
    },
    bubble:{
      distance:300,
      size:40,
      duration: 2,
      opacity:4,
      speed:3
    },
    repulse:{
      distance:10,
      duration: 0.2
    },
    push:{
      particles_nb:4
    },
    remove:{
      particles_nb:2
    }
  }
}          

  
class App extends React.Component  {

  constructor() {
    super() ;
     this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false
    }
  }

  calculeFaceLocation = (data) =>{
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return{
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    console.log(box)
    this.setState({box: box});
  }

  onInputChange = (event) =>{ 
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () =>{
    this.setState({imageUrl : this.state.input});
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
      .then( response => this.displayFaceBox(this.calculeFaceLocation(response)))
        // console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
        // do something with response
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route ==='signout'){
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render(){ 
    return (
      <div className="App"> 
        <Particles className='particles'
        params= {particlesOptions} />
        
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>  
       { this.state.route === 'home'
        ? <div>
            <Logo />
            <Rank />
            <ImageLinkForm 
              onInputChange={this.onInputChange} 
              onButtonSubmit={this.onButtonSubmit}
            /> 
            <FaceRecognition box={this.state.box}  imageUrl={this.state.imageUrl}/>
          </div>
        : (
          this.state.route === 'signin'
          ?<Signin onRouteChange={this.onRouteChange}/> 
          :<Register onRouteChange={this.onRouteChange}/> 
          )
        }
      </div>
    );
  }
}

export default App;
