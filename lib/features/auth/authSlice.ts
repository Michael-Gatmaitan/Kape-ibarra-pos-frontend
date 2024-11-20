import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { IUser } from "../../..";

interface AuthState {
  isLoggedIn: boolean;
  user: IUser;
  roleName: string;
}

const initialState = {
  isLoggedIn: false,
  user: {
    id: null,
    cpNum: null,
    firstname: null,
    lastname: null,
    username: null,
    password: null,
    roleId: null,
  },
  roleName: "",
} satisfies AuthState as AuthState;

const authSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setLoggedIn(state: AuthState, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
    },
    setUserData(
      state: AuthState,
      action: PayloadAction<{ user: IUser; roleName: string }>
    ) {
      state.user = action.payload.user;
      state.roleName = action.payload.roleName;
    },
  },
});

export const selectIsLoggedIn = (state: RootState) =>
  state.authReducer.isLoggedIn;
export const selectUserData = (state: RootState) => {
  return {
    user: state.authReducer.user,
    roleName: state.authReducer.roleName,
  };
};

export const { setLoggedIn, setUserData } = authSlice.actions;

export default authSlice.reducer;
