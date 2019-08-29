import React, { Component } from 'react';
import axios from 'axios';

import Account from '../../components/Account';

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
                this.setState({accounts: response.data.results});
                console.log(response);
            }).catch(e => {
                console.log(e);
            })
    }
    
    render() {
        return(
            <div>
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
        )
    }
}

export default Home;