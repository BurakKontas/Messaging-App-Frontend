import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "@/Redux/Token/tokenSlice";
import chatReducer from "@/Redux/Chat/chatSlice";
import messagesReducer from "@/Redux/Messages/messagesSlice";
import keysReducer from "@/Redux/Keys/keysSlice";
import encryptReducer from "@/Redux/Encrypter/encryptSlice";

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    token: tokenReducer,
    chat: chatReducer,
    messages: messagesReducer,
    keys: keysReducer,
    encrypt: encryptReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
