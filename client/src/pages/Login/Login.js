import React, { Component } from 'react';
import {  Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnalytics } from '@fortawesome/pro-light-svg-icons';

import styles from './Login.style';
import PageTemplate from '../../components/PageTemplate';
import googleLogo from '../../assets/GoogleGLogo.svg';


class Login extends Component {

    render() {
        return(
            <PageTemplate
                loginButton={false}
            >
                <div style={styles.loginContainer}>
                    <div style={styles.right}>
                        <FontAwesomeIcon icon={faAnalytics} style={styles.Logo} size="7x" />
                        <h1 style={styles.loginTitle}>Welcome to snapshot</h1>
                        <p style={styles.loginText}>Login with google to save account data and view multiple accounts</p>
                        <div className="loginButton" style={styles.loginWithGoogleButton}>
                            <div style={styles.googleBox}>
                                <img style={styles.googleLogo} src={googleLogo} />
                            </div>
                            <p style={styles.loginWith}>Login with Google</p>
                        </div>
                        <p style={styles.or}>or skip logging in and</p>
                        <Link to="/myAccounts">
                            <div className="loginButton" style={styles.trueLayerButton}>
                                <p style={styles.viewAccount}>View my account</p>
                                <FontAwesomeIcon icon={faAnalytics} style={styles.buttonLogo} size="" />
                            </div>
                        </Link>
                    </div>
                </div>
            </PageTemplate>
        )
    }
}

export default Login;