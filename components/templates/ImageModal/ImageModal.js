import './ImageModal.module.scss';

import React from "react";

import { Modal } from "../../organisms";
import { Image } from "../../atoms";

const ImageModal = ({ url, toggle, isOpen }) => {
  const content = <Image src={url} className="image" height="auto" />;

  return (
    <Modal
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
