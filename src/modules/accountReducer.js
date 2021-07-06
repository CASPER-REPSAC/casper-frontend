import { createAction, handleActions } from "redux-actions";

const DO_LOGIN = "DO_LOGIN";
const DO_LOGOUT = "DO_LOGOUT";

export const doLogin = createAction(DO_LOGIN, (user) => user);
export const doLogout = createAction(DO_LOGOUT);

const initialState = {
  isLogin: false,
  user: null,
};

const accountReducer = handleActions(
  {
    [DO_LOGIN]: (state, { payload: user }) => ({
      ...state,
      isLogin: true,
      user: user,
    }),
    [DO_LOGOUT]: (state, action) => ({
      ...state,
      isLogin: false,
      user: null,
    }),
  },
  initialState
);

export default accountReducer;
