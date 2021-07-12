import { createAction, handleActions } from "redux-actions";

const DO_LOGIN = "account/DO_LOGIN";
const DO_LOGOUT = "account/DO_LOGOUT";

export const doLogin = createAction(
  DO_LOGIN,
  (user_with_token) => user_with_token
);
export const doLogout = createAction(DO_LOGOUT);

const initialState = {
  isLogin: false,
  user: null,
  access_token: null,
};

const accountReducer = handleActions(
  {
    [DO_LOGIN]: (state, { payload: user_with_token }) => ({
      ...state,
      isLogin: true,
      user: user_with_token.user,
      access_token: user_with_token.access_token,
    }),
    [DO_LOGOUT]: (state) => ({
      ...state,
      isLogin: false,
      user: null,
      access_token: null,
    }),
  },
  initialState
);

export default accountReducer;
