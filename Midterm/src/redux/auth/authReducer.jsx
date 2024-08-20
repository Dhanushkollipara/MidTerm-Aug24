const initialState = {
    user: null,
    error: null,
    loading: false
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'REGISTER_SUCCESS':
            return { ...state, user: action.payload, loading: false };
        case 'REGISTER_FAIL':
            return { ...state, error: action.payload, loading: false };
        case 'LOGIN_SUCCESS':
            return { ...state, user: action.payload, loading: false, error: null };
        case 'LOGIN_FAIL':
            return { ...state, user: null, loading: false, error: action.payload  };
        case 'LOGIN_REQUEST':
            return {...state,loading: true,};
        default:
            return state;
    }
  };
  
  export default authReducer;
  