import { combineReducers } from 'redux';
import { authReducer } from './auth';
import { eventReducer } from './events';

const rootReducer = combineReducers({
    auth: authReducer,
    events: eventReducer
});

export default rootReducer;
