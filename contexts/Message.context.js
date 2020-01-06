import { createContext } from "react";

const MessageContext = createContext({
  messages: [],
  status: "",
  sendMessage: _ => {},
  createMessage: _ => {},
  refreshSession: _ => {}
});

export default MessageContext;
