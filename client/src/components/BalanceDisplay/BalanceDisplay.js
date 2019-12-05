import React, { Component } from "react";
import styles from "./BalanceDisplay.style";

import LoadingAnimation from "../LoadingAnimation";

class BalanceDisplay extends Component {
	constructor(props) {
		super(props);

		this.state = {
			balanceReady: false,
			accountsRecieved: false,
			accountsArray: this.props.accounts,
			balance: 0
		};
	}

	static getDerivedStateFromProps(props, state) {
		if(props.accounts !== state.accountsArray) {
			return {
				accountsArray: props.accounts,
				accountsRecieved: true
			};
		} else {
			return state;
		}
	}

	componentDidUpdate() {
		this.setBalance();
	}

	setBalance() {  
		if(this.state.accountsRecieved) {
			this.setState({
				balanceReady: true,
				accountsRecieved: false,
				balance: this.calcBalance() 
			});
		}
	}

	calcBalance() {
		let total = 0;

		this.state.accountsArray.forEach(account => {
			total += account.balance.current;
		});

		return total;
	}

	render() {
		return(
			<div style={styles.displayContainer}>
				<p style={styles.balanceLabel}>COMBINED ACCOUNT BALANCE:</p>
				<div style={styles.balanceContainer}>
					{this.state.balanceReady ? <h1 style={styles.balanceNumber}>£{(this.state.balance).toFixed(2)}</h1> : <LoadingAnimation />}
				</div>
			</div>
		);
	}
}

export default BalanceDisplay;