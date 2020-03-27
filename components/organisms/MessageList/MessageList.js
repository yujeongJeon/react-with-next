import styles from "./MessageList.module.scss";

import React, { Suspense, useState, useEffect } from "react";
import classNames from "classnames/bind";

import { ChattingLoader } from "../../molecules";
const MessageBox = React.lazy(_ => import("../../molecules/MessageBox"));

const cx = classNames.bind(styles);

const MessageList = ({ messages, status, btnOnClick, imgOnClick, innerRef }) => {
  const [imgHeight, setImgHeight] = useState(0);

  useEffect(
    _ => {
      if (innerRef) {
        //innerRef.current.scrollIntoView({ block: 'end' });
        innerRef.current.scrollIntoView(false);
      }
    },
    [messages]
  );

  useEffect(_ => {
    if (imgHeight > 0) {
      //innerRef.current.scrollIntoView({ block: 'end' });
      innerRef.current.scrollIntoView(false);
    }
    setImgHeight(0);
  }, [imgHeight]);

  const onLoad = ({ target: img }) => setImgHeight(img.height);

  return (
    <div ref={innerRef} className={cx("msg-list")}>
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
