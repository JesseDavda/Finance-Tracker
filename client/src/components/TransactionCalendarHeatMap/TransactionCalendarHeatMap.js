import React, { Component } from 'react';
import CalendarHeatMap from 'react-calendar-heatmap';
import axios from 'axios';
import moment from 'moment';

import styles from './TransactionCalendarHeatMap.style';
import 'react-calendar-heatmap/dist/styles.css';


class TransactionCalendarHeatMap extends Component {
    constructor(props) {
        super(props);

        this.state = {
            update: true,
            accountId: [],
            transactionData: [],
            startDate: moment().subtract(3, 'months'),
            endDate: moment()
        }
    }


    static getDerivedStateFromProps(props, state) {
        if(props.accoundId !== state.accountId) {
            return {
                accountId: props.accountId
            }
        }
    }

    componentDidUpdate() {
        if(this.state.update === true) {
            axios.get(`http://localhost:3001/transactions?accountId=${this.state.accountId[0].account_id}`)
                .then(response => {
                    console.log("The returned response: ", response.data);
                    this.setState({transactionData: response, update: false});
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
                    values={[]}
                    showWeekdayLabels={false}
                />
            </div>
        )
    }
}

export default TransactionCalendarHeatMap;