import styles from './Modal.module.scss';

import React from 'react';
import classNames from 'classnames/bind';

import { Button, Image } from '../../atoms';

const cx = classNames.bind(styles);

const ModalHeader = ({
    children,
    toggle
}) => (
    <div className={ cx('modal-header') }>
        { children }
        <Button className={ 'btn-link' } onClick={ toggle }>
            <Image src={ "/assets/leaflo-close-2f353a.png" } width="17px" height="17px" />
        </Button>
    </div>
)

ModalHeader.defaultProps = {
    toggle: _ => {}
}

export default ModalHeader;