import { USER_INFO } from "../actions/actions";

const initialState = {
  userData: null,
};

const userData = (state = initialState, action) => {


  switch (action.type) {
    case USER_INFO:
      return {
        ...state,
        userData: action.payload,
      };
    default:
      return state;
  }
};

export default userData;
