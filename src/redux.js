import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import rootReducer from './store/reducers/rootReducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user']
}
const persistedReducer = persistReducer(persistConfig, rootReducer);
const composeEnhancers =
    typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(thunk),
    // other store enhancers if any
);
const reduxStore = createStore(persistedReducer, enhancer);
const persistor = persistStore(reduxStore)

export { reduxStore, persistor };