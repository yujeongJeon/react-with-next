import { ChattingLayout } from "../components/templates"
import axios from 'axios';
import { useEffect, useState } from "react";

// import { useRouter } from 'next/router';

const Index = props => {
    const [messages, setMessages] = useState([]);
    // const router = useRouter();

    // if (!router.query.bot) return null;

    useEffect(_ => {
        const isIE = /*@cc_on!@*/false || !!document.documentMode;
        const timeStampReady = curry((ie, n) => ie
            ? new Date().toLocaleTimeString('ko-KR').replace(/\u200E/g, '')
            : new Date().toLocaleTimeString('ko-KR', { timeZone: 'Asia/Seoul' }));
        const timestamp = timeStampReady(isIE);

        const parseMessage = msg => {
            let result = { dateTime: timestamp(true) };
            for (const type of msg.contentType) {
                switch (type) {
                    case "textRandom":
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

        const msg = parseMessage(props.msg);
        setMessages([ ...messages, msg]);
    }, [props.msg]);

    return (
        <ChattingLayout 
        botImageUrl={ "/images/chatbot_avater.jpg" }
        botName={ "봇 제목" }
        messages={ messages }
        setMessages={ setMessages } />
    )
}

Index.getInitialProps = async ({ query }) => {
    // TODO request Bot Data & sessionCheck
    // query로 chatbotId, accessKey, accessSecret, userId 넘겨줘야 함
    const { data } = await axios.post(
        'http://localhost:3001/api/example', 
        {
            user_key: "newjeong_2019-12-26-02"
        }
    );

    switch (data.code) {
        case "1000":
            return {
                msg: data.data
            }
        case "5000":
            return {
                msg: {
                    contentType:["textRandom"],
                    inputType:"text",
                    responseText: ["세션이 살아있습니다!\n내용을 입력해주세요."],
                    responseButtons: []
                }
            }
        default: 
            return {
                msg: {
                    contentType:["textRandom"],
                    inputType:"text",
                    responseText: ["대화가 만료되었습니다 ㅠ_ㅠ"],
                    responseButtons: []
                }
            }
    }
}

export default Index