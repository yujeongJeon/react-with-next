import { useState } from "react";
import MessageContext from '../../contexts/Message.context';
import { useRouter } from "next/router";
import axios from 'axios';

const MessageProvider = ({ children }) => {
    const router = useRouter();
    const { apiKey, userId, accessKey, accessSecret } = router.query;

    const createMessage = msg => {
        const isIE = /*@cc_on!@*/false || !!document.documentMode;
        const timeStampReady = curry((ie, n) => ie
            ? new Date().toLocaleTimeString('ko-KR').replace(/\u200E/g, '')
            : new Date().toLocaleTimeString('ko-KR', { timeZone: 'Asia/Seoul' }));
        const timestamp = timeStampReady(isIE);

        let newMessage = { dateTime: timestamp(true) };

        if (msg.isMe) newMessage.isMe = true;

        for (const type of msg.contentType) {
            switch (type) {
                case "textRandom":
                case "sessionTimeOut":
                    newMessage.type = "text";
                    newMessage.contents = first(msg.responseText);
                    break;
                case "image":
                    newMessage.type = "image";
                    newMessage.contents = msg.imageUrl;
                case "card":
                    newMessage.type = "card";
                    newMessage.contents = {
                        url: msg.imageUrl,
                        title: msg.responseTitle,
                        text: first(msg.responseText)
                    }
                case "button":
                    newMessage.buttons = msg.responseButtons;
            }
        }

        setMessages(prevState => {
            return {
              ...prevState,
              messages: [ ...prevState.messages, newMessage ],
              status: 'DONE'
            };
        });
    }

    const reconnectSession = async _ => {
        setMessages(prevState => {
            return {
                ...prevState,
                status: 'DOING'
            }
        });

        const { data } = await axios.post(
            'http://localhost:3001/api/message', 
            {
                user_key: userId,
                accessKey: accessKey,
                accessSecret: accessSecret,
                apiKey: apiKey
            }
        );

        switch (data.code) {
            case "1000":
                createMessage(data.data);
                break;
            default:
                createMessage({
                    contentType:["textRandom"],
                    inputType:"text",
                    responseText: ["서버와의 통신에서 오류가 발생하였습니다. 관리자에게 문의해주세요."],
                    responseButtons: []
                });
        }
        return;
    }

    const sendMessage = async msg => {
        let options = {
            user_key: userId,
            accessKey: accessKey,
            accessSecret: accessSecret,
            apiKey: apiKey
        };

        if (!isUndefined(msg)) options.content = msg;
        setMessages(prevState => {
            return {
                ...prevState,
                status: 'DOING'
            }
        })
        const { data } = await axios.post(
            'http://localhost:3001/api/message', 
            options
        );
    
        switch (data.code) {
            case "1000": // 정상
                createMessage(data.data);
                break;
            case "4000": // 세션 만료
                createMessage(data.data);
                setTimeout(reconnectSession, 1000);
                break;
            case "5000": // 세션 유지
                setMessages(prevState => {
                    return {
                        ...prevState,
                        status: 'DONE'
                    }
                })
                break;
            case "9001": // apiKey 오류
                createMessage({
                    contentType:["textRandom"],
                    inputType:"text",
                    responseText: ["apiKey가 잘못되었습니다."],
                    responseButtons: []
                });
                break;
            case "9000": // 일반 에러
            default: 
                createMessage({
                    contentType:["textRandom"],
                    inputType:"text",
                    responseText: ["서버와의 통신에서 오류가 발생하였습니다. 관리자에게 문의해주세요."],
                    responseButtons: []
                });
                break;
        }

        return;
    }

    const initState = {
        messages: [],
        status: 'DONE',
        createMessage,
        sendMessage
    };

    const [messages, setMessages] = useState(initState);
    return (
        <MessageContext.Provider value={messages}>
        { children }
        </MessageContext.Provider>
    );
}
    
export default MessageProvider;