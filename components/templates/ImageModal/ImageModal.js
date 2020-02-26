import styles from './ImageModal.module.scss';

import React from "react";
import classNames from "classnames/bind";

import { Modal } from "../../organisms";
import { Image } from "../../atoms";

const cx = classNames.bind(styles);

const ImageModal = ({ url, toggle, isOpen, botName }) => {
  const header = <span className={cx("img-modal-header")}>{botName}</span>
  const content = <Image src={url} className={cx("image")} height="auto" />;

  return (
    <Modal
      header={header}
      isOpen={isOpen}
      toggle={toggle}
      content={content}
    />
  );
};

ImageModal.defaultProps = {
  toggle: _ => {}
};

export default ImageModal;
