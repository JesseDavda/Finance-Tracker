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
            transactionData: [],
            startDate: moment().subtract(3, 'months'),
            endDate: moment()
        }
    }


    shiftDate(date, numDays) {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + numDays);
        return newDate;
    }

    componentDidMount() {
        axios.get(`http://localhost:3001/transactions?accountId=${this.props.accountId}`)
            .then(response => {
                this.setState({transactionData: response});
            }).catch(e => {
                console.log(e);
            });
    }
    
    render() {
        return(
            <div>
                <CalendarHeatMap 
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    values={this.state.transactionData}

                />
            </div>
        )
    }
}

export default TransactionCalendarHeatMap;