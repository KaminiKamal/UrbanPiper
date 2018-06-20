import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
import TwitterFeed from "./TwitterFeed";
import _ from 'lodash';
import firebase from 'firebase';
import {GLOBAL_CONFIG, GET_TWITTER_FEEDS} from "../constants/constants";
import { Button, Header, Card, Icon, Image } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

const config = {
  apiKey: "AIzaSyCWhKWfA1VeJxBV85tufrl8TVG9G9e_8oM",
  authDomain: "bottr-e76c1.firebaseapp.com",
  databaseURL: "https://bottr-e76c1.firebaseio.com",
  projectId: "bottr-e76c1",
  storageBucket: "bottr-e76c1.appspot.com",
  messagingSenderId: "788410949261"
};
firebase.initializeApp(config);

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      response: [],
      upper_limit: 5,
      lower_limit: 0
    }
  }

  componentDidMount(){
   
    
  }

  loadMore(e){
    if(this.state.upper_limit === 20){
      alert("that's all you have")
    }
    let count = this.state.upper_limit+5
    this.setState({upper_limit: count})
  }

  authenticate(e){
    let provider =  new firebase.auth.TwitterAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
     localStorage.setItem("uid", result.user.uid);
      console.log("twitter auth", result);
       var data = {
        displayName: result.user.displayName,
        uid: result.user.uid,
        email: result.user.email,
        photoURL: result.user.photoURL,
        providerId: result.credential.accessToken,
        phoneNumber: result.user.phoneNumber
      }

    //   var data = {
    //     displayName
    //           :
    //     "kamthtralll",
    //     email
    //     :
    //     "nsimiiwimport { Louter';hf@castiko.com",
    //     phoneNumber
    //     :
    //     null,
    //     photoURL
    //     :
    //     "https://absdlwed.twimg.com/sticky/default_profile_images/default_profile_normal.png",
    //     accessToken
    //     :
    //     "8285194587465605db12-jiuyiuy2Eh05mDHyl91tuRP0SynR9VUfo4Gl",
    //     uid
    //     :
    //     "1ZSZ2k64Stcu4640afdbPewfolBxFDt1y2",
    //   }
      
    //   console.log("autenticated/", data)
    //  // const url = "https://kaminimcq.herokuapp.clocalStorage.setItem("uid", result.user.uid);om/login"
    //   const url = "http://localhost:3000/login"
    //   const endpoint = "https://kaminimcq.herokuapp.com/";
      if(result.user.uid !== null){console.log("111");
    
        fetch("http://localhost:3000/login",{
          method: 'POST',
          header: {
            'content-type': 'application/json'
          },
          body: data
        })
        .then((res) => res.json())
        .then((res) => {console.log("response::", res);
        const endpoint = GLOBAL_CONFIG+GET_TWITTER_FEEDS;
        // fetch(url+"")
        // .then((res) => {console.log("twitter feeds", res)})
        // .catch((err) => {console.log("err", err)})
        fetch(endpoint).then((response) => {
          //console.log(response);
          response.json().then((data) => {
              console.log(data.response);
              this.setState({response: data.response});
              console.log("this.state:", this.state);
          });
      });
        })
        .catch((err) => {console.log("err: ", err)})
     }

    }).catch(function(error) {console.log("err::", error)
      // Handle Errors here.
      var errorCode = error.code;
    //  var errorMessage =return (<TwitterFeed tweet={tweet} key={key} />) error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }

  render() {
    let auth = null;
    if(this.state.response.length===0){
          auth = <div>
            <Card>
            <Image src='/assets/images/twitter.jpg' />
            <Card.Content>
            <Card.Header>Twitter</Card.Header>
            <Card.Meta>Founded in: 21 March 2006, San Francisco, California, United States</Card.Meta>
            <Card.Description>Twitter is an online news and social networking service on which users post and interact with messages known as "tweets".</Card.Description>
            </Card.Content>
            <Card.Content extra>
            <a>
            <Icon name='user' />
            Follow People
            </a>
            </Card.Content>
            </Card>
            <Header>Authenticate with Twitter</Header>
            <Button color="blue" fluid onClick={this.authenticate.bind(this)}> Login with twitter </Button>
        </div>
          
    }
    return (
      <div className="App">
      
       {auth}
      
         
        
        {
          _.map(this.state.response, (tweet, key) => {
            if(key<this.state.upper_limit){
              return (<TwitterFeed tweet={tweet} key={key} />)
            }
            
          })
        }
        <Button loading onClick={this.loadMore.bind(this)} /> 
      </div>
    );
  }
}

export default App;
