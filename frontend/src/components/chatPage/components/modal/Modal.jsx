import React from 'react';
import { useSelector } from 'react-redux';

import { getModalType } from '../../../../slices/modalsSlice.js';

import ChannelModal from './components/ChannelModalRename.jsx';
import ChannelModalRemove from './components/ChannelModalRemove.jsx';
import ChannelModalAdd from './components/ChannelModalAdd.jsx';

const Modal = () => {
  const type = useSelector(getModalType);
  const modalCases = {
    'adding': ChannelModalAdd,
    'rename': ChannelModal,
    'remove': ChannelModalRemove,
  }
  const Component = modalCases[type];
  return (
    <Component />
  );
};

export default Modal;
