import React, { Component } from 'react';
import axios from 'axios';
import qs from 'querystring';
import _ from 'lodash';

import Account from '../../components/Account';
import TransactionCalendarHeatMap from '../../components/TransactionCalendarHeatMap';
import BalanceDisplay from '../../components/BalanceDisplay';
import PageTemplate from '../../components/PageTemplate';
import LoadingAnimation from '../../components/LoadingAnimation';
import SectionTitle from '../../components/SectionTitle';
import DailySpendChart from '../../components/DailySpendChart';
import RecurringPayments from '../../components/RecurringPayments';

import styles from './Home.style';
class Home extends Component {
    constructor(props) {
        super(props);

        console.log(qs.parse(props.location.search));

        this.state = {
            accounts: [],
            heatmap_account_id: "",
            tl_code: qs.parse(props.location.search)['?code'],
            stored_accounts: JSON.parse(window.localStorage.getItem('account_data')).accounts
        }

    }
    
    componentDidMount() {
        if(this.state.tl_code !== undefined) {
            const google_id = window.localStorage.getItem('google_id');
            const req_url = `http://localhost:3001/getTrueLayerAccessToken?code=${this.state.tl_code}&google_id=${google_id}`;
            axios.get(req_url)
                .then(response => {
                    console.log(response);
                    this.loadAccounts(google_id);
                }).catch(e => {
                    console.log(e);
                });
        } else {
            const google_id = window.localStorage.getItem('google_id');
            this.loadAccounts(google_id);
        }
    }

    loadAccounts(google_id) {
        if(_.isEmpty(this.state.stored_accounts)) {
            axios.get(`http://localhost:3001/loadAccounts?google_id=${google_id}`)
                .then(response => {
                    const stored_accounts_object = JSON.parse(window.localStorage.getItem('account_data'));
                    stored_accounts_object.accounts = response.data;
                    window.localStorage.setItem('account_data', JSON.stringify(stored_accounts_object));
                    this.setState({accounts: response.data, heatmap_account_id: response.data[0].account_id});
                }).catch(e => {
                    console.log(e.response.data);
                });
        } else {
            this.setState({accounts: this.state.stored_accounts, heatmap_account_id: this.state.stored_accounts[0].accoundId})
        }
    }

    renderAccounts() {
        if(_.isEmpty(this.state.accounts)) {
            return(
                <div style={styles.accountsLoadingContainer}>
                    <LoadingAnimation />
                </div>
            )
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
                            />
                        )
                    })}
                </div>
            )
        }
    }

    pageCompile() {
        return(
            <div style={styles.container}>
                <SectionTitle 
                    title={"Accounts & Balance"}
                />
                <BalanceDisplay
                    accounts={this.state.accounts}
                />
                {this.renderAccounts()}
                <SectionTitle 
                    title={"Transactions"}
                />
                <TransactionCalendarHeatMap
                    accountId={this.state.heatmap_account_id}
                />
                <SectionTitle
                    title={"Average Daily Spend"}
                />
                <DailySpendChart 
                    accountId={this.state.accounts[0] !== undefined ? this.state.accounts[0].account_id : ""}
                />
                <SectionTitle
                    title={"Repeated Payments"}
                />
                <RecurringPayments
                    accountId={this.state.accounts[0] !== undefined ? this.state.accounts[0].account_id : ""}
                />
            </div>
        )
    }

    render() {
        return(
            <PageTemplate
                navigation={true}
            >
                {this.pageCompile()}
            </PageTemplate>
        )
    }
}

export default Home;