import { createStore,combineReducers, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import authReducer from './redux/reducers/authReducers';
import userReducer from './redux/reducers/userinfoReducer';
import userData from './redux/reducers/userDataReducer';
import addFestival from './redux/reducers/addfestivalReducer';
import festivalPendingReducer from './redux/reducers/festivalPendingReducer';


const rootReducer = combineReducers({
    auth: authReducer,
    userReducer,
    userData,
    addFestival,
festivalPendingReducer
  });
  
  const store = createStore(rootReducer, applyMiddleware(thunk));
  
  export default store;