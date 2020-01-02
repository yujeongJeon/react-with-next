import React from 'react';
import Modal from '../organisms/Modal';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { Image, Button } from '../atoms';

export default {
  title: 'components|organisms/Modal', // 스토리북에서 보여질 그룹과 경로를 명시
  component: Modal, // 어떤 컴포넌트를 문서화 할지 명시,
  decorators: [ withKnobs ]
};

export const modal = () => {
    // knobs 만들기
    const header = <>이미지 보기</>;
    const content = <Image src="http://localhost:3001/images/pexels-photo-617278.jpeg" />;
    const footer = <Button>버튼</Button>;
    const isOpen = boolean('isOpen', true);
    const top= text('top', '30%')
    return <Modal header={ header } content={ content } footer={ footer } isOpen={ isOpen } top={ top } toggle={ action('toggle') } />;
};

modal.story = {
    name: 'Default'
};