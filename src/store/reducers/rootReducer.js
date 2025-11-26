import { combineReducers } from 'redux';
import userReducer from './userReducer';
import documentReducer from './documentReducer';
import adminReducer from './adminReducer';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { persistReducer } from 'redux-persist';

const persistConfig = {
    storage,
    stateReconciler: autoMergeLevel2,
}

const userPersistConfig = {
    ...persistConfig,
    key: 'user',
    whitelist: ['isLoggedIn', 'userInfo', 'token']
}

const documentPersistConfig = {
    ...persistConfig,
    key: 'document',
    whitelist: ['documents', 'totalPage', 'currentPage', 'documentInfo']
}

const adminPersistConfig = {
    ...persistConfig,
    key: 'admin',
    whitelist: ['arrUser', 'arrRole']
}

const rootReducer = combineReducers({
    user: persistReducer(userPersistConfig, userReducer),
    document: persistReducer(documentPersistConfig, documentReducer),
    admin: persistReducer(adminPersistConfig, adminReducer),
})

export default rootReducer;