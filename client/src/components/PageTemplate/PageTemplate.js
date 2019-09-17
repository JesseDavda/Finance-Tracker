import React, { Component } from 'react';
import styles from './PageTemplate.style';

import NavBar from '../NavBar';

class PageTemplate extends Component {
    render() {
        return(
           <div style={styles.pageContainer}>
                <NavBar />
                <div style={styles.pageContentContainer}>
                    {this.props.children}
                </div>
           </div>
       ) 
    }
}

export default PageTemplate;