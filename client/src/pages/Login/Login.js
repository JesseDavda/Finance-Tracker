import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import GoogleLogin from 'react-google-login';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnalytics } from '@fortawesome/pro-light-svg-icons';

import styles from './Login.style';
import PageTemplate from '../../components/PageTemplate';
import googleLogo from '../../assets/GoogleGLogo.svg';
import { createCookie, getCookie } from '../../lib/cookieFunctions';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: false,
            path: ""
        }
    
        if(getCookie('snapshot_user_account') !== undefined) {
            axios.get(`/validateUser?google_id=${getCookie('snapshot_user_account').google_id}`).then(response => {
                return response.valid
                    ? true
                    : this.setState({redirect: true, path: "/home"});
            });
        } else {
            this.setState({redirect: true, path: "/home"});
        }
    }

    responseGoogle(response) {
        const postBody = {
            code: response.code
        }

        const self = this;

        axios.post('/googleOAuthTokenHandler', postBody)
            .then(response => {
                const accountData = {
                    first_name: response.data.first_name,
                    last_name: response.data.last_name,
                    picture_uri: response.data.picture_uri,
                    google_id: response.data.google_id
                } 

                createCookie('snapshot_user_account', accountData);
                
                if(response.data.exists) {
                    self.setState({redirect: true, path: "/home"});
                } else {
                    console.log("redirecting to truelayer auth");
                    self.setState({redirect: true, path: response.data.redirect_url})
                }
            }).catch(e => {
                console.log(e);
            });
    }

    render() {
        if(this.state.redirect) {
            return(
                <Redirect to={this.state.path} />
            )
        }

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
                                                <img style={styles.googleLogo} src={googleLogo} alt="google logo" />
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