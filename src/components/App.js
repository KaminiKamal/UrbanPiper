import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
import TwitterFeed from "./TwitterFeed";
import _ from 'lodash';
import firebase from 'firebase';
import {GLOBAL_CONFIG, GET_TWITTER_FEEDS} from "../constants/constants";
import { Button } from 'semantic-ui-react';
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
    // firebase.auth().signInWithPopup(provider).then(function(result) {
     // localStorage.setItem("uid", result.user.uid);
    //   console.log("twitter auth", result);
    //   // var data = {
      //   displayName: result.user.displayName,
      //   uid: result.user.uid,
      //   email: result.user.email,
      //   photoURL: result.user.photoURL,
      //   providerId: result.credential.accessToken,
      //   phoneNumber: result.user.phoneNumber
      // }

      var data = {
        displayName
              :
        "kamthtralll",
        email
        :
        "nsimiiwimport { Louter';hf@castiko.com",
        phoneNumber
        :
        null,
        photoURL
        :
        "https://absdlwed.twimg.com/sticky/default_profile_images/default_profile_normal.png",
        accessToken
        :
        "8285194587465605db12-jiuyiuy2Eh05mDHyl91tuRP0SynR9VUfo4Gl",
        uid
        :
        "1ZSZ2k64Stcu4640afdbPewfolBxFDt1y2",
      }
      
      console.log("autenticated/", data)
     // const url = "https://kaminimcq.herokuapp.clocalStorage.setItem("uid", result.user.uid);om/login"
      const url = "http://localhost:3000/login"
      const endpoint = "https://kaminimcq.herokuapp.com/";
      //if(result.user.uid !== null){console.log("111");
        fetch(endpoint+"login", { 
          method: 'POST',
          headers: {
            //'authorization' : window.localStorage.getItem("Castiko.loginToken"),
            'content-type': 'application/json'
          },
        
          //'Content-Type': 'application/json',
          body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
          console.log('Here is the data: ', data.response._id);
          localStorage.setItem("uid", data.response._id);
          // fetch(endpoint+"getTwitterFeed")
          // .then((res) => {console.log("twitter feeds", res)})
          // .catch((err) => {console.log("err", err)})
        }).catch((err) => {console.log("err::", err)})
        // fetch("http://localhost:3000/login",{
        //   method: 'POST',
        //   header: {
        //     'content-type': 'application/json'
        //   },
        //   body: data
        // })
        // .then((res) => res.json())
        // .then((res) => {console.log("response::", res)})
        // .catch((err) => {console.log("err: ", err)})
  //    }

    // }).catch(function(error) {console.log("err::", error)
    //   // Handle Errors here.
    //   var errorCode = error.code;
    //   var errorMessage =return (<TwitterFeed tweet={tweet} key={key} />) error.message;
    //   // The email of the user's account used.
    //   var email = error.email;
    //   // The firebase.auth.AuthCredential type that was used.
    //   var credential = error.credential;
    //   // ...
    // });
  }

  render() {
    return (
      <div className="App">
        <Button color="blue" fluid onClick={this.authenticate.bind(this)}> Login with twitter </Button>
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
