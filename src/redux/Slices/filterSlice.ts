import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface FilterSliceState {
  category: number;
  sort: string;
  page: number;
}

const initialState: FilterSliceState = {
  category: 0,
  sort: "price",
  page: 1
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    choseCategory: (state, action: PayloadAction<number>) => {
      state.category = action.payload;
    },
    choseSort: (state, action: PayloadAction<string>) => {
      state.sort = action.payload;
    },
    chosePage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    }
  }
});

export const selectFilter = (state: RootState) => state.filter;

export const { choseCategory, choseSort, chosePage } = filterSlice.actions;
export default filterSlice.reducer;
