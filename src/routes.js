import React from 'react';
import { Route, Router, browserHistory } from 'react-router';

import App from './components/App.js';


export default (
    <Router history={browserHistory}>
        <Route path="/" component={App} />
        {/* <Route path="/twitter/:tweet_id/" component={TweetTemplate} />  */}
    </Router>
);
