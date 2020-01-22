import React from "react";

import { Modal } from "../../organisms";
import { Image } from "../../atoms";

const ImageModal = ({ url, toggle, isOpen }) => {
  const header = <>이미지</>;
  const content = <Image src={url} />;

  return (
    <Modal
      isOpen={isOpen}
      top={"10%"}
      toggle={toggle}
      header={header}
      content={content}
    />
  );
};

ImageModal.defaultProps = {
  toggle: _ => {}
};

export default ImageModal;
