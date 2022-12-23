/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { fetchChannels, selectorStatus } from '../../slices/channelsSlice.js';
import { useAuth } from '../../hooks/index.js';
import Modal from './components/modal/Modal.jsx';
import ChannelComponent from './components/ChannelComponent.jsx';
import MessageComponent from './components/MessagesComponent.jsx';
import { getModalType } from '../../slices/modalsSlice.js';

const PrivatePage = () => {
  const dispatch = useDispatch();
  const auth = useAuth();
  const { t } = useTranslation();
  const header = auth.getAuthHeader();
  const loadingStatus = useSelector(selectorStatus);
  useEffect(() => {
    dispatch(fetchChannels(header));
  }, []);

  const modalType = useSelector(getModalType);
  if (loadingStatus === 'loading') {
    return <div className="async-spinner"></div>
  }
  if (loadingStatus === 'failed') {
    toast.error(t('errors.errors_network'));
    auth.logOut();
  }

  return (
    <div className="d-flex flex-column h-100">
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <Row className="h-100 bg-white flex-md-row">
          <ChannelComponent />
          <MessageComponent />
        </Row>
      </Container>
      {modalType && <Modal />}
    </div>
  );
};

export default PrivatePage;
