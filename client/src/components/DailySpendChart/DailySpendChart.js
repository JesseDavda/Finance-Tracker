import React, { Component } from 'react';
import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area } from 'recharts';
import axios from 'axios';
import styles from './DailySpendChart.style'

class DailySpendChart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            accountId: "",
            accountIdNeeded: true,
            dailySpendData: []
        }
    }

    static getDerivedStateFromProps(props, state) {
        if(props.accountId !== state.account_id) {
            return {
                accountId: props.accountId
            }
        } else {
            return state
        }
    }

    getDailySpendData() {
        axios.get(`http://localhost:3001/averageSpendDaily?accountId=${this.state.accountId}`)
            .then(response => {
                console.log(response.data);
                this.setState({ dailySpendData: response.data, accountIdNeeded: false})
            }).catch(e => {
                console.log("ERROR: ", e);
            })
    }

    componentDidUpdate() {
        if(this.state.accountIdNeeded) {
            this.getDailySpendData();
        }
    }

    areaChart() {
        return(
            <AreaChart 
                width={1050}
                height={250}
                data={this.state.dailySpendData}
                margin={{top: 10, bottom: 10, left: 10, right: 10}}
            >
                <defs>
                    <linearGradient id="colorAvgSpend" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#44a340" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#44a340" stopOpacity={0}/> 
                    </linearGradient>
                </defs>
                <XAxis dataKey="date" />
                <YAxis dataKey="average_spend" />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area type="monotone" dataKey="average_spend" stroke="#44a340" fillOpacity={1} fill="url(#colorAvgSpend)" />
            </AreaChart>
        )
    }

    render() {
        return(
            <div style={styles.chartContainer} >
                {this.areaChart()}
            </div>
        )
    }
}

export default DailySpendChart;