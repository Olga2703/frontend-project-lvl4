import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dropdown } from 'react-bootstrap';

import { actions as channelsActions } from '../slices/channelsSlice.js';
import { actions as modalsActions } from '../slices/modalsSlice.js';

export const ChannelButton = ({ channel }) => {
  const dispatch = useDispatch();
  const { currentChannelId } = useSelector((state) => state.channels);
  const handleChannelClick = (id) => () => dispatch(channelsActions.setCurrentChannelId(id));
  return (
    <Button onClick={handleChannelClick(channel.id)} className='text-start text-truncate w-100 rounded-0' variant={channel.id === currentChannelId ? 'secondary' : ''}>
      <span className='me-1'>#</span>
      {channel.name}
    </Button>
  );
};

export const ChannelDropdownButton = ({ channel }) => {
  const dispatch = useDispatch();
  const showModal = (type) => () => dispatch(modalsActions.openModal({ type, channel }));
  const { currentChannelId } = useSelector((state) => state.channels);
  return (
    <Dropdown className="d-flex btn-group">
      <ChannelButton channel={channel} />
      <Dropdown.Toggle
      split
      variant={channel.id === currentChannelId ? 'secondary' : ''}
      className="flex-grow-0">
        <span className="visually-hidden">{'Управление каналом'}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item role="button" onClick={showModal('remove')} href="#">{'Удалить'}</Dropdown.Item>
        <Dropdown.Item role="button" onClick={showModal('rename')} href="#">{'Переименовать'}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
