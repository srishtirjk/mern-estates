import { combineReducers, configureStore } from '@reduxjs/toolkit'
// import {useReducer} from "./user/userSlice.js"
import userReducer from './user/userSlice.js';
import {persistStore,persistReducer} from 'redux-persist'
import  storage from 'redux-persist/lib/storage'

const rootReducer =combineReducers({user:userReducer})
const persistConfig ={
  key:'root',
  storage,
  version:1,
}
//this can hold the login data as locally
const persistedReducer =persistReducer(persistConfig,rootReducer)
export const store = configureStore({
  // reducer:{user:useReducer},
  reducer:persistedReducer,
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
    serializableCheck:false,
    //in serializablecheck we can put variable in not a serial form
  }),
});
export  const  persistor = persistStore(store)
