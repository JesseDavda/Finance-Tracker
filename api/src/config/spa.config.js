const ConfiguredSPAs = () => {
    function SPA() {
        this.params = params;
    }

    const FinanceTracker = new SPA({
        name: 'FinanceTracker',
        entryPoint: '../../client/build/index.html',
        redirect: true
    });

    FinanceTracker.appTitle = "Finance Tracker";

    FinanceTracker.getEntryPoint = () => {
        return FinanceTracker.params.entryPoint;
    }

    FinanceTracker.getRedirectName = () => {
        return FinanceTracker.params.name;
    }

    return FinanceTracker
}

export default ConfiguredSPAs();