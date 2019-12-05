import React, { Component } from "react";
import _ from "lodash";

import styles from "./AccountSelectionDropdown.style";

class AccountSelectionDropdown extends Component {
	constructor(props) {
		super(props);

		this.state = {
			accounts: this.props.accounts,
			selectedItem: "Select and account"
		};
	}

	select(account) {
		this.setState({selectedItem: account.display_name});
		this.props.selectAccount(account);
	}

	render() {
		return(
			<div style={styles.dropdownContainer}>
				<div style={styles.dropdownCurrentItem}>
					<h3>{this.state.selectedItem}</h3>
				</div>
				<div style={styles.dropdownSelections}>
					{this.state.accounts.map(account => {
						return(
							<div style={styles.dropdownSelection} key={_.uniqueId()}
								onClick={(account) => this.select(account)}>
								<h4>{account.display_name}</h4>
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}

export default AccountSelectionDropdown;