import styles from './ImageMessage.module.scss';

import React from 'react';
import classNames from 'classnames/bind';

import { Image } from '../../../atoms';

const cx = classNames.bind(styles);

const ImageMessage = ({
    url,
    onClick
}) => (
    <div className={ cx('img-wrapper') }>
        <Image src={ url } className={ cx('image') } onClick={ onClick } />
    </div>
)

export default ImageMessage;