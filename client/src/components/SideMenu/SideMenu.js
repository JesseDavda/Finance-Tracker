import React, { Component } from "react";
import { scroller as scroll, animateScroll } from "react-scroll";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard, faShoppingCart, faUserChart, faRepeat } from "@fortawesome/pro-light-svg-icons";

import styles from "./SideMenu.style";

class SideMenu extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currentSection: "Accounts"
		};
	}

	scrollTo(componentName) {
		if(componentName === "Accounts") {
			animateScroll.scrollToTop();
		} else {
			scroll.scrollTo(componentName, {
				duration: 800,
				delay: 50,
				smooth: true
			});
		}

		this.setState({currentSection: componentName});
	}

	render() {
		return(
			<div style={styles.container}>
				<div style={this.state.currentSection === "Accounts" ? styles.selected : styles.nonSelected}>
					<FontAwesomeIcon 
						className="menuItem"
						icon={faCreditCard}
						size="2x"
						style={this.state.currentSection === "Accounts"
							? styles.selectedIcon 
							: styles.nonSelectedIcon}
						onClick={() => this.scrollTo("Accounts")}
					/>
				</div>
				<div style={this.state.currentSection === "Transactions" ? styles.selected : styles.nonSelected}>
					<FontAwesomeIcon 
						className="menuItem"
						icon={faShoppingCart}
						size="2x"
						style={this.state.currentSection === "Transactions" 
							? styles.selectedIcon 
							: styles.nonSelectedIcon}
						onClick={() => this.scrollTo("Transactions")}
					/>
				</div>
				<div style={this.state.currentSection === "DailySpendChart" ? styles.selected : styles.nonSelected}>
					<FontAwesomeIcon
						className="menuItem"
						icon={faUserChart}
						size="2x"
						style={this.state.currentSection === "DailySpendChart" 
							? styles.selectedIcon 
							: styles.nonSelectedIcon}
						onClick={() => this.scrollTo("DailySpendChart")}
					/>
				</div>
				<div style={this.state.currentSection === "RecurringPayments" ? styles.selected : styles.nonSelected}>
					<FontAwesomeIcon
						className="menuItem"
						icon={faRepeat}
						size="2x"
						style={this.state.currentSection === "RecurringPayments" 
							? styles.selectedIcon 
							: styles.nonSelectedIcon}
						onClick={() => this.scrollTo("RecurringPayments")}
					/>
				</div>
			</div>
		);
	}
}

export default SideMenu;