import React, { Component } from "react";
import axios from "axios";
import qs from "querystring";
import _ from "lodash";
import { Element } from "react-scroll";
import { Redirect } from "react-router-dom";

import { deleteCookie } from "../../lib/cookieFunctions";

import Account from "../../components/Account";
import TransactionCalendarHeatMap from "../../components/TransactionCalendarHeatMap";
import BalanceDisplay from "../../components/BalanceDisplay";
import PageTemplate from "../../components/PageTemplate";
import LoadingAnimation from "../../components/LoadingAnimation";
import SectionTitle from "../../components/SectionTitle";
import DailySpendChart from "../../components/DailySpendChart";
import RecurringPayments from "../../components/RecurringPayments";

import styles from "./Home.style";
class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			accounts: [],
			heatmap_account_id: "",
			tl_code: qs.parse(props.location.search)["?code"],
			stored_accounts: [],
			redirect_to_login: false
		};
	}

	componentDidMount() {
		axios.get("/validateUser").then(response => {
			this.loadAccounts();
			return this.setState({redirect_to_login: !response.data.valid});
		});
	}

	loadAccounts() {
		axios.get("/loadAccounts")
			.then(response => {
				this.setState({accounts: response.data, heatmap_account_id: response.data[0].account_id});
			}).catch(e => {
				deleteCookie("snapshot_user_account");
				window.alert("There was an error loading your accounts, please try again in a few minutes.");
				console.log(e);
			});
	}

	renderAccounts() {
		if(_.isEmpty(this.state.accounts)) {
			return(
				<div style={styles.accountsLoadingContainer}>
					<LoadingAnimation />
				</div>
			);
		} else {
			return(
				<div style={styles.accountsContainer}>
					{this.state.accounts.map(account => {
						return(
							<Account
								bankImage={account.provider.logo_uri}
								bankName={account.provider.display_name}
								accountName={account.display_name}
								sortCode={account.account_number.sort_code}
								accountNumber={account.account_number.number}
								balance={account.balance.current}
								key={_.uniqueId("account_")}
							/>
						);
					})}
				</div>
			);
		}
	}

	pageCompile() {
		return(
			<div style={styles.container}>
				<SectionTitle 
					title={"Accounts & Balance"}
				/>
				<Element name="Accounts"></Element>
				<BalanceDisplay
					accounts={this.state.accounts}
				/>
				{this.renderAccounts()}
				<SectionTitle 
					title={"Transactions"}
				/>
				<Element name="Transactions"></Element>
				<TransactionCalendarHeatMap
					accounts={this.state.accounts}
					accountId={this.state.heatmap_account_id}
				/>
				<SectionTitle
					title={"Average Daily Spend"}
				/>
				<Element name="DailySpendChart"></Element>
				<DailySpendChart
					accountId={this.state.accounts[0] !== undefined ? this.state.accounts[0].account_id : ""}
				/>
				<SectionTitle
					title={"Repeated Payments"}
				/>
				<Element name="RecurringPayments"></Element>
				<RecurringPayments
					accountId={this.state.accounts[0] !== undefined ? this.state.accounts[0].account_id : ""}
				/>
			</div>
		);
	}

	render() {
		if(this.state.redirect_to_login) {
			return(
				<Redirect to="/login" />
			);
		}

		return(
			<PageTemplate
				navigation={true}
			>
				{this.pageCompile()}
			</PageTemplate>
		);
	}
}

export default Home;