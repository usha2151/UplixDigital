export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const USER_REGISTER = 'USER_REGISTER';
export const USER_INFO = 'USER_INFO';


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