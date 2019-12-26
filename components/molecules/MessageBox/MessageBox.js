import styles from './MessageBox.module.scss';

import React from 'react';
import classNames from 'classnames/bind';
import TextMessage from './TextMessage/TextMessage';
import ImageMessage from './ImageMessage/ImageMessage';
import CardMessage from './CardMessage/CardMessage';
import ButtonList from './ButtonList/ButtonList';

const cx = classNames.bind(styles);

const MessageBox = ({
    type,
    contents, 
    dateTime,
    imgOnClick,
    buttons,
    btnOnClick
}) => (
    <div className={ cx('box-wrapper') }>
        <div className={ cx('contents') }>
        {
            type === "text"
            && <TextMessage text={ contents } />
        }
        {
            type === "image"
            && <ImageMessage url={ contents } onClick={ imgOnClick } />
        }
        {
            type === "card"
            && <CardMessage url={ contents.url } title={ contents.title } text={ contents.text } onClick={ imgOnClick } />
        }
        </div>
        {
            isNotEmpty(buttons)
            &&  <div className={ cx('btns') }>
                    <ButtonList buttons={ buttons } onClick={ btnOnClick } />
                </div>
        }
        <div className={ cx('date-time') }>
            { dateTime }
        </div>
    </div>
)

MessageBox.defaultProps = {
    imgOnClick: _ => {},
    btnOnClick: _ => {}
}

export default MessageBox;