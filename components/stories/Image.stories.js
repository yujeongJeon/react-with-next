import React from "react";
import { Image } from "../atoms";
import { withKnobs, text } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import config from '../../config';

export default {
  title: "components|atoms/Image", // 스토리북에서 보여질 그룹과 경로를 명시
  component: Image, // 어떤 컴포넌트를 문서화 할지 명시,
  decorators: [withKnobs]
};

export const image = () => {
  // knobs 만들기
  const src = text(
    "src",
    `${config.api_server.api_domain}/images/pexels-photo-617278.jpeg`
  );
  const width = text("width", "250px");
  const height = text("height", "100%");
  return <Image src={src} width={width} height={height} />;
};

image.story = {
  name: "Default"
};
