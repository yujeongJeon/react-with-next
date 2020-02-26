import styles from "./Modal.module.scss";

import React from "react";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const ModalContent = ({ children, endOfModal, toggle }) => {
  let disableContent = false;
  const onClick = _ => {
    if (disableContent) {
      disableContent = false;
      return null;
    }
    toggle();
  }

  const contentClick = _ => {
    disableContent = true;
    return null;
  }

  return (
    <div className={cx("modal-content", { "end-of-modal": endOfModal })} onClick={onClick}>
      <span onClick={contentClick}>{children}</span>
    </div>
  )
};

ModalContent.defaultProps = {
  endOfModal: false,
  toggle: _ => {}
};

export default ModalContent;
