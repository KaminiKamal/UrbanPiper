import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import {Card, Button, Image, Label, Icon} from 'semantic-ui-react';
// import { Link } from 'react-router';

class TwitterFeed extends Component {

    constructor(props){
        super(props);
        this.state = {
            feed_id: '',
            tweet: null,
            dislikes: 0,
            likes: 0
        }
    }

    componentDidMount(){
        var data = null;
        console.log("props", this.props);
        this.setState({tweet : this.props.tweet});
        localStorage.setItem("uid", null)
        var data = {
         //   uid: localStorage.getItem("uid"),
            uid: null,
            created_at: this.props.tweet.created_at,
            user_name: this.props.tweet.user.name,
            feed_id: this.props.tweet.id_str,
            feed_description: this.props.tweet.text,
            feed_title: 'Indian Sport Fan Club',
            profile_image_url: this.props.tweet.user.profile_image_url,
            likes: 0,
            dislikes: 0
        }
        fetch("http://localhost:3000/saveTweets",{
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then((result) => {console.log("result", result);
            this.setState({feed_id: result.response._id})
        })
        .catch((err) => {console.log("err", err)})
    }

    upVoteTweet(e){console.log("feed_id", this.state.feed_id)
        var data = {
    
            likes: 'yes',
            dislikes: 'no',
            feed_id: this.state.feed_id
                
        }
        fetch("http://localhost:3000/updateTwitterFeed",{
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then((result) => {console.log("result", result.response.likes);
            this.setState({likes: result.response.likes})
        })
        .catch((err) => {console.log("err", err)})
        //updateTwitterFeed

    }

    downVoteTweet(e){console.log("feed_id", this.state.feed_id)
        var data = {
    
            likes: 'no',
            dislikes: 'yes',
            feed_id: this.state.feed_id
                
        }
        fetch("http://localhost:3000/updateTwitterFeed",{
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then((result) => {
            console.log("result", result.response.dislikes);
            this.setState({dislikes: result.response.dislikes})
        })
        .catch((err) => {console.log("err", err)})
        //updateTwitterFeed

    }

    render(){console.log("this.props::", this.props.tweet, this.state.tweet);
        return(
            <div>
                <Card>
                    <Card.Content>
                        <Image floated='right' size='mini' src={this.props.tweet.user.profile_image_url} />
                        <Card.Header>
                            Indian Sport Fan
                            {/* <Link to="/twitter">{this.props.tweet.text.substring(0, 20)}... </Link> */}
                            <Label>
                                <Icon name='eye' /> 23
                            </Label>
                        </Card.Header>
                        
                        <Card.Description>
                            {this.props.tweet.text}
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <div className='ui two buttons'>
                        <Button  color='twitter' 
                        content={this.state.likes}
                        icon="thumbs up" 
                        onClick={this.upVoteTweet.bind(this)} 
                        />
                        
                        <Button  color='twitter' 
                        content={this.state.dislikes}
                        icon="thumbs down" 
                        onClick={this.downVoteTweet.bind(this)} 
                        />
                        </div>
                    </Card.Content>
                </Card>
            </div>
        )
    }

}

export default TwitterFeed;
