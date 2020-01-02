import styles from './Modal.module.scss';

import React from 'react';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const ModalContent = ({
    children
}) => (
    <div className={ cx('modal-content') }>
    { children }
    </div>
)

export default ModalContent;