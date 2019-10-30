import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faShoppingCart, faUserChart, faRepeat } from '@fortawesome/pro-light-svg-icons';

import styles from './SideMenu.style';

class SideMenu extends Component {
    render() {
        return(
            <div style={styles.container}>
                <div style={styles.selected}>
                    <FontAwesomeIcon className="menuItem" icon={faCreditCard} size="2x" style={styles.accountsIcon} />
                </div>
                <FontAwesomeIcon className="menuItem" icon={faShoppingCart} size="2x" style={styles.transactionsIcon} />
                <FontAwesomeIcon className="menuItem" icon={faUserChart} size="2x" style={styles.transactionsIcon} />
                <FontAwesomeIcon className="menuItem" icon={faRepeat} size="2x" style={styles.transactionsIcon} />
            </div>
        )
    }
}

export default SideMenu