import React from 'react';
import { useSelector } from 'react-redux';
import { Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as filter from 'leo-profanity';
import { getCurrentChannelsMessages } from '../../../slices/messagesSlice.js';
import { getCurrentChannel } from '../../../slices/channelsSlice.js';
import MessagesForm from './MessagesForm.jsx';

const MessagesComponent = () => {
  filter.add(filter.getDictionary('ru'));
  filter.add(filter.getDictionary('en'));
  const { t } = useTranslation();
  const currentChannel = useSelector(getCurrentChannel);
  const currentMessages = useSelector(getCurrentChannelsMessages);

  return (
    currentChannel && (
      <Col className="p-0 h-100">
        <div className="d-flex flex-column h-100">
          <div className="bg-light mb-4 p-3 shadow-sm small">
            <p className="m-0">
              <b>
                <span># </span>
                {currentChannel.name}
              </b>
            </p>
            <span className="text-muted">
              {t('messages.count', { count: currentMessages.length })}
            </span>
          </div>
          <div id="messages-box" className="chat-messages overflow-auto px-5">
            {currentMessages.map((message) => (
              <div key={message.id} className="text-break mb-2">
                <b>{message.username}</b>
                <span>: </span>
                {filter.clean(message.body)}
              </div>
            ))}
          </div>
          <div className="mt-auto px-5 py-3">
            <MessagesForm />
          </div>
        </div>
      </Col>
    )
  );
};

export default MessagesComponent;
