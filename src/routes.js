import React from 'react';
import { Route, Router, browserHistory } from 'react-router';

import App from './components/App.js';
import TwitterTemplate from './components/TwitterTemplate';

export default (
    <Router history={browserHistory}>
        <Route path="/" component={App} />
        <Route path="/twitter/:uid" component={TwitterTemplate} /> 
    </Router>
);
