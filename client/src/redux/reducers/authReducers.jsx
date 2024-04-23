// reducers/authReducer.js
import { LOGIN, LOGOUT } from "../actions/actions";
const initialState = {
    isAuthenticated: localStorage.getItem('token') ? true : false,
    user: null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN:
        localStorage.setItem('token', action.payload.token);
        return {
          ...state,
          isAuthenticated: true,
          user: action.payload,
        };
      case LOGOUT:
        localStorage.removeItem('token');
        return {
          ...state,
          isAuthenticated: false,
          user: null,
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
  