import React from 'react';
import { useSelector } from 'react-redux';

import ChannelModal from './ChannelModal.jsx';
import ChannelModalRemove from './ChannelModalRemove.jsx';

const Modal = () => {
  const { type } = useSelector((state) => state.modals);
  const Component = type === 'remove' ? ChannelModalRemove : ChannelModal;
  return (
    <Component />
  );
};

export default Modal;
