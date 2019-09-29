import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';

import Account from '../../components/Account';
import TransactionCalendarHeatMap from '../../components/TransactionCalendarHeatMap';
import BalanceDisplay from '../../components/BalanceDisplay';
import PageTemplate from '../../components/PageTemplate';
import LoadingAnimation from '../../components/LoadingAnimation';
import SectionTitle from '../../components/SectionTitle';
import DailySpendChart from '../../components/DailySpendChart';

import styles from './Home.style';
class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            accounts: [],
            heatmap_account_id: ""
        }

    }
    
    componentDidMount() {
        axios.get('http://localhost:3001/loadAccounts')
            .then(response => {
                this.setState({accounts: response.data, heatmap_account_id: response.data[0].account_id});
            }).catch(e => {
                console.log(e);
            })
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
                    title={"Repeating Payments"}
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