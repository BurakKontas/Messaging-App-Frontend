export type Message = {
  text: string;
  createdAt: string;
  user: string;
  type: "from" | "to";
  date: string;
};
