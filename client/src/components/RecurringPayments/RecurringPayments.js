import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';

import { getCookie } from '../../lib/cookieFunctions';
import styles from './RecurringPayments.style';

import LoadingAnimation from '../LoadingAnimation';

class Payment extends Component {
    render() {
        return(
            <div style={styles.paymentContainer} key={_.uniqueId('payment_s')}>
                <div>
                    <h4 style={styles.paymentLabel}>MERCHANT</h4>
                    <h3 style={styles.paymentData}>{this.props.data.name_of_merchant}</h3>
                </div>
                <div style={styles.paymentStatistic}>
                    <h4 style={styles.paymentLabel}>TOTAL PAYMENTS</h4>
                    <h3 style={styles.paymentData}>{this.props.data.number_of_transactions}</h3>
                </div>
                <div style={styles.paymentStatistic}>
                    <h4 style={styles.paymentLabel}>AVERAGE PAYMENT</h4>
                    <h3 style={styles.paymentData}>£{this.props.data.average_amount_spent}</h3>
                </div>
                <div style={styles.paymentStatistic}>
                    <h4 style={styles.paymentLabel}>AVERAGE INTERVAL</h4>
                    <h3 style={styles.paymentData}>{this.props.data.average_interval} days</h3>
                </div>
                <div style={{ ...styles.totalSpent, ...styles.paymentStatistic }}>
                    <h4 style={styles.paymentLabel}>TOTAL SPENT</h4>
                    <h3 style={styles.paymentData}>£{this.props.data.total_amount_spent}</h3>
                </div>
            </div>
        )
    }
}

class PaymentObject extends Component {
    render() {
        if(Array.isArray(this.props.data)) {
            return( 
                <div style={styles.classificationContainer}>
                    <h2 style={styles.classification}>{this.props.data[0].classification}</h2>
                    <div style={styles.paymentsContainer}>
                        {this.props.data.map(payment => {
                            return (
                                <Payment data={payment} key={_.uniqueId('payment_')} />
                            )
                        })}
                    </div>
                </div>
            )
        } else {
            return(
                <div style={styles.classificationContainer}>
                    <h2 style={styles.classification}>{this.props.data.classification}</h2>
                    <Payment data={this.props.data} />
                </div>
            )
        }
    }
}

class RecurringPayments extends Component {
    constructor(props) {
        super(props);

        this.state = {
            accountId: "",
            accountIdNeeded: true,
            dataRecieved: false,
            paymentData: []
        }
    }

    static getDerivedStateFromProps(props, state) {
        if(state.accountIdNeeded && props.accountId !== state.accountId && props.accountId !== undefined) {
            return {
                accountId: props.accountId,
                accountIdNeeded: false
            }
        } else {
            return state
        }
    }

    getPaymentData() {
        const googleId = getCookie('snapshot_user_account').google_id;
        axios.get(`/recurringPayments?accountId=${this.state.accountId}&google_id=${googleId}`)
            .then(response => {
                const dataArray = [];
                
                this.objectMap(response.data, (item, key) => {
                    if(Array.isArray(item)) {
                        item[0].classification = key;
                    } else {
                        item.classification = key;
                    }

                    dataArray.push(item);
                });

                this.setState({ paymentData: dataArray, accountIdNeeded: false, dataRecieved: true});
            }).catch(e => {
                console.log("ERROR: ", e);
            })
    }

    componentDidUpdate() {
        if(!this.state.accountIdNeeded && !this.state.dataRecieved) {
            this.getPaymentData();
        }
    }

    objectMap(object, mapFn) {
        return Object.keys(object).reduce(function(result, key) {
            result[key] = mapFn(object[key], key)
            return result
        }, {})
    }
    
    render() {
        if(_.isEmpty(this.state.paymentData)) {
            return(
                <div style={styles.containerEmpty}>
                    <LoadingAnimation />
                </div>
            )
        }

        return(
            <div style={styles.container}>
                {this.state.paymentData.map((classification) => {
                    return (
                        <PaymentObject data={classification} key={_.uniqueId('classification_')} />
                    )
                })}
            </div>
        )
    }
}

export default RecurringPayments;