import React from "react";
import ModalContent from "../molecules/Modal/ModalContent";
import { withKnobs } from "@storybook/addon-knobs";
import { Image } from "../atoms";
import config from '../../config';

export default {
  title: "components|molecules/ModalContent", // 스토리북에서 보여질 그룹과 경로를 명시
  component: ModalContent, // 어떤 컴포넌트를 문서화 할지 명시,
  decorators: [withKnobs]
};

export const modalContent = () => {
  return (
    <ModalContent>
      <Image src={ `${config.api_server.api_domain}/images/pexels-photo-617278.jpeg` } />
    </ModalContent>
  );
};

modalContent.story = {
  name: "Default"
};
