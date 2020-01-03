import React from 'react';
import Loader from '../atoms/Loader';
import { withKnobs } from '@storybook/addon-knobs';

export default {
  title: 'components|atoms/Loader', // 스토리북에서 보여질 그룹과 경로를 명시
  component: Loader, // 어떤 컴포넌트를 문서화 할지 명시,
  decorators: [ withKnobs ]
};

export const loader = () => {
    return <Loader />;
};

loader.story = {
    name: 'Default'
};