import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnalytics } from '@fortawesome/pro-light-svg-icons';

import styles from './Login.style';
import PageTemplate from '../../components/PageTemplate';
import googleLogo from '../../assets/googleLogo.svg';


class Login extends Component {

    render() {
        return(
            <PageTemplate
                loginButton={false}
            >
                <div style={styles.loginContainer}>
                    <div style={styles.left}>
                        <FontAwesomeIcon style={styles.logo} icon={faAnalytics} size="9x"/>
                        <h1 style={styles.leftTitle}>snapshot</h1>
                    </div>
                    <div style={styles.right}>
                        <h1 style={styles.loginTitle}>Welcome to snapshot</h1>
                        <p style={styles.loginText}>Login with google to save account data and view multiple accounts</p>
                        <div className="loginButton" style={styles.loginWithGoogleButton}>
                            <p style={styles.loginWith}>Login with </p>
                            <img style={styles.googleLogo} src={googleLogo} />
                        </div>
                        <p style={styles.or}>or skip logging in and</p>
                        <div className="loginButton" style={styles.trueLayerButton}>
                            <p style={styles.viewAccount}>View my account</p>
                            <FontAwesomeIcon icon={faAnalytics} style={styles.buttonLogo} size="" />
                        </div>
                    </div>
                </div>
            </PageTemplate>
        )
    }
}

export default Login;