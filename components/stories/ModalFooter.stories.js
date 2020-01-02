import React from 'react';
import ModalFooter from '../molecules/Modal/ModalFooter';
import { withKnobs, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { Button } from '../atoms';

export default {
  title: 'components|molecules/ModalFooter', // 스토리북에서 보여질 그룹과 경로를 명시
  component: ModalFooter, // 어떤 컴포넌트를 문서화 할지 명시,
  decorators: [ withKnobs ]
};

export const modalFooter = () => {
    return <ModalFooter><Button>버튼</Button></ModalFooter>;
};

modalFooter.story = {
    name: 'Default'
};