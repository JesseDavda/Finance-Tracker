const styles = {
    heatMapContainer: {
        width: '300px',
        height: 'fit-content',
        paddingTop: '20px',
        paddingBottom: '20px',
        paddingLeft: '20px',
        paddingRight: '5px',
        borderRadius: '5px',
        boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
        backgroundColor: '#ffffff',
        transition: 'all 0.3s ease-out'
    },
    heatMapContainerLoading: {
        width: '300px',
        height: 'fit-content',
        paddingTop: '20px',
        paddingBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '5px',
        boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
        backgroundColor: '#ffffff',
        transition: 'all 0.3s ease-out'
    },
    heatMapTransactionViewContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between'
    }
}

export default styles;