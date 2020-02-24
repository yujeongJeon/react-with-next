import styles from "./MessageInput.module.scss";

import React from "react";
import classNames from "classnames/bind";

import { Button, Input } from "../../atoms";

const cx = classNames.bind(styles);

const MessageInput = ({ message, onChange, onKeyPress, onClick, onFocus }) => (
  <form className={cx("msg-wrapper")}>
    <div className={cx("input-wrapper")}>
      <Input
        type="text"
        placeholder="입력하세요."
        value={message}
        onChange={onChange}
        onKeyPress={onKeyPress}
        onFocus={onFocus}
      />
    </div>
    <div className={cx("btn-wrapper")}>
      <Button onClick={onClick}>입력</Button>
    </div>
  </form>
);

export default MessageInput;
