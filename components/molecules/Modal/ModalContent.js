import styles from './Modal.module.scss';

import React from 'react';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const ModalContent = ({
    children,
    endOfModal
}) => (
    <div className={ cx('modal-content', { 'end-of-modal': endOfModal }) }>
    { children }
    </div>
)

ModalContent.defaultProps = {
    endOfModal: false
}

export default ModalContent;