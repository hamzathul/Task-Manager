import axios from '../../lib/axios'
import { AUTH_FAIL, AUTH_REQUEST, AUTH_SUCCESS } from '../slices/authSlice';


// Action to check user authentication
export const checkAuth = () => async (dispatch) => {
  dispatch(AUTH_REQUEST());
  try {
    const response = await axios.get("/auth/profile", {
      withCredentials: true,
    });
    dispatch(AUTH_SUCCESS(response.data));
  } catch (error) {
    dispatch(
      AUTH_FAIL(error.response?.data?.message || "Authentication failed.")
    );
  }
};


export const signupUser = (formData, navigate) => async (dispatch) => {
  dispatch(AUTH_REQUEST()); 

  try {
    // API call to register the user
    const response = await axios.post("/auth/register", formData, { withCredentials: true });
    dispatch(AUTH_SUCCESS(response.data.user)); 
    navigate("/"); 
  } catch (error) {
    dispatch(
      AUTH_FAIL(error.response?.data?.message || "Signup failed. Try again.") 
    );
  }
};


// Action to handle user login
export const loginUser = (formData, navigate) => async (dispatch) => {
  dispatch(AUTH_REQUEST()); 

  try {
    // API call to log in the user
    const response = await axios.post("/auth/login", formData, {
      withCredentials: true,
    });
    console.log(response.data.user); 
    dispatch(AUTH_SUCCESS(response.data.user)); 
    navigate("/"); 
  } catch (error) {
    dispatch(
      AUTH_FAIL(error.response?.data?.message || "Login failed. Try again.") 
    );
  }
};
