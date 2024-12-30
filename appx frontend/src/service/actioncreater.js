import axios from "axios";
import {
  FORGET_PASSWORD,
  GET_ID,
  LOGIN_DETAILS,
  SOURCE_LOGIN,
  THEME,
} from "./actionType";

export const tokenData = (data) => {
  console.log("data", data);
  return { type: LOGIN_DETAILS, payload: data };
};

export const loginSource = (data) => {
  return { type: SOURCE_LOGIN, payload: data };
};

export const getRegisterDetails = (data) => async (dispatch) => {
//   let result;
  try {
    const response = await axios.patch(
      `http://${process.env.REACT_APP_NODE_BASE_URL}:4000/admin/forgetPassword`,{
        email:data
      }
    );
    console.log("response", response);
    // const whoIsLogin = response.data.find((user, index) => user.email === data);
    // result = whoIsLogin._id;
    // if (whoIsLogin) {
    //   dispatch(forgetPassword(whoIsLogin._id));
    // } else {
    //   dispatch(forgetPassword("1234"));
    // }
  } catch (error) {
    console.log(error);
  }
//   return result;
};

// export const forgetPassword = (data) => (dispatch) => {
//   axios({
//     url: `http://${process.env.REACT_APP_NODE_BASE_URL}:4000/admin/login/${data}`,
//     method: "patch",
//   })
//     .then((response) => {
//       dispatch({
//         type: FORGET_PASSWORD,
//         payload: response.data.data.result.forgetPassword,
//       });
//     })
//     .catch((error) => {
//       console.log("error: ", error);
//     });
// };

export const resetPassword = (data) => async (dispatch) => {
  try {
    const response = await axios({
      url: `http://${process.env.REACT_APP_NODE_BASE_URL}:4000/admin/login/resetPassword/${data.id}`,
      method: "patch",
      data: {
        password: data.newPassword,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getId = (data) => {
  return { type: GET_ID, payload: data };
};

export const theme = (data) => {
  return { type: THEME, payload: data };
};
