import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { Message } from "@/Types/Message";
import { MessageState } from "./stateTypes";
import { AddMessagePayload } from "./payloadTypes";

const initialState: MessageState = {
  messages: new Map<string, Map<string, Message[]>>(),
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<AddMessagePayload>) => {
      const { chatId, message } = action.payload;
      if (!current(state.messages).has(chatId)) {
        state.messages.set(chatId, new Map<string, Message[]>());
      }
      let chat = current(state.messages).get(chatId);
      if (!chat?.has(message.date)) {
        chat?.set(message.date, []);
      }
      state.messages.get(chatId)?.get(message.date)?.push(message);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addMessage } = chatSlice.actions;

export default chatSlice.reducer;
