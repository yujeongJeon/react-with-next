import styles from "./CardMessage.module.scss";

import React from "react";
import classNames from "classnames/bind";

import { Image } from "../../../atoms";

const cx = classNames.bind(styles);

const CardMessage = ({ url, title, text, onClick }) => (
  <div className={cx("card")}>
    <Image src={url} className={cx("image")} onClick={onClick} />
    <div className={cx("title")}>{title}</div>
    <div className={cx("text")}>{text}</div>
  </div>
);

export default CardMessage;
