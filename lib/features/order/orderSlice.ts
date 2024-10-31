import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
// import { RootState } from "../../store";

interface OrderItems {
  productId: number;
  quantity: number;
  quantityAmount: number;
}

interface OrderState {
  orderBody: {
    branchId: number | undefined;
    userId: number | undefined;
  };
  orderItemsBody: OrderItems[];
  transactionBody: {
    amountPaid: number | undefined;
    paymentMethod: string | undefined;
    branchId: number | undefined;
  };
}

const initialState = {
  orderBody: {
    branchId: undefined,
    userId: undefined,
  },
  orderItemsBody: [],
  transactionBody: {
    amountPaid: undefined,
    paymentMethod: undefined,
    branchId: undefined,
  },
} satisfies OrderState as OrderState;

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrderItem(state: OrderState, action: PayloadAction<OrderItems>) {
      state.orderItemsBody = [...state.orderItemsBody, action.payload];
    },
  },
});

export const { addOrderItem } = orderSlice.actions;
export default orderSlice.reducer;
