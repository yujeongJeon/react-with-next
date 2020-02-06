import { ChattingLayout } from "../components/templates";
import axios from "axios";
import { useEffect, useContext } from "react";

import MessageContext from "../contexts/Message.context";
import messageApi from "../public/scripts/message";

const Index = ({ 
  name, 
  imageUrl, 
  apiKey, 
  colorSet,
  btnImageUrl }) => {
  const { messages, sendMessage } = useContext(MessageContext);

  if (!apiKey)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          margin: "10px 0"
        }}>
        봇 정보가 잘못되었습니다.
      </div>
    );

  useEffect(_ => {
    sendMessage();
    messageApi.init(colorSet.talkPop, colorSet.talkPopText, colorSet.talkPopBorder, colorSet.talkPopBorderRadius, btnImageUrl);

    const colorKeys = Object.keys(colorSet);

    for (const key of colorKeys) {
      document.body.style.setProperty(`--${key}`, colorSet[key]);
    }
  }, []);

  return (
    <ChattingLayout botImageUrl={imageUrl} botName={name} messages={messages} />
  );
};

Index.getInitialProps = async ({ query }) => {
  const defaultImage = "/assets/leaflo-chatbot.png";
  const { apiKey, userId, accessKey, accessSecret } = query;

  if (
    isEmpty(apiKey) ||
    isEmpty(accessKey) ||
    isEmpty(accessSecret) ||
    isEmpty(userId)
  )
    return {};

  const { data: botData } = await axios.post(`${API_DOMAIN}/api/init`, {
    apiKey: apiKey,
    accessKey: accessKey,
    accessSecret: accessSecret
  });

  /**
   * TODO webchat Color Set Setting
   */

  switch (botData.code) {
    case "1000":
      return {
        name: botData.data.botName,
        imageUrl: botData.data.botImageUrl || defaultImage,
        apiKey: apiKey,
        colorSet: botData.data.webChatColorSet,
        btnImageUrl: botData.data.webChatBtnImage || null
      };
    case "9000":
    case "9001":
    default:
      return {
        name: "ERROR",
        imageUrl: defaultImage,
        apiKey: apiKey,
        colorSet: {},
        btnImageUrl: null
      };
  }
};

export default Index;
