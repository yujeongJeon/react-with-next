import styles from "./ChattingHeader.module.scss";

import { faRedo, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import React from "react";
import classNames from "classnames/bind";

import { ChattingInfo } from "../../molecules";
import { Button } from "../../atoms";

const cx = classNames.bind(styles);

const ChattingHeader = ({ url, name, onRefresh, onClose }) => (
  <div className={cx("header")}>
    <ChattingInfo url={url} title={name} />
    <div className={cx("btns")}>
      <Button className={cx("btn-refresh")} onClick={ onRefresh }>
        <FontAwesomeIcon icon={faRedo} />
      </Button>
      <Button className={cx("btn-close")} onClick={ onClose }>
        <FontAwesomeIcon icon={faTimes} />
      </Button>
    </div>
  </div>
);

export default ChattingHeader;
