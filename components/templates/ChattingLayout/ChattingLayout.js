import styles from './ChattingLayout.module.scss';

import classNames from 'classnames/bind';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { ChattingHeader, MessageList } from '../../organisms';
import { MessageInput } from '../../molecules';

const cx = classNames.bind(styles);

const ChattingLayout = ({
    botImageUrl,
    botName,
    messages,
    setMessages
}) => {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState({});
    const [status, setStatus] = useState("DONE");

    const timeStampReady = curry((ie, n) => ie
    ? new Date().toLocaleTimeString('ko-KR').replace(/\u200E/g, '')
    : new Date().toLocaleTimeString('ko-KR', { timeZone: 'Asia/Seoul' }));

    useEffect(_ => {
        setMessages([ ...messages, output ]);
        setStatus("DONE");
    }, [output]);

    const onChange = ({ target: { value } }) => setInput(value);

    const readyForRequest = _ => {
        if (isEmpty(input)) return null;
        const isIE = /*@cc_on!@*/false || !!document.documentMode;
        const dateTime = timeStampReady(isIE, true);

        const requestMessage = { type: "text", contents: input, dateTime: dateTime, isMe: true };

        setInput("");
        setMessages([...messages, requestMessage]);
        setStatus("DOING");

        sendMessage(requestMessage.contents);
    }

    const sendMessage = async (content) => {
        const { data } = await axios.post(
            'http://localhost:3001/api/example', 
            {
                user_key: "newjeong_2019-12-26-02",
                content: content
            }
        );
        
        const parseMessage = msg => {
            const isIE = /*@cc_on!@*/false || !!document.documentMode;
            const dateTime = timeStampReady(isIE, true);
            let result = { dateTime: dateTime };
            for (const type of msg.contentType) {
                switch (type) {
                    case "textRandom":
                    case "sessionTimeOut":
                        result.type = "text";
                        result.contents = first(msg.responseText);
                        break;
                    case "image":
                        result.type = "image";
                        result.contents = msg.imageUrl;
                    case "card":
                        result.type = "card";
                        result.contents = {
                            url: msg.imageUrl,
                            title: msg.responseTitle,
                            text: first(msg.responseText)
                        }
                    case "button":
                        result.buttons = msg.responseButtons;
                }
            }
            return result;
        }

        const responseMessage = parseMessage(data.data);
        setOutput(responseMessage);
    }

    const onKeyPress = e => {
        if (e.charCode === 13) {
            e.preventDefault();
            readyForRequest();
        } 
    }

    const sendBtnResponse = btn => {
        const isIE = /*@cc_on!@*/false || !!document.documentMode;
        const dateTime = timeStampReady(isIE, true);
        const requestMessage = { type: "text", contents: btn.name, dateTime: dateTime, isMe: true };
        setMessages([...messages, requestMessage]);
        setStatus("DOING");

        sendMessage(btn);
    }

    const clickBtn = btn => {
        switch (btn.type) {
            case "webLink":
                window.open(btn.webLinkUrl);
                return;
            case "appLink":
                window.open(btn.appLinkUrl);
                return;
            case "blockLink":
                sendBtnResponse(btn);
                return;
        }
    }

    return <div className={cx('wrapper')}>
        <ChattingHeader 
        url={ botImageUrl } 
        name={ botName } />
        <div className={ cx('messages-section') }>
            <MessageList 
            messages={ messages }
            status={ status }
            btnOnClick={ clickBtn } />
        </div>
        <div className={ cx('input-section') }>
            <MessageInput 
            message={ input } 
            onChange={ onChange } 
            onKeyPress={ onKeyPress } 
            onClick={ readyForRequest } />
        </div>
    </div>
}

export default ChattingLayout;