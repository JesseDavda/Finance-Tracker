import React, { Component } from 'react';
import CalendarHeatMap from 'react-calendar-heatmap';
import axios from 'axios';
import moment from 'moment';
import _ from 'lodash';

import styles from './TransactionCalendarHeatMap.style';
import 'react-calendar-heatmap/dist/styles.css';


class TransactionCalendarHeatMap extends Component {
    constructor(props) {
        super(props);

        this.state = {
            accountIdNeeded: true,
            accountId: "",
            transactionData: [],
            startDate: moment().subtract(3, 'months'),
            endDate: moment()
        }
    }

    static getDerivedStateFromProps(props, state) {
        if(props.accountId !== state.accountId) {
            console.log('requested');
            console.log(props.accountId);
            return {
                accountId: props.accountId
            }
        } else {
            return state
        }
    }

    componentDidUpdate() {
        console.log('componentDidUpdate called', this.state.accountIdNeeded)
        if(this.state.accountIdNeeded) {
            console.log('transactions requested');
            axios.get(`http://localhost:3001/transactions?accountId=${this.state.accountId}`)
                .then(response => {
                    console.log(response)
                    this.setState({transactionData: Object.keys(response.data).map(i => response.data[i]), accountIdNeeded: false});
                }).catch(e => {
                    console.log(e);
                });
        }
    }
    
    render() {
        return(
            <div style={styles.heatMapContainer}>
                <CalendarHeatMap
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    values={this.state.transactionData}
                    onClick={value => alert(`Clicked on value with count: ${value.count}`)}
                    classForValue={(value) => {
                        if(!value) {
                            return 'color-empty'
                        } else if(value.count >= 1 && value.count <= 4) {
                            return `color-scale-${value.count}`
                        } else {
                            return 'color-scale-4'
                        }
                    }}
                />
            </div>
        )
    }
}

export default TransactionCalendarHeatMap;