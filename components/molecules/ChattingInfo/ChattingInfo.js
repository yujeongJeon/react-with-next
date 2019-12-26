import styles from './ChattingInfo.module.scss';

import React from 'react';
import classNames from 'classnames/bind';

import { Image } from '../../atoms';

const cx = classNames.bind(styles);

const ChattingInfo = ({
    url,
    title
}) => (
    <div className={ cx('info-wrapper') }>
        <Image src={ url } width="45px" height="45px" className={ cx('image') } />
        <span className={ cx("title") }>
            { title }
        </span>
    </div>
)

export default ChattingInfo;