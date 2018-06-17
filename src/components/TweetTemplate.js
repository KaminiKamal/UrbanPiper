import React, { Component } from 'react';
import _ from 'lodash';
import { Input, Card, Icon, Image, Button } from 'semantic-ui-react';
import { GET_TWEET_BY_ID, UPVOTE_TWEET } from '../constants/constants';

class TweetTemplate extends Component{
    constructor(props){
       super(props);
       this.state = {
            response: null,
            upvote: null
       } 
    }

    componentDidMount(){

        const pathname = this.props.location.query.tweet_id;
       // https://api.twitter.com/1.1/statuses/show/335393046625652736.json
        var url = GET_TWEET_BY_ID+pathname+".json";

        fetch(url, { 
            method: 'GET',
            headers: {
              'authorization' : window.localStorage.getItem("Bottr.loginToken"),
              'content-type': 'application/json'
            },
          
          })
          .then(response => response.json())
          .then(data => {
            this.setState({
                response: data,
                upvote: data.user[0].tweet_stat_count
            });
          });
    }
    
    upVoteTweet(e){

        const data = {
          id: this.state.response.user[0].tweet_id,
          tweet_stat_count: this.state.response.user[0].tweet_stat_count+1
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
          let count = this.state.upvote;
          this.setState({upvote: count++});

        }).catch((err) => {console.log("err::", err)})
      }
    

    render(){
        return(
            <div>
             <Card>
              <Card.Content>
                <Image floated='right' size='mini' src={this.state.response.user[0].profile_image_url_https} />
                <Card.Header>{this.state.response.user[0].screen_name}</Card.Header>
                <Card.Meta>{this.state.response.user[0].location}</Card.Meta>
                <Card.Description>
                  {this.state.response.user[0].description}
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <div className='ui two buttons'>
                  <Button  color='twitter' content={this.state.upvote} icon="thumbs up" onClick={this.upVoteTweet.bind(this)} />
                  <Button color='twitter' content="down vote" icon="thumbs down" />
                </div>
              </Card.Content>
            </Card>
            </div>
        )
    }
       
}
export default TweetTemplate;