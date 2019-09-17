import React, { Component } from 'react';
import axios from 'axios';

import Account from '../../components/Account';
import TransactionCalendarHeatMap from '../../components/TransactionCalendarHeatMap';
import BalanceDisplay from '../../components/BalanceDisplay';
import PageTemplate from '../../components/PageTemplate';

import styles from './Home.style';
class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            accounts: []
        }

    }
    
    componentDidMount() {
        axios.get('http://localhost:3001/loadAccounts')
            .then(response => {
                this.setState({accounts: response.data});
                this.combineBalance();
            }).catch(e => {
                console.log(e);
            })
    }

    pageCompile() {
        return(
            <div style={styles.container}>
                <BalanceDisplay
                    accounts={this.state.accounts}
                />
                <div style={styles.accountsContainer}>
                    {this.state.accounts.map(account => {
                        return(
                            <Account
                                bankImage={account.provider.logo_uri}
                                bankName={account.provider.display_name}
                                accountName={account.display_name}
                                sortCode={account.account_number.sort_code}
                                accountNumber={account.account_number.number}
                            />
                        )
                    })}
                </div>
                <TransactionCalendarHeatMap />
            </div>
        )
    }

    render() {
        return(
            <PageTemplate>
                {this.pageCompile()}
            </PageTemplate>
        )
    }
}

export default Home;