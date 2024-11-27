// import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";
// import { RootState } from "../../store";
// import { ICustomer, IEmployee } from "../../..";

// interface AuthState {
//   isLoggedIn: boolean;
//   person: IEmployee | ICustomer;
//   roleName: string;
// }

// const initialState = {
//   isLoggedIn: false,
//   person: {
//     id: null,
//     cpNum: null,
//     firstname: null,
//     lastname: null,
//     username: null,
//     password: null,
//     roleId: null,
//   },
//   roleName: "",
// } satisfies AuthState as AuthState;

// const authSlice = createSlice({
//   name: "order",
//   initialState,
//   reducers: {
//     setLoggedIn(state: AuthState, action: PayloadAction<boolean>) {
//       state.isLoggedIn = action.payload;
//     },
//     setUserData(
//       state: AuthState,
//       action: PayloadAction<{ person: IEmployee | ICustomer; roleName: string }>
//     ) {
//       state.person = action.payload.person;
//       state.roleName = action.payload.roleName;
//     },
//   },
// });

// export const selectIsLoggedIn = (state: RootState) =>
//   state.authReducer.isLoggedIn;
// export const selectUserData = (state: RootState) => {
//   return {
//     person: state.authReducer.person,
//     roleName: state.authReducer.roleName,
//   };
// };

// export const { setLoggedIn, setUserData } = authSlice.actions;

// export default authSlice.reducer;
