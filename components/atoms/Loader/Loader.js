import styles from "./Loader.module.scss";
import React, { memo } from "react";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const Loader = _ => <div className={cx("dot-elastic")}></div>;

export default memo(Loader);
