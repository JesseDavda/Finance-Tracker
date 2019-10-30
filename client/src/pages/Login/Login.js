import React, { Component } from 'react';
import { Link } from "react-router-dom";
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import _ from 'lodash';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnalytics } from '@fortawesome/pro-light-svg-icons';

import styles from './Login.style';
import PageTemplate from '../../components/PageTemplate';
import googleLogo from '../../assets/GoogleGLogo.svg';


class Login extends Component {
    responseGoogle(response) {
        const postBody = {
            code: response.code
        }

        axios.post('http://localhost:3001/googleOAuthTokenHandler', postBody)
            .then(response => {
                window.localStorage.setItem('google_id', response.data.google_id);
                if(window.localStorage.getItem('account_data') === null) {
                    const accountData = {
                        first_name: response.data.first_name,
                        last_name: response.data.last_name,
                        picture_uri: response.data.picture_uri,
                        accounts: response.data.linked_bank_accounts
                    }

                    window.localStorage.setItem('account_data', JSON.stringify(accountData));
                    window.location.replace(response.data.redirect_url);
                } else {
                    window.location.replace('/myAccounts');
                }
            }).catch(e => {
                console.log(e);
            });
    }

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
                        <GoogleLogin
                            clientId="968944964829-rfe2o348c3r5ne4tfge7ahc7pv42cc8g.apps.googleusercontent.com"
                            responseType="code"
                            render={renderProps => (
                                        <div className="loginButton" style={styles.loginWithGoogleButton} onClick={renderProps.onClick}>
                                            <div style={styles.googleBox}>
                                                <img style={styles.googleLogo} src={googleLogo} />
                                            </div>
                                            <p style={styles.loginWith}>Login with Google</p>
                                        </div>)}
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
                        <p style={styles.or}>or skip logging in and</p>
                        <Link to="/myAccounts">
                            <div className="loginButton" style={styles.trueLayerButton} >
                                <p style={styles.viewAccount}>View my account</p>
                                <FontAwesomeIcon icon={faAnalytics} style={styles.buttonLogo} />
                            </div>
                        </Link>
                    </div>
                </div>
            </PageTemplate>
        )
    }
}

export default Login;