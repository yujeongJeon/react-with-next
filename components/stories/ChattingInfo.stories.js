import React from "react";
import ChattingInfo from "../molecules/ChattingInfo";
import { withKnobs, text } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import config from '../../config';

export default {
  title: "components|molecules/ChattingInfo", // 스토리북에서 보여질 그룹과 경로를 명시
  component: ChattingInfo, // 어떤 컴포넌트를 문서화 할지 명시,
  decorators: [withKnobs]
};

export const chattingInfo = () => {
  // knobs 만들기
  const url = text(
    "url",
    `${config.api_server.api_domain}/images/pexels-photo-617278.jpeg`
  );
  const title = text("title", "잡플래닛 채용봇");
  return <ChattingInfo url={url} title={title} />;
};

chattingInfo.story = {
  name: "Default"
};
