import React, { Component } from 'react';
import { Input, Card, Icon, Image, Button } from 'semantic-ui-react'

class App extends Component {

  search(e){
    console.log("search:: features")
  }

  render() {
    
    return (
      <div>
        
        <Card>
          <Image src='/assets/images/starwar.jpeg' />
          <Card.Content>
            <Card.Header>Search by Film's title or characters</Card.Header>
            <Card.Meta>Joined in 2016</Card.Meta>
            <Card.Description>
              <Input type="text" placeholder="search here" content="click here" color="blue" /> 
              <Button onClick={this.search.bind(this)}/>
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <a>
            <Icon name='user' />
            10 Friends
            </a>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

export default App;
