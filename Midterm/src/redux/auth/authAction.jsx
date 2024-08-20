import axios from 'axios';

export const registerUser = (userData) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:3000/api/v1/users', userData);
    dispatch({ type: 'REGISTER_SUCCESS', payload: response.data });
    console.log(response.data);
  } catch (error) {
    dispatch({ type: 'REGISTER_FAIL', payload: error.response.data });
  }
};

export const loginUser = (userData) => async (dispatch) => {
    try {
        dispatch({ type: 'LOGIN_REQUEST' }); 
      const response = await axios.post('http://localhost:3000/api/v1/auth/login', userData);
      console.log(response.data);
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('userId', response.data.user._id);
      dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
    } catch (error) {
      dispatch({ type: 'LOGIN_FAIL', payload: error.response.data });
    }
  };
  
