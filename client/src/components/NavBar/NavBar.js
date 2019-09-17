import React, { Component } from 'react';
import styles from './NavBar.style';

class NavBar extends Component {
    render() {
        return(
            <div style={styles.navContainer}>
                <div style={styles.logoContainer}>
                    <h2>Finance Tracker</h2>
                </div>
                <div style={styles.sideMenu}>
                </div>
            </div>
        )
    }

}

export default NavBar