import { createStore,combineReducers } from 'redux';
import authReducer from './redux/reducers/authReducers';
import userReducer from './redux/reducers/userinfoReducer';
import userData from './redux/reducers/userDataReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    userReducer,
    userData
  });
  
  const store = createStore(rootReducer);
  
  export default store;