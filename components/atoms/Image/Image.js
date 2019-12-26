import React, { memo } from 'react';
import classNames from 'classnames/bind';
import styles from './Image.module.scss';

const cx = classNames.bind(styles);

const Image = ({
    src,
    className,
    width,
    height,
    ...rest
}) => (
    isNotEmpty(src)
    ? <img src={ src } className={ cx(className) } width={ width } height={ height } { ...rest } />
    : <div style={{ width: width, height: height }} className={ cx('alt-image') }>이미지 로딩 실패</div>
)

Image.defaultProps = {
    width: "100%",
    height: "100%"
}

export default memo(Image);