import axios from "axios";
const loginAction = (candidateId,password) => async dispatch => {
  dispatch({ type: "LOADING_START" });
  axios
    .post(
      `https://dscsrm.appspot.com/api/recruitments/applicant/login`,
      { candidateId, password }
    )
    .then(resp => {
      dispatch({ type: "LOADING_STOP" });
      dispatch({
        type: "LOGIN_SUCCESSFUL",
        payload: {
          candidate: resp.data.candidate,
          token: resp.data.token
        }
      });
      localStorage.setItem(
        "user",
        JSON.stringify({
          candidate: resp.data.candidate,
          token: resp.data.token
        })
      );
    })
    .catch(err => {
      dispatch({ type: "LOADING_STOP" });
      dispatch({
        type: "ERROR_OCCURED",
        payload: { message: err.response.data.error.message }
      });
      console.log(err.response.data.error.message);
    });
};

export default loginAction;
