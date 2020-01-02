import React from 'react';
import { withKnobs, text, array } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import ChattingLayout from '../templates/ChattingLayout';

export default {
  title: 'components|templates/ChattingLayout', // 스토리북에서 보여질 그룹과 경로를 명시
  component: ChattingLayout, // 어떤 컴포넌트를 문서화 할지 명시,
  decorators: [ withKnobs ]
};

const isIE = /*@cc_on!@*/false || !!document.documentMode;
const timeStampReady = ((ie, n) => ie
    ? new Date().toLocaleTimeString('ko-KR').replace(/\u200E/g, '')
    : new Date().toLocaleTimeString('ko-KR', { timeZone: 'Asia/Seoul' }));
const timestamp = timeStampReady(isIE);
const dateTime = text("dateTime", timestamp);

export const chattingLayout = () => {
    // knobs 만들기
    const botImageUrl = text('botImageUrl', "http://localhost:3001/images/chatbot_avater.jpg");
    const botName = text('botName', '잡플래닛 채용봇');
    const messages = array("messages", [
        { type: "text", contents: "반갑습니다!\n잡플래닛 기업 채용 소식통 챗봇입니다 :)\n상반기 취뽀 모두 힘내세요!!!", dateTime: dateTime, isMe: false },
        { type: "text", contents: "안녕", dateTime: dateTime, isMe: true },
        { type: "text", contents: "안녕하세요!\n상반기 취뽀, 이직을 도와드릴 잡플래닛 기업 채용 소식통 챗봇입니다", dateTime: dateTime, isMe: false },
        { type: "text", contents: "상반기 채용 알려줘", dateTime: dateTime, isMe: true },
        { type: "image", contents: "http://localhost:3001/images/pexels-photo-617278.jpeg", dateTime: dateTime, isMe: false }
    ]);

    return <ChattingLayout 
    botImageUrl={ botImageUrl }
    botName={ botName }
    messages={ messages } />;
};

chattingLayout.story = {
    name: 'Default'
};