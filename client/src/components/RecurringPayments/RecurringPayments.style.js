const styles = {
	container: {
		width: "100%",
		height: "fit-content",
		display: "flex",
		flexDirection: "column"
	},
	paymentContainer: {
		width: "95%",
		minHeight: "100px",
		display: "flex",
		alignItems: "center",
		justifyContent: "space-around",
		backgroundColor: "#f7f7f7",
		borderRadius: "10px",
		margin: "10px 0px"
	},
	classification: {
		fontWeight: "300",
		color: "#7A9E7E",
	},
	classificationContainer: {
		width: "calc(100% - 25px)",
		height: "fit-content",
		padding: "15px 0px",
		paddingLeft: "25px",
		borderRadius: "10px",
		backgroundColor: "#FFFFFF",
		boxShadow: "0px 3px 117px -26px rgba(204,204,204,1)",
		margin: "30px 0px"
	},
	paymentLabel: {
		fontWeight: "300"
	},
	containerEmpty: {
		width: "100%",
		height: "300px",
		display: "flex",
		alignItems: "center",
		justifyContent: "center"
	},
	paymentStatistic: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center"
	},
	paymentData: {
		marginTop: "0px"
	},
	totalSpent: {
		height: "98%",
		borderRadius: "10px",
		padding: "0 15px",
		backgroundColor: "#7A9E7E",
		color: "#FFFFFF",
	}
};

export default styles;