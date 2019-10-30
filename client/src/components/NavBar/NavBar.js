import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnalytics } from '@fortawesome/pro-light-svg-icons';
import styles from './NavBar.style';

import googleLogo from '../../assets/googleLogo.svg';

class NavBar extends Component {
    render() {
        if(this.props.loginButton) {
            return(
                <div style={styles.navContainer}>
                    <div style={styles.logoContainer}>
                        <FontAwesomeIcon style={styles.logo} icon={faAnalytics} size="2x" />
                        <h2 style={styles.logoText} >snapshot</h2>
                    </div>
                    <div style={styles.loginContainer}>
                        <div class="loginButton" style={styles.loginButton}>
                            <h4 style={styles.loginButtonText}>Login with </h4>
                            <img style={styles.googleLogo} src={googleLogo} />
                        </div>
                    </div>
                </div>
            )
        } else if(window.localStorage.getItem('account_data') !== null) {
            const accountData = JSON.parse(window.localStorage.getItem('account_data'));
            return(
                <div style={styles.navContainer}>
                    <div style={styles.logoContainer}>
                        <FontAwesomeIcon style={styles.logo} icon={faAnalytics} size="2x" />
                        <h2 style={styles.logoText}>snapshot</h2>
                    </div>
                    <div style={styles.profileContainer}>
                        <div style={styles.pictureContainer}>
                            <img src={accountData.picture_uri} style={styles.avatar} />
                        </div>
                        <div style={styles.nameContainer}>
                            <h3>{accountData.first_name}</h3>
                            <h3>{accountData.last_name}</h3>
                        </div>
                    </div>
                </div>
            );
        } else {
            return(
                <div style={styles.navContainer}>
                    <div style={styles.logoContainer}>
                        <FontAwesomeIcon style={styles.logo} icon={faAnalytics} size="2x" />
                        <h2 style={styles.logoText}>snapshot</h2>
                    </div>
                </div>
            )
        }
    }

}

export default NavBar