import { combineReducers } from "redux";
import userReducer from "./userReducer";
import taskReducer from "./taskReducer";
import questionReducer from "./questionReducer";

export default combineReducers({
    user: userReducer,
    task: taskReducer,
    question: questionReducer
});
