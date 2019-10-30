import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';

import styles from './RecurringPayments.style';

import LoadingAnimation from '../LoadingAnimation';

class RecurringPayments extends Component {
    constructor(props) {
        super(props);

        this.state = {
            accountId: "",
            accountIdNeeded: true,
            paymentData: []
        }
    }

    static getDerivedStateFromProps(props, state) {
        if(props.accountId !== state.accountId) {
            return {
                accountId: props.accountId
            }
        } else {
            return state
        }
    }

    getPaymentData() {
        const googleId = window.localStorage.getItem('google_id');
        axios.get(`http://localhost:3001/recurringPayments?accountId=${this.state.accountId}&google_id=${googleId}`)
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

                this.setState({ paymentData: dataArray, accountIdNeeded: false});
            }).catch(e => {
                console.log("ERROR: ", e);
            })
    }

    componentDidUpdate() {
        if(this.state.accountIdNeeded) {
            this.getPaymentData();
        }
    }

    objectMap(object, mapFn) {
        return Object.keys(object).reduce(function(result, key) {
            result[key] = mapFn(object[key], key)
            return result
        }, {})
    }

    populateMarkupForPayment(data) {
        return(
            <div style={styles.paymentContainer}>
                <div>
                    <h4 style={styles.paymentLabel}>MERCHANT</h4>
                    <h3 style={styles.paymentData}>{data.name_of_merchant}</h3>
                </div>
                <div style={styles.paymentStatistic}>
                    <h4 style={styles.paymentLabel}>TOTAL PAYMENTS</h4>
                    <h3 style={styles.paymentData}>{data.number_of_transactions}</h3>
                </div>
                <div style={styles.paymentStatistic}>
                    <h4 style={styles.paymentLabel}>AVERAGE PAYMENT</h4>
                    <h3 style={styles.paymentData}>£{data.average_amount_spent}</h3>
                </div>
                <div style={styles.paymentStatistic}>
                    <h4 style={styles.paymentLabel}>AVERAGE INTERVAL</h4>
                    <h3 style={styles.paymentData}>{data.average_interval} days</h3>
                </div>
                <div style={{ ...styles.totalSpent, ...styles.paymentStatistic }}>
                    <h4 style={styles.paymentLabel}>TOTAL SPENT</h4>
                    <h3 style={styles.paymentData}>£{data.total_amount_spent}</h3>
                </div>
            </div>
        )
    }

    createPaymentObject(data) {
        if(Array.isArray(data)) {
            return( 
                <div style={styles.classificationContainer}>
                    <h2 style={styles.classification}>{data[0].classification}</h2>
                    <div style={styles.paymentsContainer}>
                        {data.map(payment => {
                            return this.populateMarkupForPayment(payment)
                        })}
                    </div>
                </div>
            )
        } else {
            return(
                <div style={styles.classificationContainer}>
                    <h2 style={styles.classification}>{data.classification}</h2>
                    {this.populateMarkupForPayment(data)}
                </div>
            )
        }
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
                    return this.createPaymentObject(classification);
                })}
            </div>
        )
    }
}

export default RecurringPayments;