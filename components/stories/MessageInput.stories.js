import React from 'react';
import MessageInput from '../molecules/MessageInput';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

export default {
  title: 'components|molecules/MessageInput', // 스토리북에서 보여질 그룹과 경로를 명시
  component: MessageInput, // 어떤 컴포넌트를 문서화 할지 명시,
  decorators: [ withKnobs ]
};

export const messageInput = () => {
    // knobs 만들기
    // const type = text("type", "text")
    // const value = text("value", "기본값")
    // const name = text("name", "name-input")
    return <MessageInput />;
};

messageInput.story = {
    name: 'Default'
};