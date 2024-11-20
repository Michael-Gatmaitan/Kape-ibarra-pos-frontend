import { configureStore } from "@reduxjs/toolkit";
// import ProductReducer from "./features/product/productSlice";
import OrderReducer from "./features/order/orderSlice";
import AuthReducer from "./features/auth/authSlice";
import StateReducer from "./features/state/stateSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      orderReducer: OrderReducer,
      authReducer: AuthReducer,
      stateReducer: StateReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types of store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
