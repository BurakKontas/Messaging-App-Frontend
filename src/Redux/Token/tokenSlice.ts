import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TokenState } from "./stateTypes";
import { Bearer } from "@/Types/Bearer";

const initialState: TokenState = {
  token: undefined,
};

export const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<Bearer>) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = undefined;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setToken, clearToken } = tokenSlice.actions;

export default tokenSlice.reducer;
