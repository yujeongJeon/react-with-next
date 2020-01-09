import styles from "./ImageMessage.module.scss";

import React, { Suspense } from "react";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const Image = React.lazy(_ => import("../../../atoms/Image"));
const skeleton = <div style={{ width: "100%", height: "100vh", backgroundColor: "#fff" }}></div>;

const ImageMessage = ({ url, onClick }) => (
  <div className={cx("img-wrapper")}>
    <Suspense fallback={ skeleton }>
      <Image src={url} className={cx("image")} onClick={onClick} />
    </Suspense>
  </div>
);

export default ImageMessage;
