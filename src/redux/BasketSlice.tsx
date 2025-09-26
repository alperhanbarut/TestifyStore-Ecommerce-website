import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ProductType } from "../types/Types";

export interface BasketSliceType {
  basket: ProductType[];
}

const initialState: BasketSliceType = {
  basket: JSON.parse(localStorage.getItem("basket") || "[]"),
};

const BasketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    setBasket: (state, action: PayloadAction<ProductType[]>) => {
      state.basket = [...action.payload];
      localStorage.setItem("basket", JSON.stringify(state.basket));
    },
    addProductToBasket: (state, action: PayloadAction<ProductType>) => {
      const findProduct = state.basket.find(
        (product: ProductType) => product.id === action.payload.id
      );

      if (findProduct) {
        findProduct.count =
          (findProduct.count || 1) + (action.payload.count || 1);
      } else {
        state.basket.push({
          ...action.payload,
          count: action.payload.count || 1,
        });
      }

      localStorage.setItem("basket", JSON.stringify(state.basket));
    },
    incrementProductCount: (state, action: PayloadAction<number>) => {
      const product = state.basket.find((p) => p.id === action.payload);
      if (product) {
        product.count = (product.count || 1) + 1;
      }
      localStorage.setItem("basket", JSON.stringify(state.basket));
    },
    decrementProductCount: (state, action: PayloadAction<number>) => {
      const product = state.basket.find((p) => p.id === action.payload);
      if (product) {
        if ((product.count || 1) > 1) {
          product.count!--;
        } else {
          state.basket = state.basket.filter((p) => p.id !== action.payload);
        }
      }
      localStorage.setItem("basket", JSON.stringify(state.basket));
    },
    removeProductFromBasket: (state, action: PayloadAction<number>) => {
      state.basket = state.basket.filter((p) => p.id !== action.payload);
      localStorage.setItem("basket", JSON.stringify(state.basket));
    },
    clearBasket: (state) => {
      state.basket = [];
      localStorage.removeItem("basket");
    },
  },
});

export const {
  addProductToBasket,
  setBasket,
  incrementProductCount,
  decrementProductCount,
  removeProductFromBasket,
  clearBasket,
} = BasketSlice.actions;

export default BasketSlice.reducer;
