import styles from "./ChattingLayout.module.scss";

import screen from '../../../constants/screen';

import classNames from "classnames/bind";
import React, { useState, useContext, useRef, useLayoutEffect } from "react";
import { ChattingHeader, MessageList } from "../../organisms";
import { MessageInput } from "../../molecules";
import ImageModal from "../ImageModal";
import MessageContext from "../../../contexts/Message.context";
import dynamic from "next/dynamic";
import  messageApi from '../../../public/scripts/message';

const cx = classNames.bind(styles);

const DynamicDivier = dynamic(() => import("../../atoms/Divider"), {
  ssr: false
});

const DateDivider = _ => {
  const currentDate = new Date().toLocaleDateString("ko-KR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  return <DynamicDivier date={currentDate} />;
};

const ChattingLayout = ({ parentWidth, botImageUrl, botName, messages }) => {
  const { createMessage, sendMessage, refreshSession, status } = useContext(MessageContext);
  const [modal, setModal] = useState(false);
  const [image, setImage] = useState(void 0);

  let listRef = useRef();
  let inputRef = useRef();

  const toggle = _ => setModal(!modal);

  const readyForRequest = isSafari => {
    const input = inputRef.current.value.trim();
    if (isEmpty(input)) return null;

    const requestMessage = {
      contentType: ["textRandom"],
      responseText: [input],
      isMe: true
    };

    createMessage(requestMessage);

    inputRef.current.value = "";
    sendMessage(first(requestMessage.responseText));
    
    isSafari && parentWidth <= screen.PHONE
    ? inputRef.current.blur()
    : inputRef.current.focus()
  };

  const { isSafari } = browserDetect();

  const onKeyPress = e => {
    if (e.charCode === 13) {
      e.preventDefault();
      readyForRequest(isSafari);
    }
  };

  const sendBtnResponse = btn => {
    createMessage({
      contentType: ["textRandom"],
      responseText: [btn.name],
      isMe: true
    });
    sendMessage(btn);
  };

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
  };

  const clickImg = e => {
    setImage(e.target.src);
    toggle(true);
  };

  const onRefresh = _ => refreshSession();

  const onClose = _ => messageApi.close();

  const prevHeight = useRef();

  useLayoutEffect(_ => {
    const detectMobileKeyboard = _ => {
      if (!prevHeight) {
        prevHeight = window.innerHeight;
        return;
      }

      if (prevHeight !== window.innerHeight) {
        listRef.current.scrollIntoView(false);
      }
    }

    window.addEventListener("resize", detectMobileKeyboard);

    return _ => window.removeEventListener("resize", detectMobileKeyboard);
  }, []);

  const onClick = e => {
    e.preventDefault();
    readyForRequest();
  }

  return (
    <div className={cx("wrapper")}>
      <ChattingHeader 
      url={botImageUrl} 
      name={botName} 
      onRefresh={ onRefresh }
      onClose={ onClose } />
      <div className={cx("messages-section")} id="leaflo-message-list">
        <DateDivider />
        <MessageList
          innerRef={listRef}
          messages={messages}
          status={status}
          btnOnClick={clickBtn}
          imgOnClick={clickImg}
        />
      </div>
      <div className={cx("input-section")}>
        <MessageInput
          innerref={inputRef}
          onKeyPress={onKeyPress}
          onClick={onClick}
        />
      </div>
      <ImageModal isOpen={modal} toggle={toggle} url={image} botName={botName} />
    </div>
  );
};

export default ChattingLayout;
