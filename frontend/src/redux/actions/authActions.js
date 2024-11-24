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
