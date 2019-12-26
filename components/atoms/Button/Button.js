import React, { memo } from 'react';
import classNames from 'classnames/bind';
import styles from './style.scss';

const cx = classNames.bind(styles);

const Button = ({
    children,
    className,
    ...rest
}) => (
    <button type="button" className={cx('btn', className)} { ...rest }>
        { children }
    </button>
)

Button.defaultProps = {
    children: "",
    className: ""
}

export default memo(Button);