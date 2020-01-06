import React from "react";
import ChattingHeader from "../organisms/ChattingHeader";
import { withKnobs, text } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

export default {
  title: "components|organisms/ChattingHeader", // 스토리북에서 보여질 그룹과 경로를 명시
  component: ChattingHeader, // 어떤 컴포넌트를 문서화 할지 명시,
  decorators: [withKnobs]
};

export const chattingHeader = () => {
  // knobs 만들기
  const url = text("url", "http://localhost:3001/images/chatbot_avater.jpg");
  const name = text("title", "잡플래닛 채용봇");
  return <ChattingHeader url={url} name={name} />;
};

chattingHeader.story = {
  name: "Default"
};
