import { Message } from "@/Types/Message";

export type AddMessagePayload = {
  chatId: string;
  message: Message;
};
