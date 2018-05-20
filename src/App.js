import React, { Component } from 'react';
import { Input } from 'semantic-ui-react'

class App extends Component {
  render() {
    return (
      <div>
        <Input loading icon='user' placeholder='Search...' />
      </div>
    );
  }
}

export default App;
