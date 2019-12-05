import React, { Component } from "react";
import styles from "./PageTemplate.style";

import NavBar from "../NavBar";
import SideMenu from "../SideMenu";

class PageTemplate extends Component {
	render() {
		if(this.props.navigation) {
			return(
				<div style={styles.pageContainer}>
					<NavBar 
						loginButton={this.props.loginButton}
					/>
					<div style={styles.pageContentContainer}>
						<SideMenu />
						{this.props.children}
					</div>
				</div>
			);
		} else {
			return(
				<div style={styles.pageContainer}>
					<div style={styles.pageContentContainer}>
						{this.props.children}
					</div>
				</div>
			);
		}
	}
}

export default PageTemplate;