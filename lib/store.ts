import { configureStore } from "@reduxjs/toolkit";
// import ProductReducer from "./features/product/productSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      // productReducer: ProductReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types of store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
