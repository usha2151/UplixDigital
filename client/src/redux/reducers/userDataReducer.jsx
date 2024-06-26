import { USER_INFO } from "../actions/actions";
const initialState = {
  userData: {
    id: null,
    name: null,
    type: null,
  },
};

const userData = (state = initialState, action) => {
  switch (action.type) {
    case USER_INFO:
      return {
        ...state,
        userData: {
          id: action.payload.id,
          name: action.payload.name,
          type: action.payload.type,
        },
      };
    default:
      return state;
  }
};

export default userData;
