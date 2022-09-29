import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Store } from "react-notifications-component";

export type CartItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: number | string;
  size: number;
  count: number;
  rating?: number | string;
  description?: string;
};

export interface CartSliceState {
  totalPrice: number;
  totalAmount: number;
  items: CartItem[];
}

const initialState: CartSliceState = {
  totalPrice: 0,
  totalAmount: 0,
  items: []
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.size === action.payload.size &&
          obj.type === action.payload.type
      );

      if (findItem) {
        findItem.count++;
      } else if (state.items.length === 0) {
        const tempo = action.payload;
        state.items.push({
          ...tempo,
          count: 1
        });
      } else {
        const tempo = action.payload;
        if (tempo.size !== 0) {
          tempo.price = tempo.price + 10;
        }
        tempo.id = Date.now().toFixed(5).toString();
        state.items.push({
          ...tempo,
          count: 1
        });
      }

      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
      state.totalAmount = state.items.reduce((sum, obj) => {
        return obj.count + sum;
      }, 0);
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
      state.totalAmount = state.items.reduce((sum, obj) => {
        return obj.count + sum;
      }, 0);
    },
    clearItems(state) {
      state.items = [];
      state.totalAmount = 0;
      state.totalPrice = 0;
    },
    increaseAmount(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      }
    },
    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count--;
        if (findItem.count === 0) {
          state.items = state.items.filter((obj) => obj.id !== findItem.id);
          Store.addNotification({
            title: "Wonderful!",
            message: `"${findItem.title}" has been removed`,
            type: "info",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 1500,
              onScreen: true
            }
          });
        }
        state.totalPrice = state.items.reduce((sum, obj) => {
          return obj.price * obj.count + sum;
        }, 0);
        state.totalAmount = state.items.reduce((sum, obj) => {
          return obj.count + sum;
        }, 0);
      }
    }
  }
});

// selectors
export const selectCart = (state: RootState) => state.cart;

export const {
  addItemToCart,
  removeItem,
  clearItems,
  minusItem,
  increaseAmount
} = cartSlice.actions;
export default cartSlice.reducer;
