import styles from './ImageModal.module.scss';

import classNames from 'classnames/bind';
import React from 'react';

import { Modal } from '../../organisms';
import { Image, Button } from '../../atoms';

const cx = classNames.bind(styles);

const ImageModal = ({
    url,
    toggle,
    isOpen
}) => {
    const disableRightClick = e => e.preventDefault();
    
    const header = <>이미지</>;
    const content = <Image src={ url } onContextMenu={ disableRightClick } />;
    const footer = <Button className={ cx('btn-link', 'text-dark') }>
        <Image 
        src={ "/assets/leaflo-download.png" } 
        className={ cx('img-download') } 
        width="17px" />
        download
        </Button>

    return (
        <Modal
        isOpen={ isOpen } 
        top={ "10%" } 
        toggle={ toggle }
        header={ header }
        content={ content }
        footer={ footer } />
    )
}

ImageModal.defaultProps = {
    toggle: _ => {}
}

export default ImageModal;