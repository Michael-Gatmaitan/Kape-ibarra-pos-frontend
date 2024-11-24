import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
// import { RootState } from "../../store";

export interface OrderItems {
  productId: string;
  quantity: number;
  quantityAmount: number;
  categoryName: string;
  imagePath: string;
  productName: string;
  price: number;
}

interface OrderState {
  orderBody: {
    userId: string;
    orderStatus: "" | "preparing" | "payment_pending" | "rejected";
    orderType: "walk-in" | "online";
    customerId?: string;
  };

  totalAmount: number;
  totalTendered: number;
  change: number;

  orderItemsBody: {
    [key: string]: OrderItems;
  };
}

interface OrderItemPayload {
  productId: string;
  categoryName: string;
  imagePath: string;
  productName: string;
  price: number;
}

interface OrderItemQuantityPayload {
  productId: string;
  type: "inc" | "dec";
}

const initialState = {
  orderBody: {
    userId: null,
    orderStatus: null,
    orderType: null,
  },

  totalAmount: 0,
  totalTendered: 0,
  change: 0,

  orderItemsBody: {},
} satisfies OrderState as OrderState;

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    handleOrderItem(
      state: OrderState,
      action: PayloadAction<OrderItemPayload>
    ) {
      const { productId, price } = action.payload;
      const orderItem: OrderItems | null = state.orderItemsBody[productId];

      if (!orderItem) {
        state.orderItemsBody[productId] = {
          quantity: 1,
          quantityAmount: 1 * price,
          ...action.payload,
        };

        state.totalAmount += price;
      } else {
        delete state.orderItemsBody[productId];
        console.log("Order item removed successfully");
        state.totalAmount -= price;
      }
    },
    handleOrderItemQuantity(
      state: OrderState,
      action: PayloadAction<OrderItemQuantityPayload>
    ) {
      const { productId, type } = action.payload;

      if (type === "inc") {
        state.orderItemsBody[productId].quantity += 1;
        state.totalAmount += state.orderItemsBody[productId].price;
      } else {
        state.orderItemsBody[productId].quantity -= 1;
        state.totalAmount -= state.orderItemsBody[productId].price;
      }

      const { price, quantity } = state.orderItemsBody[productId];
      state.orderItemsBody[productId].quantityAmount = price * quantity;
    },
    setQuantityAmount(state: OrderState) {
      Object.keys(state.orderItemsBody).map((productId) => {
        const { price, quantity } = state.orderItemsBody[productId];
        state.orderItemsBody[productId].quantityAmount = price * quantity;
      });
    },
    clearOrderItems(state: OrderState) {
      state.orderBody.orderStatus = null;
      state.orderBody.orderType = null;
      state.orderBody.userId = null;

      state.orderItemsBody = {};
      state.totalAmount = 0;
      state.totalTendered = 0;
      state.change = 0;
    },
    setTotalTendered(state: OrderState, action: PayloadAction<number>) {
      state.totalTendered = action.payload;
    },
    deleteOrderItem(
      state: OrderState,
      action: PayloadAction<{ productId: string }>
    ) {
      const { productId } = action.payload;
      state.totalAmount -= state.orderItemsBody[productId].quantityAmount;
      delete state.orderItemsBody[productId];
    },

    setCustomerId(state: OrderState, action: PayloadAction<string>) {
      state.orderBody.customerId = action.payload;
    },
  },
});

export const selectOrderItemsBody = (state: RootState) =>
  state.orderReducer.orderItemsBody;

export const selectTotalAmount = (state: RootState) =>
  state.orderReducer.totalAmount;

export const selectTotalTendered = (state: RootState) =>
  state.orderReducer.totalTendered;

export const {
  handleOrderItem,
  handleOrderItemQuantity,
  setQuantityAmount,
  clearOrderItems,
  setTotalTendered,
  deleteOrderItem,
  setCustomerId,
} = orderSlice.actions;

export default orderSlice.reducer;
