import axios from '../../lib/axios'

// Action to handle user signup
export const signupUser = (formData, navigate) => async (dispatch) => {
  dispatch({ type: "AUTH_REQUEST" });

  try {
    const response = await axios.post("/auth/register", formData, { withCredentials: true });
    dispatch({ type: "AUTH_SUCCESS", payload: response.data?.user });
    navigate("/dashboard"); // Redirect to dashboard
  } catch (error) {
    dispatch({
      type: "AUTH_FAIL",
      payload: error.response?.data?.message || "Signup failed. Try again.",
    });
  }
};

// Action to handle user login
export const loginUser = (formData, navigate) => async (dispatch) => {
  dispatch({ type: "AUTH_REQUEST" });

  try {
    // Make API request to the login endpoint
    const response = await axios.post("/auth/login", formData, { withCredentials: true });
    console.log(response.data);
    dispatch({ type: "AUTH_SUCCESS", payload: response.data?.user });
    navigate("/dashboard"); // Redirect to the dashboard after successful login
  } catch (error) {
    dispatch({
      type: "AUTH_FAIL",
      payload: error.response?.data?.message || "Login failed. Try again.",
    });
  }
};
