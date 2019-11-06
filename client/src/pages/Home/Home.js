import React, { Component } from 'react';
import axios from 'axios';
import qs from 'querystring';
import _ from 'lodash';
import { Element } from 'react-scroll';

import { getCookie } from '../../lib/cookieFunctions';

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

        this.state = {
            accounts: [],
            heatmap_account_id: "",
            tl_code: qs.parse(props.location.search)['?code'],
            stored_accounts: []
        }

        if(getCookie('snapshot_user_account') === undefined) {
            // axios.get(`/validateUser?google_id=${getCookie('snapshot_user_account')}`).then(response => {
            //     response.valid
            //         ? true
            //         : window.history.push('/login');
            // })
            window.history.push('/login');
        }
    }
    
    componentDidMount() {
        const google_id = getCookie('snapshot_user_account').google_id;

        if(this.state.tl_code !== undefined) {
            const req_url = `/getTrueLayerAccessToken?code=${this.state.tl_code}&google_id=${google_id}`;

            axios.get(req_url)
                .then(response => {
                    this.loadAccounts(google_id);
                }).catch(e => {
                    console.log(e);
                });

        } else {
            this.loadAccounts(google_id);
        }
    }

    componentDidUpdate() {
        if(getCookie('snapshot_user_account') === undefined) {
            window.history.push('/login');
        }
    }

    loadAccounts(google_id) {
        axios.get(`/loadAccounts?google_id=${google_id}`)
            .then(response => {
                this.setState({accounts: response.data, heatmap_account_id: response.data[0].account_id});
            }).catch(e => {
                console.log(e);
            });
    }

    renderAccounts() {
        if(_.isEmpty(this.state.accounts)) {
            return(
                <div style={styles.accountsLoadingContainer}>
                    <LoadingAnimation />
                </div>
            )
        } else {
            console.log(this.state.accounts)
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
                                key={_.uniqueId('account_')}
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