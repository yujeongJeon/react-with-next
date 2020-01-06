import React from "react";
import Button from "../atoms/Button";
import { withKnobs, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

export default {
  title: "components|atoms/Button", // 스토리북에서 보여질 그룹과 경로를 명시
  component: Button, // 어떤 컴포넌트를 문서화 할지 명시,
  decorators: [withKnobs]
};

export const button = () => {
  // knobs 만들기
  const disabled = boolean("disabled", false);
  return (
    <Button disabled={disabled} onClick={action("onClick")}>
      입력
    </Button>
  );
};

button.story = {
  name: "Default"
};
