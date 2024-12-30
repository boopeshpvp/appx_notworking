import { FORGET_PASSWORD, GET_ID, LOGIN_DETAILS, SOURCE_LOGIN, THEME } from "./actionType";

const globalState = {
  loginDetails: [],
  loginSource: false,
  otp: "",
  getID: "",
  theme: 'light',
  color:'black',
  bgColor:'white',
}

const reducerFunction = (state = globalState, action) => {
  switch (action.type) {
    case LOGIN_DETAILS:
      return { ...state, loginDetails: action.payload };
    case SOURCE_LOGIN:
      return { ...state, loginSource: action.payload }
    case FORGET_PASSWORD:
      return { ...state, otp: action.payload }
    case GET_ID:
      return { ...state, getID: action.payload }
    case THEME:
      return { ...state, theme: action.payload, color:`${action.payload==='light' ? 'black' : 'white'}`, bgColor:`${action.payload==='light' ? 'white' : '#1d2a35'}` }
    default:
      return state;
  }
};
export default reducerFunction;

