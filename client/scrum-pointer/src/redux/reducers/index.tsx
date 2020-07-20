import { combineReducers } from 'redux';
import CredentialsReducer from './credentials';
import ChannelReducer from './channel';

export default combineReducers({
    CredentialsReducer,
    ChannelReducer
});