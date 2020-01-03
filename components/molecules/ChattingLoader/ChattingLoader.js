import styles from './ChattingLoader.module.scss';

import React, { memo } from 'react';
import classNames from 'classnames/bind';

import { Loader } from '../../atoms';

const cx = classNames.bind(styles);

const ChattingLoader = _ => (
    <div className={ cx('loader-wrapper') }>
        <Loader />
    </div>
)

export default memo(ChattingLoader);