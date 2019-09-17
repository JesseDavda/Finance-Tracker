import React, { Component } from 'react';

import styles from './Account.style.js';

class Account extends Component {
    showAccountDetails() {
        if(this.props.accountNumber && this.props.sortCode) {
            return (
                <div style={styles.accountDetailsContainer}>
                        <div style={styles.sortCodeContainer}>
                            <p style={styles.label}>SORT CODE</p>
                            <h6 style={styles.accountDetail}>{this.props.sortCode}</h6>
                        </div>
                        <div style={styles.accountNumberContainer}>
                            <p style={styles.label}>ACCOUNT NUMBER</p>
                            <h6 style={styles.accountDetail}>{this.props.accountNumber}</h6>
                        </div>
                </div>
            )
        }
    }

    render() {
        return(
            <div style={styles.container}>
                <div style={styles.imageContainer}>
                    <img style={styles.bankImage} src={this.props.bankImage}></img>
                </div>
                <div stlye={styles.detailsContainer}>
                    <h5 style={styles.bankName}>{this.props.bankName}</h5>
                    <h2 style={styles.accountName}>{this.props.accountName}</h2>
                    { this.showAccountDetails() }
                </div>
            </div>
        )
    }
}

export default Account;