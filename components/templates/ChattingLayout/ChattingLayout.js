import styles from "./ChattingLayout.module.scss";

import classNames from "classnames/bind";
import React, { useState, useContext } from "react";
import { ChattingHeader, MessageList } from "../../organisms";
import { MessageInput } from "../../molecules";
import ImageModal from "../ImageModal";
import MessageContext from "../../../contexts/Message.context";
import dynamic from "next/dynamic";

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

const ChattingLayout = ({ botImageUrl, botName, messages }) => {
  const { createMessage, sendMessage, refreshSession, status } = useContext(MessageContext);
  const [input, setInput] = useState("");
  const [modal, setModal] = useState(false);
  const [image, setImage] = useState(void 0);

  const toggle = _ => setModal(!modal);

  const onChange = ({ target: { value } }) => setInput(value);

  const readyForRequest = _ => {
    if (isEmpty(input)) return null;
    const requestMessage = {
      contentType: ["textRandom"],
      responseText: [input],
      isMe: true
    };
    createMessage(requestMessage);

    setInput("");
    sendMessage(first(requestMessage.responseText));
  };

  const onKeyPress = e => {
    if (e.charCode === 13) {
      e.preventDefault();
      readyForRequest();
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

  const onRefresh = _ => {
    refreshSession();
  }

  return (
    <div className={cx("wrapper")}>
      <ChattingHeader url={botImageUrl} name={botName} onRefresh={ onRefresh } />
      <div className={cx("messages-section")}>
        <DateDivider />
        <MessageList
          messages={messages}
          status={status}
          btnOnClick={clickBtn}
          imgOnClick={clickImg}
        />
      </div>
      <div className={cx("input-section")}>
        <MessageInput
          message={input}
          onChange={onChange}
          onKeyPress={onKeyPress}
          onClick={readyForRequest}
        />
      </div>
      <ImageModal isOpen={modal} toggle={toggle} url={image} />
    </div>
  );
};

export default ChattingLayout;
