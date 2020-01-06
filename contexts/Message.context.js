import { createContext } from "react";

const MessageContext = createContext({
  messages: [],
  status: "",
  sendMessage: _ => {},
  createMessage: _ => {}
});

export default MessageContext;
