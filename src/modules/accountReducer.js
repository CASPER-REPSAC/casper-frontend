import { createAction, handleActions } from "redux-actions";

const DO_LOGIN = "DO_LOGIN";
const DO_LOGOUT = "DO_LOGOUT";

export const doLogin = createAction(DO_LOGIN);
export const doLogout = createAction(DO_LOGOUT);

const initialState = {
  isLogin: false,
};

const accountReducer = handleActions(
  {
    [DO_LOGIN]: (state, action) => ({
      ...state,
      isLogin: true,
    }),
    [DO_LOGOUT]: (state, action) => ({
      ...state,
      isLogin: false,
    }),
  },
  initialState
);

export default accountReducer;
