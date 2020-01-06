import React from "react";
import ModalHeader from "../molecules/Modal/ModalHeader";
import { withKnobs, text } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

export default {
  title: "components|molecules/ModalHeader", // 스토리북에서 보여질 그룹과 경로를 명시
  component: ModalHeader, // 어떤 컴포넌트를 문서화 할지 명시,
  decorators: [withKnobs]
};

export const modalHeader = () => {
  // knobs 만들기
  const title = text("title", "모달 제목");
  return <ModalHeader toggle={action("toggle")}>{title}</ModalHeader>;
};

modalHeader.story = {
  name: "Default"
};
