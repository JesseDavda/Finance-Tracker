const styles = {
    transactionViewContainer: {
        width: '700px',
        height: '500px',
        padding: '20px',
        // borderRadius: '5px',
        // boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
        backgroundColor: '#ffffff',
        overflowY: 'scroll',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    transactionViewContainerEmpty: {
        width: '700px',
        height: '500px',
        padding: '20px',
        // borderRadius: '5px',
        // boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
        backgroundColor: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    transactionContainer: {
        width: '100%',
        boxSizing: 'border-box',
        padding: '0px 20px',
        height: '80px',
        borderRadius: '5px',
        marginBottom: '20px',
        boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
        position: 'relative',
        display: 'flex',
        alignItems: 'center'
    },
    amountRed: {
        color: '#e74c3c',
        position: 'absolute',
        right: '20px',
        margin: '0px'
    },
    amountGreen: {
        color: '#7bc74d',
        position: 'absolute',
        right: '20px',
        margin: '0px'
    }
}

export default styles;