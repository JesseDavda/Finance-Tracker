import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";

// import * as serviceWorker from './serviceWorker';

// Pages
import Home from './pages/Home';

// Local Relatives
import './index.css';

class App extends Component {
    render() {
        return (
            <Router>
                <Route path="/" exact component={Home} />
            </Router>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));