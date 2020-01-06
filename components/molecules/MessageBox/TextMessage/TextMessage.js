import styles from "./TextMessage.module.scss";

import React from "react";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const TextMessage = ({ text }) => <div>{text}</div>;

export default TextMessage;
