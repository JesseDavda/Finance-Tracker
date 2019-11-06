import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// import * as serviceWorker from './serviceWorker';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';

// Local Relatives
import './index.css';


class App extends Component {
    render() {
        return (
            <Switch>
                <Route name="Landing" path="/" exact component={Home} />
                <Route name="Login" path="/login" component={Login} />
                <Route name="MyAccounts" path="/myAccounts" component={Home} />
                <Route component={Home} />
            </Switch>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));