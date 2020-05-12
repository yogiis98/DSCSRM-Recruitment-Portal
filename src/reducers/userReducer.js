const initialState = {
  isLoggedin:false,
  isLoading:false,
  user:null,
  err:"",
  token:null
}

export default (state = initialState, {type,payload}) => {
    switch (type) {
      case "LOADING_START":
        return { ...state, err: "", isLoading: true };
      case "LOADING_STOP":
        return { ...state, isLoading: false };
      case "LOGIN_SUCCESSFUL":
        return { ...state, isLoggedin: true, ...payload };
      case "LOGOUT":
        return { ...state, isLoggedin: false, user:null, token:null };
      case "ERROR_OCCURED":
        return { ...state, err: payload.message };
      default:
        return state;
    }
};
