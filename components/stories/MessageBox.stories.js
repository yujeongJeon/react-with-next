import React from "react";
import MessageBox from "../molecules/MessageBox";
import { withKnobs, text, object, array } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import config from '../../config';

export default {
  title: "components|molecules/MessageBox",
  component: MessageBox,
  decorators: [withKnobs]
};

const isIE = /*@cc_on!@*/ false || !!document.documentMode;
const timeStampReady = (ie, n) =>
  ie
    ? new Date().toLocaleTimeString("ko-KR").replace(/\u200E/g, "")
    : new Date().toLocaleTimeString("ko-KR", { timeZone: "Asia/Seoul" });
const timestamp = timeStampReady(isIE);

export const TextMessage = () => {
  const type = text("type", "text");
  const contents = text(
    "contents",
    "텍스트 채팅 예시입니다.\n뭔가 길게 적어야 할 거 같은데 뭐라고 해야할지 모르겠습니다 ^_^;;;"
  );
  const dateTime = text("dateTime", timestamp);
  return (
    <MessageBox
      type={type}
      contents={contents}
      dateTime={dateTime}
      btnOnClick={action("btnOnClick")}
    />
  );
};

TextMessage.story = {
  name: "TextMessage"
};

export const ImageMessage = () => {
  const type = text("type", "image");
  const contents = text(
    "contents",
    `${config.api_server.api_domain}/images/pexels-photo-617278.jpeg`
  );
  const dateTime = text("dateTime", timestamp);
  return (
    <MessageBox
      type={type}
      contents={contents}
      dateTime={dateTime}
      btnOnClick={action("btnOnClick")}
      imgOnClick={action("imgOnClick")}
    />
  );
};

ImageMessage.story = {
  name: "ImageMessage"
};

export const CardMessage = () => {
  const type = text("type", "card");
  const contents = object("contents", {
    url: `${config.api_server.api_domain}/images/pexels-photo-617278.jpeg`,
    title: "고양이는 최고야",
    text:
      "고먐미는 늘 최고야\n청아 단아 누나랑 오래오래 건강하게 살자!!!!!\n많이 사랑해\np.s. 사료 좀 잘 먹어줘...간식만 달라고 애교부리지 말고 -_-"
  });
  const dateTime = text("dateTime", timestamp);
  return (
    <MessageBox
      type={type}
      contents={contents}
      dateTime={dateTime}
      btnOnClick={action("btnOnClick")}
      imgOnClick={action("imgOnClick")}
    />
  );
};

CardMessage.story = {
  name: "CardMessage"
};

export const MessageWithButtons = () => {
  const type = text("type", "card");
  const contents = object("contents", {
    url: `${config.api_server.api_domain}/images/pexels-photo-617278.jpeg`,
    title: "고양이는 최고야",
    text:
      "고먐미는 늘 최고야\n청아 단아 누나랑 오래오래 건강하게 살자!!!!!\n많이 사랑해\np.s. 사료 좀 잘 먹어줘...간식만 달라고 애교부리지 말고 -_-"
  });
  const dateTime = text("dateTime", timestamp);
  const buttons = array("buttons", [
    { name: "버튼 1" },
    { name: "버튼 2" },
    { name: "버튼 3" }
  ]);

  return (
    <MessageBox
      type={type}
      contents={contents}
      dateTime={dateTime}
      buttons={buttons}
      btnOnClick={action("btnOnClick")}
      imgOnClick={action("imgOnClick")}
    />
  );
};

MessageWithButtons.story = {
  name: "MessageWithButtons"
};
