import React from 'react';
import Divider from '../atoms/Divider';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

export default {
  title: 'components|atoms/Divider', // 스토리북에서 보여질 그룹과 경로를 명시
  component: Divider, // 어떤 컴포넌트를 문서화 할지 명시,
  decorators: [ withKnobs ]
};

export const divider = () => {
    // knobs 만들기
    const date = text('date', "2020년 1월 3일");
    return <Divider date={ date } />;
};

divider.story = {
    name: 'Default'
};