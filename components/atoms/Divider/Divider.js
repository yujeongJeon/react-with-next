import React, { memo } from 'react';
import classNames from 'classnames/bind';
import styles from './Divider.module.scss';

const cx = classNames.bind(styles);

const Divider = ({
    date
}) => (
    <div className={ cx('divider') }>
        <div className={ cx('date-text') }>{ date }</div>
    </div>
)

export default memo(Divider);