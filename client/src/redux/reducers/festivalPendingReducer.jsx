import { FESTIVALS_REQUEST } from "../actions/actions";
const initialState = {
    pendingNotifications: [],
  };
  
  const festivalPendingReducer = (state = initialState, action) => {
    
    switch (action.type) {
      case FESTIVALS_REQUEST:
        return {
          ...state,
          pendingNotifications: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default festivalPendingReducer;