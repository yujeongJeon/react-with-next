import React from "react";
import ImageModal from "../templates/ImageModal";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import config from '../../config';

export default {
  title: "components|templates/ImageModal", // 스토리북에서 보여질 그룹과 경로를 명시
  component: ImageModal, // 어떤 컴포넌트를 문서화 할지 명시,
  decorators: [withKnobs]
};

export const imgModal = () => {
  // knobs 만들기
  const isOpen = boolean("isOpen", true);
  const botName = text("botName", "예시 봇")
  const url = text(
    "url",
    `${config.api_server.api_domain}/images/pexels-photo-617278.jpeg`
  );
  return <ImageModal url={url} isOpen={isOpen} toggle={action("toggle")} botName={botName} />;
};

imgModal.story = {
  name: "Default"
};
