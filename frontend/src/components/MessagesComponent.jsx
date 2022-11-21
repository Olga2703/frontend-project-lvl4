import React from 'react';
import { useSelector } from 'react-redux';
import { Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { selectors as messagesSelectors } from '../slices/messagesSlice.js';
import { selectors as channelsSelectors } from '../slices/channelsSlice.js';
import MessagesForm from './MessagesForm.jsx';

const MessagesComponent = () => {
  const messages = useSelector(messagesSelectors.selectAll);
  const { t } = useTranslation();
  const { currentChannelId } = useSelector((state) => state.channels);
  const currentChannel = useSelector((state) => channelsSelectors
    .selectById(state, currentChannelId));
  const currentMessages = messages.filter((message) => message.channelId === currentChannelId);
  return (
    currentChannel && (
      <Col className='p-0 h-100'>
        <div className='d-flex flex-column h-100'>
          <div className='bg-light mb-4 p-3 shadow-sm small'>
            <p className='m-0'>
              <b># {currentChannel.name}</b>
            </p>
            <span className='text-muted'>{t('messages.count', { count: currentMessages.length })}</span>
          </div>
          <div id='messages-box' className='chat-messages overflow-auto px-5'>
            {currentMessages.map((message) => (
              <div key={message.id} className='text-break mb-2'>
                <b>{message.username}</b>
                <span>: </span>
                {message.body}
              </div>
            ))}
          </div>
          <div className='mt-auto px-5 py-3'>
            <MessagesForm />
          </div>
        </div>
      </Col>
    )
  );
};

export default MessagesComponent;
