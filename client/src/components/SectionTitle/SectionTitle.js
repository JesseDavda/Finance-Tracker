import React, { Component } from "react";

import styles from "./SectionTitle.style";

class SectionTitle extends Component {
	render() {
		return(
			<div style={styles.sectionTitleContainer}>
				<h1 style={styles.sectionTitle}>{this.props.title}</h1>
			</div>
		);
	}
}

export default SectionTitle;
