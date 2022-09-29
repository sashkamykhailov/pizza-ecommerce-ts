import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import cartSlice from "./Slices/cartSlice";
import filterSlice from "./Slices/filterSlice";
import pizzaSlice from "./Slices/pizzaSlice";
import createPizzaSlice from "./Slices/createPizzaSlice";

export const store = configureStore({
  reducer: {
    filter: filterSlice,
    cart: cartSlice,
    pizza: pizzaSlice,
    createPizza: createPizzaSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
