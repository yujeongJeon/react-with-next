import styles from "./Modal.module.scss";

import React from "react";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const ModalFooter = ({ children }) => (
  <div className={cx("modal-footer")}>{children}</div>
);

export default ModalFooter;
