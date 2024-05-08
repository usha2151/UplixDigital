import { createStore,combineReducers } from 'redux';
import authReducer from './redux/reducers/authReducers';
import userReducer from './redux/reducers/userinfoReducer';
import userData from './redux/reducers/userDataReducer';
import addFestival from './redux/reducers/addfestivalReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    userReducer,
    userData,
    addFestival
  });
  
  const store = createStore(rootReducer);
  
  export default store;