import axios from 'axios';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const USER_REGISTER = 'USER_REGISTER';
export const USER_INFO = 'USER_INFO';
export const ADD_FESTIVALS = 'ADD_FESTIVALS';
export const FESTIVALS_REQUEST ='FESTIVALS_REQUEST';


export const UserData = (data) => ({
  
  type: USER_INFO,
  payload: data,
});

export const setRegistrationData = (formData) => ({
  type: USER_REGISTER,
  payload: formData,
});


export const login = (user) => {
    return {
      type: LOGIN,
      payload:user,
    };
  };
  
  export const logout = () => {
    return {
      type: LOGOUT
    };
  };


// add festivals

export const AddFestivals = (festivalData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('http://localhost:8080/festivals/add-festivals', festivalData).then(() => {
        alert('done');
      }).catch((err)=>{
        alert(err);
      })
      dispatch({
        type: ADD_FESTIVALS,
        payload: response 
      });
    } catch (error) {
      console.error('Error adding festival:', error);
    }
  };
};

// fetch festivals pending request

export const FestivalPending = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('http://localhost:8080/festivals/festival-request');
      dispatch({ 
        type: FESTIVALS_REQUEST,
         payload: response.data 
        });
    } catch (error) {
      console.error('Error fetching pending notifications:', error);
    }
  }
}