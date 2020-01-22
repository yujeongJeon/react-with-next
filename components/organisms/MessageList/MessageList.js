import styles from "./MessageList.module.scss";

import React, { Suspense, useState, useEffect, useRef } from "react";
import classNames from "classnames/bind";

import { ChattingLoader } from "../../molecules";
const MessageBox = React.lazy(_ => import("../../molecules/MessageBox"));

const cx = classNames.bind(styles);

const MessageList = ({ messages, status, btnOnClick, imgOnClick }) => {
  const [imgHeight, setImgHeight] = useState(0);
  const listRef = useRef();

  useEffect(
    _ => {
      if (listRef) {
        listRef.current.scrollIntoView({ block: 'end' });
      }
    },
    [messages]
  );

  useEffect(_ => {
    if (imgHeight > 0) listRef.current.scrollIntoView({ block: 'end' });
    setImgHeight(0);
  }, [imgHeight]);

  const onLoad = ({ target: img }) => setImgHeight(img.height);

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
                isMe={ isMe }
                onLoad={ onLoad }
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
