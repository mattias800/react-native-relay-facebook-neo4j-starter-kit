import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import devTools from 'remote-redux-devtools';
import {AsyncStorage} from 'react-native'
import {persistStore, autoRehydrate} from 'redux-persist'

export const configureStore = (initialState) => {

    const enhancer = compose(
        autoRehydrate(),
        applyMiddleware(thunk),
        devTools()
    );

    const reducer = (state, action) => state;

    const store = createStore(reducer, initialState, enhancer);

    persistStore(store, { storage : AsyncStorage });

    return store;
};

