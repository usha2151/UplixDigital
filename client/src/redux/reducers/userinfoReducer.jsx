import { USER_REGISTER } from "../actions/actions";

const initialState = {
    registrationData: null,
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case USER_REGISTER:
        return {
          ...state,
          registrationData: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default userReducer;