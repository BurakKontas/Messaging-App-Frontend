import { Message } from "@/Types/Message";

export type MessageState = {
  messages: Map<string, Map<string, Message[]>>;
};
