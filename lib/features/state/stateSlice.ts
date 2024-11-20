import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface IState {
  showOrderSection: boolean;
}

const initialState = {
  showOrderSection: false,
} satisfies IState as IState;

const authSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    toggleShowOrderSection(state: IState, action: PayloadAction<boolean>) {
      state.showOrderSection = action.payload;
    },
  },
});

export const selectShowOrderSection = (state: RootState) =>
  state.stateReducer.showOrderSection;

export const { toggleShowOrderSection } = authSlice.actions;

export default authSlice.reducer;
