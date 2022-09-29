import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

type FetchPizzasArgs = {
  page: number;
  sort: string;
  category: number;
  searchValue: string;
};

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async (params: FetchPizzasArgs) => {
    const { page, sort, category, searchValue } = params;
    if (searchValue) {
      const { data } = await axios.get<PizzaItem[]>(
        `https://62b38848a36f3a973d239308.mockapi.io/pizzas?sortBy=${sort}&title=${searchValue}`
      );
      return data;
    } else {
      const { data } = await axios.get<PizzaItem[]>(
        `https://62b38848a36f3a973d239308.mockapi.io/pizzas?page=${page}&limit=4&sortBy=${sort}&order=desc&category=${category}`
      );
      return data;
    }
  }
);

type PizzaItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  types: number[];
  sizes: number[];
  count: number;
  rating: number;
  description: string;
};

export interface PizzaSliceState {
  items: PizzaItem[];
  isLoading: boolean;
  status: "loading" | "success" | "error" | string | null;
}

const initialState: PizzaSliceState = {
  items: [],
  isLoading: false,
  status: "loading"
};

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<PizzaItem[]>) {
      state.items = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.isLoading = true;
      state.status = "loading";
      state.items = [];
    });
    builder.addCase(
      fetchPizzas.fulfilled,
      (state, action: PayloadAction<PizzaItem[]>) => {
        state.isLoading = false;
        state.items = action.payload;
        state.status = "success";
      }
    );
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.isLoading = false;
      state.items = [];
      state.status = "error";
    });
  }
});

export const selectPizza = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
