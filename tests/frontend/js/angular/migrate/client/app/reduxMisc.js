import store from "./store";

function reduxComponentInit(component, MapStateToProps, MapDispatchToProps) {
    if (MapStateToProps) {
        computeComponentState(component, MapStateToProps);
        component.reduxUnsubscribe = store.subscribe(() => {
            computeComponentState(component, MapStateToProps)
        });
    }
    if (MapDispatchToProps) {
        computeComponentActions(component, MapDispatchToProps);
    }
}

function reduxComponentDestroy(component) {
    component.reduxUnsubscribe();
}

function computeComponentActions(component, MapDispatchToProps) {
    const actions = MapDispatchToProps(store.dispatch);
    for (let action in actions) {
        component[action] = actions[action];
    }
}

function computeComponentState(component, MapStateToProps) {
    const values = MapStateToProps(store.getState());
    for (let prop in values) {
        if (values[prop] !== component[prop]) {
            component[prop] = values[prop];
        }
    }
}

export { reduxComponentInit, reduxComponentDestroy };
