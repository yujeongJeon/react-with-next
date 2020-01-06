import styles from "./ButtonList.module.scss";

import React from "react";
import classNames from "classnames/bind";
import { Button } from "../../../atoms";

const cx = classNames.bind(styles);

const ButtonList = ({ buttons, onClick }) =>
  buttons.map((button, btnIdx) => (
    <Button
      key={btnIdx}
      className={cx("btn-list")}
      onClick={_ => onClick(button)}>
      {button.name}
    </Button>
  ));

ButtonList.defaultProps = {
  onClick: _ => {}
};

export default ButtonList;
