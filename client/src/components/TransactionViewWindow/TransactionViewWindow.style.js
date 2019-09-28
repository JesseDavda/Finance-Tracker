const styles = {
    transactionViewContainer: {
        width: '700px',
        height: '500px',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0px 3px 117px -26px rgba(204,204,204,1)',
        backgroundColor: '#ffffff',
        overflowY: 'scroll',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxSizing: 'border-box',
    },
    transactionViewContainerEmpty: {
        width: '700px',
        height: '500px',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0px 3px 117px -26px rgba(204,204,204,1)',
        backgroundColor: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    transactionContainer: {
        width: '100%',
        boxSizing: 'border-box',
        padding: '0px 20px',
        minHeight: '60px',
        borderRadius: '10px',
        marginBottom: '20px',
        boxShadow: '0px 3px 117px -26px rgba(204,204,204,1)',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#f7f7f7'
    },
    transactionAmount: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 'fit-content',
        height: 'fit-content',
        borderRadius: '10px',
        padding: '5px'
    },
    transactionLabel: {
        display: 'flex',
        flexDirection: 'column'
    },
    categories: {
        margin: '0px',
        fontSize: '12px',
        fontWeight: '300',
        marginTop: '5px'
    },
    merchantName: {
        margin: '0px'
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