import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { selectors, actions as channelActions } from '../../slices/channelsSlice.js';
import { actions as modalActions } from '../../slices/modalsSlice.js';
import { ApiContext } from '../../context/index.js';

const RemoveChannelModal = () => {
  const chatApi = useContext(ApiContext);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { channel } = useSelector((state) => state.modals);
  const generalChannelId = useSelector(selectors.selectAll)
    .find((ch) => ch.name === 'general').id;
  console.log(generalChannelId);

  const closeModal = () => dispatch(modalActions.closeModal());
  console.log(channel);

  const onRemove = () => {
    try {
      chatApi.removeChannel(channel);
      dispatch(channelActions.setCurrentChannel(generalChannelId));
    } catch (err) {
      console.log(err);
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
