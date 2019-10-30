import React, { Component } from 'react';
import CalendarHeatMap from 'react-calendar-heatmap';
import axios from 'axios';
import moment from 'moment';
import _ from 'lodash';

import styles from './TransactionCalendarHeatMap.style';
import 'react-calendar-heatmap/dist/styles.css';

import TransactionViewWindow from '../TransactionViewWindow';
import LoadingAnimation from '../LoadingAnimation';

class TransactionCalendarHeatMap extends Component {
    constructor(props) {
        super(props);

        this.state = {
            accountIdNeeded: true,
            accountId: "",
            transactionData: [],
            startDate: moment().subtract(3, 'months'),
            endDate: moment(),
            transactionViewData: []
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

    getTransactionData() {
        const googleId = window.localStorage.getItem('google_id');
        axios.get(`http://localhost:3001/transactions?accountId=${this.state.accountId}&google_id=${googleId}`)
                .then(response => {
                    console.log(response)
                    this.setState({transactionData: Object.keys(response.data).map(i => response.data[i]), accountIdNeeded: false});
                }).catch(e => {
                    console.log(e);
                });
    }

    componentDidUpdate() {
        if(this.state.accountIdNeeded) {
           this.getTransactionData()
        }
    }

    squareClick(value) {
        this.setState({transactionViewData: value.transactions});
    }
    
    render() {
        if(_.isEmpty(this.state.transactionData)) {
            return(
                <div style={styles.heatMapTransactionViewContainer}>
                    <div style={styles.heatMapContainerLoading}>
                        <LoadingAnimation />
                    </div>
                    <div style={styles.transactionViewContainer}>
                        <TransactionViewWindow
                            data={this.state.transactionViewData}
                        />
                    </div>
                </div>
            )
        } else {
            return(
                <div style={styles.heatMapTransactionViewContainer}>
                    <div style={styles.heatMapContainer}>
                        <CalendarHeatMap
                            startDate={this.state.startDate}
                            endDate={this.state.endDate}
                            values={this.state.transactionData}
                            showWeekdayLabels={true}
                            horizontal={false}
                            classForValue={(value) => {
                                if(!value) {
                                    return 'color-empty'
                                } else if(value.count >= 1 && value.count <= 4) {
                                    return `color-square color-scale-${value.count}`
                                } else {
                                    return 'color-square color-scale-4'
                                }
                            }}
                            onClick={value => { if(!_.isEmpty(value)) this.squareClick(value) }} 
                        />
                    </div>
                    <div style={styles.transactionViewContainer}>
                        <TransactionViewWindow
                            data={this.state.transactionViewData}
                        />
                    </div>
                </div>
            )
        }
    }
}

export default TransactionCalendarHeatMap;