import React, { Component } from 'react';
import _ from 'lodash';

import styles from './TransactionViewWindow.style';
class TransactionViewWindow extends Component {
    constructor(props) {
        super(props);

        this.state = {
            transactions: this.props.data
        }
    }

    static getDerivedStateFromProps(props, state) {
        console.log(state);
        console.log(props);
        if(props.data !== state.transactions) {
            return {
                transactions: props.data
            }
        }
    }

    render() {
        if(_.isEmpty(this.state.transactions)) {           
            return(
                <div style={styles.transactionViewContainerEmpty}>
                    <h3>Try clicking on a day on the heatmap to the left!</h3>
                </div>
            )
        } else {
            return(
                <div style={styles.transactionViewContainer}>
                    {this.state.transactions.map(transaction => {
                        return(
                            <div style={styles.transactionContainer}>
                                <h4 style={styles.merchantName}>{transaction.merchant_name !== undefined ? transaction.merchant_name : (transaction.amount * -1) < 1 ? "ROUND UP" : "SAVINGS"}</h4>
                                {transaction.amount < 0 ? <h2 style={styles.amountRed}>£{(transaction.amount * -1).toFixed(2)}</h2> : <h2 style={styles.amountGreen}>£{(transaction.amount).toFixed(2)}</h2> }
                            </div>
                        )
                    })}
                </div>
            )
        }
    }
}

export default TransactionViewWindow;