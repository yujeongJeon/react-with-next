import React, { memo } from 'react';
import classNames from 'classnames/bind';
import styles from './style.scss';

const cx = classNames.bind(styles);

const Input = ({
    type,
    name,
    value,
    onChange,
    className,
    ...rest
}) => (
    type === "text"
    ?   <input 
        type="text" 
        name={ name } 
        value={ value } 
        onChange={ onChange } 
        className={ cx('input', className) } 
        { ...rest } />
    :   <textarea 
        value={value}
        onChange={onChange}
        className={cx('input', 'textarea', className)}
        { ...rest } />
)

Input.defaultProps = {
    value: "",
    onChange: _ => {},
    className: ""
}

export default memo(Input);