// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<App />, document.getElementById('app'));
// registerServiceWorker();
/* eslint-disable import/default */

import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory, Route } from 'react-router';
import App from "./App";
import routes from './routes';
//import configureStore from './store/configureStore';
//require('./favicon.ico'); // Tell webpack to load favicon.ico
//import './styles/styles.scss'; // Yep, that's right. You can import SASS/CSS files too! Webpack will run the associated loader and plug this into the page.
import { syncHistoryWithStore } from 'react-router-redux';
import ReduxModal from 'react-redux-modal';
import 'semantic-ui-css/semantic.min.css';
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
const networkInterface = createNetworkInterface({
  uri: "http://graphql.org/swapi-graphql/"
});

const client = new ApolloClient({
  networkInterface,
});

//const store = configureStore();

// Create an enhanced history that syncs navigation events with the store
//const history = syncHistoryWithStore(browserHistory, store);

render(
   (<ApolloProvider client={client}>
      {/* <Provider store={store}> */}
        <div>
          <Router history={browserHistory} routes={routes} />
        </div>
    {/* </Provider> */}
   </ApolloProvider>), document.getElementById('app')
);
