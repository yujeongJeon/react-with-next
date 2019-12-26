import React from 'react';
import Input from '../atoms/Input';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

export default {
  title: 'components|atoms/Input', // 스토리북에서 보여질 그룹과 경로를 명시
  component: Input, // 어떤 컴포넌트를 문서화 할지 명시,
  decorators: [ withKnobs ]
};

export const input = () => {
    // knobs 만들기
    const type = text("type", "text")
    const value = text("value", "기본값")
    const name = text("name", "name-input")
    return <Input type={ type } name={ name } value={ value } onChange={ action("onChange") } />;
};

input.story = {
    name: 'Default'
};