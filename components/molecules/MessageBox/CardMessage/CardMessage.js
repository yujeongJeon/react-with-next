import styles from "./CardMessage.module.scss";

import React from "react";
import classNames from "classnames/bind";

import { Image } from "../../../atoms";

const cx = classNames.bind(styles);

const CardMessage = ({ url, title, text, onClick, onLoad }) => {
  return (
    <div className={cx("card")}>
      <Image src={url} className={cx("image")} onClick={onClick} onLoad={ onLoad } />
      <div className={cx("title")}>{title}</div>
      <div className={cx("text")} style={{}}>{text}</div>
    </div>
  );
};

export default CardMessage;
