import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const dataOfIngradients = [
  { id: 0, ingradient: "Pepperoni", price: 5 },
  { id: 1, ingradient: "Pickles", price: 2 },
  { id: 2, ingradient: "Cheese", price: 4 },
  { id: 3, ingradient: "Tomato", price: 2 },
  { id: 4, ingradient: "Rukola", price: 2 },
  { id: 5, ingradient: "Sausage", price: 6 },
  { id: 6, ingradient: "Chicken", price: 6 },
  { id: 7, ingradient: "Duck", price: 6 },
  { id: 8, ingradient: "Bacon", price: 6 },
  { id: 9, ingradient: "Ham", price: 6 },
  { id: 10, ingradient: "Mushrooms", price: 3 },
  { id: 11, ingradient: "Tofu", price: 5 },
  { id: 12, ingradient: "Green Onions", price: 2 }
];

const pizzaSizes = [
  { id: 13, pizzaSize: 26, pizzaIndex: 0, price: 15 },
  { id: 14, pizzaSize: 30, pizzaIndex: 1, price: 20 },
  { id: 15, pizzaSize: 40, pizzaIndex: 2, price: 25 }
];

const pizzaTypes = [
  { id: 16, pizzaType: "Classic" },
  { id: 17, pizzaType: "Chicago" }
];

export type IngradientType = {
  id: number;
  ingradient?: string;
  price?: number;
  siza?: number;
  type?: number;
  pizzaType?: string;
  pizzaSize?: number;
  pizzaIndex?: number;
};

export interface CreatePizzaSliceState {
  items: IngradientType[];
  totalPrice: number;
  completedPizza: IngradientType[];
  completedSize: IngradientType[];
  completedType: IngradientType[];
  pizzaSizesArray: IngradientType[];
  pizzaTypesArray: IngradientType[];
  priceForIngradients: number;
  priceForSize: number;
  pizza: any;
}

const initialState: CreatePizzaSliceState = {
  items: dataOfIngradients,
  pizzaSizesArray: pizzaSizes,
  pizzaTypesArray: pizzaTypes,
  completedPizza: [],
  completedSize: [],
  completedType: [],
  totalPrice: 0,
  priceForSize: 0,
  priceForIngradients: 0,
  pizza: []
};

export const createPizzaSlice = createSlice({
  name: "createPizza",
  initialState,
  reducers: {
    setIngradients(state, action: PayloadAction<IngradientType[]>) {
      const newItem = action.payload;
      state.completedPizza = newItem;
      state.pizza = [...state.pizza, state.completedPizza];
      state.priceForIngradients = state.completedPizza.reduce((sum, obj) => {
        return obj.price + sum;
      }, 0);
      state.totalPrice = state.priceForIngradients + state.priceForSize;
    },
    setSize(state, action: PayloadAction<IngradientType>) {
      const newItem = action.payload;
      state.completedSize = [...state.completedSize, newItem].filter(
        (obj) => obj.id === newItem.id
      );
      state.pizza = [...state.pizza, state.completedSize];
      state.priceForSize = state.completedSize.reduce((sum, obj) => {
        return obj.price + sum;
      }, 0);
      state.totalPrice = state.priceForIngradients + state.priceForSize;
    },
    setType(state, action: PayloadAction<IngradientType>) {
      const newItem = action.payload;
      state.completedType = [...state.completedType, newItem].filter(
        (obj) => obj.id === newItem.id
      );
      state.pizza = [...state.pizza, state.completedType];
      state.totalPrice = state.priceForIngradients + state.priceForSize;
      console.log(state.pizza);
    },
    setToStart(state) {
      state.totalPrice = 0;
      state.priceForSize = 0;
      state.priceForIngradients = 0;
    }
  }
});

export const {
  setIngradients,
  setSize,
  setType,
  setToStart
} = createPizzaSlice.actions;
export default createPizzaSlice.reducer;
