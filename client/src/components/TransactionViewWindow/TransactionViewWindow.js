import React, { Component } from 'react';
import moment from 'moment';
import _ from 'lodash';

import styles from './TransactionViewWindow.style';

class Transaction extends Component {
    renderLabel(transaction) {
        if(transaction.merchant_name !== undefined) {
            return transaction.merchant_name + " (" + transaction.transaction_type + ") - " + transaction.timestamp.substring(11, 19);
        } else if(transaction.description.substring(0, 3) === "pot") {
            if((Math.abs(transaction.amount) < 1)) return "PURCHASE ROUND UP SENT TO POT - " + transaction.timestamp.substring(11, 19);
            else return (transaction.amount < 0 ? "MONEY SENT TO SAVINGS POT" : "MONEY MOVED FROM SAVINGS POT") + " - " + transaction.timestamp.substring(11, 19);
        } else {
            return transaction.description.toUpperCase() + " (" + transaction.transaction_type + ") - " + transaction.timestamp.substring(11, 19);
        }
    }

    render() {
        return (
            <div style={styles.transactionContainer}>
                <div style={styles.transactionLabel}>
                    <h4 style={styles.merchantName}>{this.renderLabel(this.props.transaction)}</h4>
                    <p style={styles.categories}>{_.isEmpty(this.props.transaction.transaction_classification) 
                        ? "" 
                        : this.props.transaction.transaction_classification.join(', ').toUpperCase()}</p>
                </div>
                <div style={styles.transactionAmount}>
                    {this.props.transaction.amount < 0 
                        ? <h2 style={styles.amountRed}>- £{(this.props.transaction.amount * -1).toFixed(2)}</h2> 
                        : <h2 style={styles.amountGreen}>+ £{(this.props.transaction.amount).toFixed(2)}</h2> }
                </div>
            </div>
        )
    }
}

class TransactionViewWindow extends Component {
    constructor(props) {
        super(props);

        this.state = {
            transactions: this.props.data
        }
    }

    static getDerivedStateFromProps(props, state) {
        if(props.data !== state.transactions) {
            return {
                transactions: props.data
            }
        }

        return state;
    }


    render() {
        if(_.isEmpty(this.state.transactions)) {           
            return(
                <div style={styles.transactionViewContainerEmpty}>
                    <h3 style={styles.transactionViewEmptyPrompt}>Try clicking on a day on the heatmap to the left!</h3>
                </div>
            )
        } else {
            return(
                <div style={styles.transactionViewContainer}>
                    <h3 style={styles.transactionDate}>{moment(this.state.transactions[0].timestamp.substring(0, 10)).format("dddd, Do MMMM YYYY")}</h3>
                    {this.state.transactions.slice(0).reverse().map(transaction => {
                        return(
                            <Transaction transaction={transaction} key={_.uniqueId('transaction_')}/>
                        )
                    })}
                </div>
            )
        }
    }
}

export default TransactionViewWindow;