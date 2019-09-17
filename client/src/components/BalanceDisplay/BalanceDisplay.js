import React, { Component } from 'react';
import axios from 'axios';
import styles from './BalanceDisplay.style';

import LoadingAnimation from '../LoadingAnimation';

class BalanceDisplay extends Component {
    constructor(props) {
        super(props);

        this.state = {
            balanceReady: false,
            accountsArray: this.props.accounts
        }
    }

    componentDidMount() {
        console.log("Accounts: ", this.props.accounts);
    }

    displayBalance() {
        return(
            <h1>Balance</h1>
        )
    }

    render() {
        return(
            <div style={styles.displayContainer}>
                <p style={styles.balanceLabel}>Combined account balance:</p>
                <div style={styles.balanceContainer}>
                    {this.state.balanceReady ? this.displayBalance() : <LoadingAnimation />}
                </div>
            </div>
        )
    }
}

export default BalanceDisplay;