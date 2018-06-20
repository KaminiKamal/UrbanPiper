import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import {Card, Button, Image, Label, Icon} from 'semantic-ui-react';
// import { Link } from 'react-router';

class TwitterTemplate extends Component {

    constructor(props){
        super(props);
        this.state = {
            feed_id: null,
            feed_description: null,
            profile_image_url: null,
            feed_title: null,
            feed_disikes: 0,
            feed_likes: 0
        }
    }

    componentDidMount(){
        const endpoint = this.props.routeParams.uid
        fetch("http://localhost:3000/twitter/"+endpoint,{
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            },
            //body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then((result) => {console.log("result", result);
        let tweet = result.response;
        this.setState({
            feed_id: tweet.feed_id,
            id: tweet._id,
            feed_description: tweet.feed_description,
            profile_image_url: tweet.profile_image_url,
            feed_title: tweet.feed_title,
            feed_dislikes: tweet.disikes,
            feed_likes: tweet.likes
        });
        })
        .catch((err) => {console.log("err", err)})

       
    }

    upVoteTweet(e){console.log("feed_id", this.state.id)
        var data = {
    
            likes: 'yes',
            dislikes: 'no',
            feed_id: this.state.id
                
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
            this.setState({feed_likes: result.response.likes})
        })
        .catch((err) => {console.log("err", err)})
        //updateTwitterFeed

    }

    downVoteTweet(e){console.log("feed_id", this.state.id)
        var data = {
    
            likes: 'no',
            dislikes: 'yes',
            feed_id: this.state.id
                
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
            this.setState({feed_dislikes: result.response.dislikes})
        })
        .catch((err) => {console.log("err", err)})
        //updateTwitterFeed

    }

    render(){console.log("this.props::", this.props);
        return(
            <div>
                <Card>
                    <Card.Content>
                        <Image floated='right' size='mini' 
                         src={this.state.profile_image_url}
                         />
                        <Card.Header>
                            {this.state.feed_title}
                            {/* <Link to="/twitter">{this.props.tweet.text.substring(0, 20)}... </Link> */}
                            <Label>
                                <Icon name='eye' /> 1
                            </Label>
                        </Card.Header>
                        
                        <Card.Description>
                           {this.state.feed_description}
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <div className='ui two buttons'>
                        <Button  color='twitter' 
                        content={this.state.feed_likes}
                        icon="thumbs up" 
                        onClick={this.upVoteTweet.bind(this)} 
                        />
                        
                        <Button  color='twitter' 
                        content={this.state.feed_dislikes}
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

export default TwitterTemplate;
