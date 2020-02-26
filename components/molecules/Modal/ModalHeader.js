import styles from "./Modal.module.scss";

import React from "react";
import classNames from "classnames/bind";

import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Button } from "../../atoms";

const cx = classNames.bind(styles);

const ModalHeader = ({ children, toggle }) => (
  <div className={cx("modal-header")}>
    <Button className={"btn-link"} onClick={toggle}>
      <FontAwesomeIcon icon={faArrowLeft} />
    </Button>
    {children}
  </div>
);

ModalHeader.defaultProps = {
  toggle: _ => {},
  children: void 0
};

export default ModalHeader;
