import React, {Component} from 'react';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';
import './App.css';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';


// You need to add your own API key here from Clarifai.
const app = new Clarifai.App({
  //apiKey: "b3aef77b71f6459194e7c52bb7abd863",
  apiKey: "5cd48bf71a4d4153b230e2e4847722eb",
});


const particlesOptions =
  {"particles": {
      "number": {
          "value": 300
      },
      "size": {
          "value": 3
      }
  },
  "interactivity": {
      "events": {
          "onhover": {
              "enable": true,
              "mode": "repulse"
          }
      }
  }
}

const initialState = {
  input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user:{
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
}

class App extends Component{

  componentDidMount(){
    fetch('http://localhost:3000/')
      .then(response => response.json())
      .then(console.log)
  }

  constructor(){
    super();
    this.state = initialState;
  }

  loadUser = (data) =>{
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,

      entries: data.entries,
      joined: data.joined
    }})
  }

  onInputChange = (event) =>{
    this.setState({input: event.target.value});
  }

  calculateFaceLocation = (data) =>{
    console.log('image processing triggered');
    console.log(data);
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  }

  displayFaceBox =(box) =>{
    //console.log(box);
    this.setState({box: box});
  }


  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    fetch('https://fierce-hamlet-17597.herokuapp.com/imageurl', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                input: this.state.input
            })
        })
      .then(response => response.json())
      .then(response => {
        console.log(response)
        if (response){
          fetch('https://fierce-hamlet-17597.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: this.state.user.id
            })
        })
        .then (response=> response.json())
        .then (count => 
         {this.setState(Object.assign(this.state.user,{entries:count}))
        })
      }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })  
      .catch(err => console.log(err));
  }

  onRouteChange = (route) =>{    
    if (route === 'signout'){
      this.setState(initialState)
    }else if (route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route}); 

  }
  
  
  render(){

    const {imageUrl, isSignedIn, box, route} = this.state;
    return (
      <div className="App">
        <Particles className = 'particles'
      params={particlesOptions} />
        <Navigation onRouteChange = {this.onRouteChange} isSignedIn = {isSignedIn}/>
        {route === 'home' 
        ? <div>
        <Logo/>
        <Rank name={this.state.user.name} entries={this.state.user.entries}/>
        <ImageLinkForm 
          onInputChange = {this.onInputChange} 
          onButtonSubmit = {this.onButtonSubmit}/>
        <FaceRecognition 
          box={box} 
          imageUrl = {imageUrl}/>
      </div>
      
      :(route === 'signin' ?
        <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        : 
        <Register loadUser = {this.loadUser} onRouteChange = {this.onRouteChange}/>
      ) 


        
        
      }
      </div>
  
      
    );
  }  

}


export default App;


