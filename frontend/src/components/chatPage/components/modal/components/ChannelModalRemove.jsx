import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { selectors, actions as channelActions, getCurrentChannel } from '../../../../../slices/channelsSlice.js';
import { actions as modalActions, getModal } from '../../../../../slices/modalsSlice.js';
import { useChatAPI } from '../../../../../hooks';

const RemoveChannelModal = () => {
  const chatApi = useChatAPI();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { extraData } = useSelector(getModal);
  const generalChannelId = useSelector(selectors.selectAll)
    .find((ch) => ch.name === 'general').id;
  const currentChannel = useSelector(getCurrentChannel);

  const closeModal = () => dispatch(modalActions.closeModal());

  const onRemove = () => {
    try {
      chatApi.removeChannel(extraData);
      if (extraData.id === currentChannel.id) {
        dispatch(channelActions.setCurrentChannelId(generalChannelId));
      }
      toast.success(t('success_message.channel_deleted'));
    } catch (err) {
      toast.error(t('errors.errors_network'));
    }
    closeModal();
  };

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={closeModal}>
        <Modal.Title className="h4">{t('modal.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modal.sure')}</p>
        <div className="d-flex justify-content-end">
          <Button onClick={closeModal} variant="secondary" className="me-2">{t('modal.cancel')}</Button>
          <Button onClick={onRemove} variant="danger">{t('modal.remove')}</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannelModal;
