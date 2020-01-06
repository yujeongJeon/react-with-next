import styles from "./MessageList.module.scss";

import React, { Suspense, useState, useEffect, useRef } from "react";
import classNames from "classnames/bind";

import { ChattingLoader } from "../../molecules";
const MessageBox = React.lazy(_ => import("../../molecules/MessageBox"));

const cx = classNames.bind(styles);

const MessageList = ({ messages, status, btnOnClick, imgOnClick }) => {
  const [scrollBottom, setScrollBottom] = useState(0);
  const listRef = useRef();

  const getBottom = e => {
    return e.scrollHeight;
  };

  useEffect(
    _ => {
      if (listRef) {
        setScrollBottom(getBottom(listRef.current));

        listRef.current.scrollIntoView(false);
      }
    },
    [messages]
  );

  return (
    <div ref={listRef} className={cx("msg-list")}>
      {messages.map(
        ({ type, contents, dateTime, buttons = [], isMe = false }, msgIdx) => (
          <div
            className={cx("msg", isMe ? "msg-align-right" : "msg-align-left")}
            key={msgIdx}>
            <Suspense fallback={"로딩중..."}>
              <MessageBox
                type={type}
                contents={contents}
                dateTime={dateTime}
                imgOnClick={imgOnClick}
                buttons={buttons}
                btnOnClick={btnOnClick}
              />
            </Suspense>
          </div>
        )
      )}
      {status === "DOING" && <ChattingLoader />}
    </div>
  );
};

export default MessageList;
