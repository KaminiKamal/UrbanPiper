import React, { Component } from 'react';
import _ from 'lodash';
import { Link } from 'react-router';
import { Input, Card, Icon, Image, Button } from 'semantic-ui-react';
import { GET_FEED_LIST,  UPVOTE_TWEET} from "../constants/constants.js";

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      response: [],
      SCREEN_NAME:'',
      FEED_ID: '',
     // GET_SPECIFIC_FEED_ITEM = "https://twitter.com/+`${this.state.SCREEN_NAME}`+/status/1007095239683837952"
    }
  }

  upVoteTweet(e, element){
    const data = {
      id: element.user[0].tweet_id,
      tweet_stat_count: element.user[0].tweet_stat_count+1
    };
    
    fetch(UPVOTE_TWEET, { 
      method: 'POST',
      headers: {
        'authorization' : window.localStorage.getItem("Bottr.loginToken"),
        'content-type': 'application/json'
      },
    
      //'Content-Type': 'application/json',
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Here is the data: ', data);
        var arr = this.state.response;
       _.map(
        this.state.response
     , (el, i) => {
      
          if(el.user[0].tweet_id === element.user[0].tweet_id){
            arr.splice(i, 1, el);
            
          }
      
     });
     this.setState({response: arr});

      
    }).catch((err) => {console.log("err::", err)})
  }
  pagination(){
    fetch("http://localhost:3000/twitterPagination",{
            method: 'GET',
            headers: {
              'content-type': 'application/json'
            }
          })
          .then((data) => {
            this.setState({response: data})
          })
          .catch((err) => {
            console.log("err::", err)
          })
  }
  componentDidMount(){

    const url = GET_FEED_LIST+"?user_id="+localStorage.getItem("user_id");

    fetch(url, { 
      method: 'GET',
      headers: {
        'authorization' : window.localStorage.getItem("Bottr.loginToken"),
        'content-type': 'application/json'
      },
    //body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Here is the data: ', data);
     
        fetch("http://localhost:3000/setAllTwitterList",{
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then((data) => {
          this.pagination();
        })
        .catch((err) => {
          console.log("err::", err);
        })
        //console.log("state set", this.state.response);
      })
      
    .catch((err) => {console.log("err::", err)})
  }

  render() {
    console.log("rendering the number of likes")
    
    return (
      <div>
        <Card.Group>

        {
          _.map(this.state.response, (element, index) => {
            return (  <Card>
              <Card.Content>
                <Image floated='right' size='mini' src={element.user[0].profile_image_url_https} />
                <Card.Header><Link to="/twitter/`${element.user[0].screen_name}/status/`${element.user[0].tweet_id}">{element.user[0].screen_name}`"></Link></Card.Header>
                <Card.Meta>{element.user[0].location}</Card.Meta>
                <Card.Description>
                  {element.user[0].description}
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <div className='ui two buttons'>
                  <Button  color='twitter' content={element.user[0].tweet_stat_count} icon="thumbs up" onClick={this.upVoteTweet.bind(this, element)} />
                  <Button color='twitter' content="down vote" icon="thumbs down" />
                </div>
              </Card.Content>
            </Card>)
          })
        }

        </Card.Group>
        <Button content="Load More" onClick={this.pagination.bind(this)}/>
      </div>
    );
  }
}

export default App;
