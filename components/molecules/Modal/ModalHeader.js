import styles from "./Modal.module.scss";

import React from "react";
import classNames from "classnames/bind";

import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Button } from "../../atoms";

const cx = classNames.bind(styles);

const ModalHeader = ({ children, toggle }) => (
  children
  ? <div className={cx("modal-header")}>
      {children}
      <Button className={"btn-link"} onClick={toggle}>
        <FontAwesomeIcon icon={faTimes} />
      </Button>
    </div>
  : <div className={cx("modal-header", "empty")}>
      <Button className={"btn-link"} onClick={toggle}>
        <FontAwesomeIcon icon={faTimes} />
      </Button>
    </div>
);

ModalHeader.defaultProps = {
  toggle: _ => {}
};

export default ModalHeader;
