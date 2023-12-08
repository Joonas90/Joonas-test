// index.js
import { combineReducers } from 'redux';
import authStateReducer from './authStateReducer';
import taskReducer from './taskReducer';


const rootReducer = combineReducers({
    authState: authStateReducer,
    taskState: taskReducer
});

export default rootReducer;
