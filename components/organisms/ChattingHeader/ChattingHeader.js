import styles from "./ChattingHeader.module.scss";

import React from "react";
import classNames from "classnames/bind";

import { ChattingInfo } from "../../molecules";
import { Button, Image } from "../../atoms";

const cx = classNames.bind(styles);

const ChattingHeader = ({ url, name, onRefresh, onClose }) => (
  <div className={cx("header")}>
    <ChattingInfo url={url} title={name} />
    <div className={cx("btns")}>
      <Button className={cx("btn-refresh")} onClick={ onRefresh }>
        <Image src={"/assets/leaflo-reload.png"} width="18px" height="18px" />
      </Button>
      <Button className={cx("btn-close")} onClick={ onClose }>
        <Image src={"/assets/leaflo-close.png"} width="15px" height="15px" />
      </Button>
    </div>
  </div>
);

export default ChattingHeader;
