const styles = {
    container: {
        width: '730px',
        height: '150px',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#fff',
        boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
        borderRadius: '5px',
        marginLeft: '50px',
        marginRight: '50px',
        marginBottom: '50px',
        position: 'relative'
    },
    imageContainer: {
        width: '30%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bankImage: {
        width: '60%',
        height: '60%',
    },
    detailsContainer: {
        display: 'flex',
        flexDirection: 'column',
    },
    accountName: {
        margin: '0px',
    },
    bankName: {
        margin: '0px'
    },
    accountDetailsContainer: {
        display: 'flex',
        marginTop: '20px'
    },
    sortCodeContainer: {
        marginRight: '20px'
    },
    label: {
        fontSize: "12px",
        fontWeight: "300",
        margin: "0px",
        marginBottom: "5px"
    },
    accountDetail: {
        margin: '0px'
    },
    balanceContainer: {
        width: '200px',
        position: 'absolute',
        right: '0px',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
}

export default styles;