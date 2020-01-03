import React from 'react';
import ChattingLoader from '../molecules/ChattingLoader';
import { withKnobs } from '@storybook/addon-knobs';

export default {
  title: 'components|molecules/ChattingLoader', // 스토리북에서 보여질 그룹과 경로를 명시
  component: ChattingLoader, // 어떤 컴포넌트를 문서화 할지 명시,
  decorators: [ withKnobs ]
};

export const chattingLoader = () => {
    return <ChattingLoader />;
};

chattingLoader.story = {
    name: 'Default'
};