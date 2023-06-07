import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { KeysState } from "./stateTypes";
import { AddPublicKeyPayload } from "../Chat/payloadTypes";

const initialState: KeysState = {
  keys: [],
};

export const keysSlice = createSlice({
  name: "keys",
  initialState,
  reducers: {
    setPublicKey: (state, action: PayloadAction<AddPublicKeyPayload>) => {
      state.keys.push({ id: action.payload.id, key: action.payload.key });
    },
  },
});

// Action creators are generated for each case reducer function
export const { setPublicKey } = keysSlice.actions;

export default keysSlice.reducer;
