import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EncryptState } from "./stateTypes";
import { Encrypter } from "@/Helpers/encrypt";
import { EncryptPayload } from "./payloadTypes";

const initialState: EncryptState = {
  encypter: undefined,
};

export const encryptSlice = createSlice({
  name: "encrypt",
  initialState,
  reducers: {
    setEncrypter: (state, action: PayloadAction<string>) => {
      state.encypter = new Encrypter(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setEncrypter } = encryptSlice.actions;

export default encryptSlice.reducer;
