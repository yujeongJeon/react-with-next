import React, { memo } from "react";
import classNames from "classnames/bind";
import styles from "./style.scss";

const cx = classNames.bind(styles);

const Input = ({ type, name, value, onChange, className, innerref, ...rest }) =>
  type === "text" ? (
    <input
      autoComplete="off"
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className={cx("input", className)}
      ref={ innerref || null  }
      {...rest}
    />
  ) : (
    <textarea
      value={value}
      onChange={onChange}
      className={cx("input", "textarea", className)}
      {...rest}
    />
  );

Input.defaultProps = {
  value: "",
  onChange: _ => {},
  className: ""
};

export default memo(Input);
