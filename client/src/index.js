import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

// import * as serviceWorker from './serviceWorker';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';

// Local Relatives
import './index.css';


class App extends Component {
    render() {
        return (
            <Router>
                <Redirect exact from="/" to="Login" />
                <Route name="Login" path="/login" exact component={Login} />
                <Route name="myAccounts" path="/myAccounts" exact component={Home} />
            </Router>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));