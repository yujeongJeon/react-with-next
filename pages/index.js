import { ChattingLayout } from "../components/templates";
import axios from "axios";
import { useEffect, useContext } from "react";

import { useRouter } from "next/router";
import MessageContext from "../contexts/Message.context";
import messageApi from '../public/scripts/message';

const Index = ({ name, imageUrl }) => {
  const router = useRouter();

  const { messages, sendMessage } = useContext(MessageContext);

  const invalidURL = _ => {
    const { apiKey, userId, accessKey, accessSecret } = router.query;
    
    return (
      isEmpty(apiKey) ||
      isEmpty(accessKey) ||
      isEmpty(accessSecret) ||
      isEmpty(userId)
    );
  };

  if (invalidURL())
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
    messageApi.init();
  }, []);

  return (
    <ChattingLayout botImageUrl={imageUrl} botName={name} messages={messages} />
  );
};

Index.getInitialProps = async ({ query }) => {
  // query로 apiKey, accessKey, accessSecret, userId 넘겨줘야 함
  const defaultImage = "/assets/leaflo-chatbot.png";
  const { apiKey, userId, accessKey, accessSecret } = query;

  const { data: botData } = await axios.post(`${API_DOMAIN}/api/init`, {
    apiKey: apiKey,
    accessKey: accessKey,
    accessSecret: accessSecret
  });

  switch (botData.code) {
    case "1000":
      return {
        name: botData.data.botName,
        imageUrl: botData.data.botImageUrl || defaultImage
      };
    case "9000":
    case "9001":
    default:
      return {
        name: "ERROR",
        imageUrl: defaultImage
      };
  }
};

export default Index;
