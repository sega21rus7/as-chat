import { jsonFetch, textFetch } from "tools";
import { ThunkType } from "./types";
import actionCreators from "./actionCreators";
import { message } from "antd";
import { IUser } from "tools/interfaces";

export const changePassword = (oldPassword: string, password: string, repeatPassword: string): ThunkType => {
  return async dispatch => {
    try {
      dispatch(actionCreators.changePasswordStart());
      const res = await textFetch("/api/profile/change_password", {
        oldPassword, password, repeatPassword,
      });
      dispatch(actionCreators.changePasswordSuccess());
      message.success(res);
    } catch (err) {
      message.error(err.message || err);
      dispatch(actionCreators.changePasswordFail(err.message || err));
    }
  };
};

export const fetchUser = (): ThunkType => {
  return async dispatch => {
    try {
      dispatch(actionCreators.fetchUserStart());
      const { user } = await jsonFetch<IUser>("/api/auth/getUser");
      dispatch(actionCreators.fetchUserSuccess(user));
    } catch (err) {
      message.error(err.message || err);
      dispatch(actionCreators.fetchUserFail(err.message || err));
    }
  };
};

export const login = (login: string, password: string): ThunkType => {
  return async dispatch => {
    try {
      dispatch(actionCreators.startAuth());
      const { user } = await jsonFetch<IUser>("/api/auth/login", {
        login, password,
      });
      dispatch(actionCreators.loginSuccess(user));
    } catch (err) {
      message.error(err.message || err);
      dispatch(actionCreators.failAuth(err.message || err));
    }
  };
};

export const register =
  (login: string, email: string, password: string, repeatPassword: string): ThunkType => {
    return async dispatch => {
      try {
        dispatch(actionCreators.startAuth());
        const { user } = await jsonFetch<IUser>("/api/auth/register", {
          login, email, password, repeatPassword,
        });
        dispatch(actionCreators.regSuccess(user));
      } catch (err) {
        message.error(err.message || err);
        dispatch(actionCreators.failAuth(err.message || err));
      }
    };
  };