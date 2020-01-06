import styles from "./Modal.module.scss";

import React from "react";
import ReactDOM from "react-dom";
import classNames from "classnames/bind";
import { ModalHeader, ModalContent, ModalFooter } from "../../molecules";

const cx = classNames.bind(styles);

const Modal = ({ header, content, footer, isOpen, top, toggle }) => {
  const disableToggle = e => e.preventDefault();

  return (
    <div tabIndex="-1" style={{ position: "relative", display: "block" }}>
      <div className={cx("cover", { show: isOpen })}></div>
      <div className={cx("modal", { show: isOpen })}>
        <div
          tabIndex="-1"
          className={cx("modal-dialog")}
          style={{ top: top }}
          onClick={disableToggle}>
          <ModalHeader toggle={toggle}>{header}</ModalHeader>
          <ModalContent endOfModal={isEmpty(footer)}>{content}</ModalContent>
          {isNotEmpty(footer) && <ModalFooter>{footer}</ModalFooter>}
        </div>
      </div>
    </div>
  );
};

Modal.defaultProps = {
  top: "10%",
  isOpen: false,
  toggle: _ => {},
  header: void 0,
  footer: void 0
};

export default Modal;
