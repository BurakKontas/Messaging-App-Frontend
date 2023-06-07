import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatState } from "./stateTypes";

const initialState: ChatState = {
  id: undefined,
  name: undefined,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChat: (state, action: PayloadAction<{id:string, name:string}>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setChat } = chatSlice.actions;

export default chatSlice.reducer;
