import { ChattingLayout } from "../components/templates";
import axios from "axios";
import { useEffect, useContext, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpinner
} from "@fortawesome/free-solid-svg-icons";

import cssVars from 'css-vars-ponyfill';

import MessageContext from "../contexts/Message.context";
import messageApi from "../public/scripts/message";

const Index = ({ 
  name, 
  imageUrl, 
  apiKey, 
  colorSet,
  btnImageUrl }) => {
  const { messages, sendMessage } = useContext(MessageContext);
  const [loading, setLoading] = useState(true);

  if (!apiKey)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100vh"
        }}>
        봇 정보가 잘못되었습니다.
      </div>
    );

  const receiveIframeSign = e => {
    if ("leaflo-import" === e.data.event) {
      if (!isUndefined(window.console)) {
        log("receive from parent ", e.origin);
      }
      messageApi.init(colorSet.talkPop, colorSet.talkPopText, colorSet.talkPopBorder, colorSet.talkPopBorderRadius, btnImageUrl);
    }
  }

  useEffect(_ => {
    window.addEventListener("message", receiveIframeSign);
    sendMessage();

    cssVars({
      // Targets
      rootElement   : document,
      shadowDOM     : true,
      // Sources
      include       : 'link[rel=stylesheet],link[as=style]',
      exclude       : 'link[as=script]',
      variables     : {
        "--header": colorSet["header"],
        "--headerText": colorSet["headerText"],
        "--headerBtn": colorSet["headerBtn"],
        "--headerBtnHover": colorSet["headerBtnHover"],
        "--bg": colorSet["bg"],
        "--divider": colorSet["divider"],
        "--dividerText": colorSet["dividerText"],
        "--dividerBorderRadius": colorSet["dividerBorderRadius"],
        "--inputMsg": colorSet["inputMsg"],
        "--inputMsgText": colorSet["inputMsgText"],
        "--inputMsgBorder": colorSet["inputMsgBorder"],
        "--inputDateTimeText": colorSet["inputDateTimeText"],
        "--inputMsgBorderRadius": colorSet["inputMsgBorderRadius"],
        "--outputMsg": colorSet["outputMsg"],
        "--outputMsgText": colorSet["outputMsgText"],
        "--outputMsgBorder": colorSet["outputMsgBorder"],
        "--outputDateTimeText": colorSet["outputDateTimeText"],
        "--outputMsgBorderRadius": colorSet["outputMsgBorderRadius"],
        "--msgBtn": colorSet["msgBtn"],
        "--msgBtnText": colorSet["msgBtnText"],
        "--msgBtnBorder": colorSet["msgBtnBorder"],
        "--msgBtnBorderRadius": colorSet["msgBtnBorderRadius"],
        "--msgBtnHover": colorSet["msgBtnHover"],
        "--msgBtnHoverText": colorSet["msgBtnHoverText"],
        "--msgBtnHoverBorder": colorSet["msgBtnHoverBorder"],
        "--loader": colorSet["loader"],
        "--input": colorSet["input"],
        "--inputText": colorSet["inputText"],
        "--inputBorder": colorSet["inputBorder"],
        "--inputBorderRadius": colorSet["inputBorderRadius"],
        "--inputBtn": colorSet["inputBtn"],
        "--inputBtnText": colorSet["inputBtnText"],
        "--inputBtnBorder": colorSet["inputBtnBorder"],
        "--inputBtnBorderRadius": colorSet["inputBtnBorderRadius"],
        "--inputBtnHover": colorSet["inputBtnHover"],
        "--inputBtnHoverText": colorSet["inputBtnHoverText"],
        "--inputBtnHoverBorder": colorSet["inputBtnHoverBorder"],
        "--imageModal": colorSet["imageModal"],
        "--imageModalText": colorSet["imageModalText"],
        "--imageModalCover": colorSet["imageModalCover"],
        "--imageModalBorder": colorSet["imageModalBorder"],
        "--imageModalBorderRadius": colorSet["imageModalBorderRadius"],
        "--talkPop": colorSet["talkPop"],
        "--talkPopText": colorSet["talkPopText"],
        "--talkPopBorder": colorSet["talkPopBorder"],
        "--talkPopBorderRadius": colorSet["talkPopBorderRadius"],
      },
      // Options
      onlyLegacy    : false,
      preserveStatic: true,
      preserveVars  : false,
      silent        : false,
      updateDOM     : true,
      updateURLs    : false,
      watch         : false,
      onSuccess(cssText, elm, url) {
        const isIE = /*@cc_on!@*/false || !!document.documentMode;
        isIE && setLoading(false)
      },
      onComplete(cssText, styleElms, cssVariables, benchmark) {
        setLoading(false)
      }
    });
  }, []);

  if (loading)
    return (
      <div style={{
        color: "rgba(0,0,0,.15)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh"
      }}>
        <FontAwesomeIcon icon={faSpinner} pulse size="3x" />
      </div>
    )

  return (
    <ChattingLayout botImageUrl={imageUrl} botName={name} messages={messages} />
  );
};

Index.getInitialProps = async ({ query }) => {
  const defaultImage = "/assets/leaflo-chatbot.png";
  const { apiKey, userId, accessKey, accessSecret } = query;

  if (
    isEmpty(apiKey) ||
    isEmpty(accessKey) ||
    isEmpty(accessSecret) ||
    isEmpty(userId)
  )
    return {};

  const { data: botData } = await axios.post(`${API_DOMAIN}/api/init`, {
    apiKey: apiKey,
    accessKey: accessKey,
    accessSecret: accessSecret
  });

  switch (botData.code) {
    case "1000":
      return {
        name: botData.data.botName,
        imageUrl: botData.data.botImageUrl || defaultImage,
        apiKey: apiKey,
        colorSet: botData.data.webChatColorSet,
        btnImageUrl: botData.data.webChatBtnImage || null
      };
    case "9000":
    case "9001":
    default:
      return {
        name: "ERROR",
        imageUrl: defaultImage,
        apiKey: apiKey,
        colorSet: {},
        btnImageUrl: null
      };
  }
};

export default Index;
