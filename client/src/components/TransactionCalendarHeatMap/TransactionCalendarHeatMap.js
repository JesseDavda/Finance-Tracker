import React, { Component } from "react";
import CalendarHeatMap from "react-calendar-heatmap";
import axios from "axios";
import moment from "moment";
import _ from "lodash";

import { getCookie } from "../../lib/cookieFunctions";
import styles from "./TransactionCalendarHeatMap.style";
import "react-calendar-heatmap/dist/styles.css";

import TransactionViewWindow from "../TransactionViewWindow";
import LoadingAnimation from "../LoadingAnimation";

class TransactionCalendarHeatMap extends Component {
	constructor(props) {
		super(props);

		this.state = {
			accounts: {},
			accountIdNeeded: true,
			accountId: "",
			dataRecieved: false,
			transactionData: [],
			startDate: moment().subtract(3, "months"),
			endDate: moment(),
			transactionViewData: []
		};
	}

	static getDerivedStateFromProps(props, state) {
		if(state.accountIdNeeded && props.accountId !== state.accountId && props.accountId !== undefined) {
			return {
				accountId: props.accountId,
				accountIdNeeded: false,
				accounts: props.accounts
			};
		} else {
			return state;
		}
	}

	callApiForTransactions(accountId, googleId) {
		axios.get(`/transactions?accountId=${accountId}&google_id=${googleId}`)
			.then(response => {
				this.setState({transactionData: Object.keys(response.data).map(i => response.data[i]), accountIdNeeded: false, dataRecieved: true});
			}).catch(e => {
				console.log(e);
			});
	}

	getTransactionData() {
		const googleId = getCookie("snapshot_user_account").google_id;
		this.callApiForTransactions(this.state.accountId, googleId);
	}

	componentDidUpdate() {
		if(!this.state.accountIdNeeded && !this.state.dataRecieved) {
			this.getTransactionData();
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
			);
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
									return "color-empty";
								} else if(value.count >= 1 && value.count <= 4) {
									return `color-square color-scale-${value.count}`;
								} else {
									return "color-square color-scale-4";
								}
							}}
							onClick={value => { if(!_.isEmpty(value)) this.squareClick(value); }} 
						/>
					</div>
					<div style={styles.transactionViewContainer}>
						<TransactionViewWindow
							data={this.state.transactionViewData}
						/>
					</div>
					<div style={styles.accountSelector}>
                            
					</div>
				</div>
			);
		}
	}
}

export default TransactionCalendarHeatMap;