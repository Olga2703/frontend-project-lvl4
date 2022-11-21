import React, { useRef, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Modal, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { selectors } from '../../slices/channelsSlice.js';
import { actions as modalsActions } from '../../slices/modalsSlice.js';
import { ApiContext } from '../../context/index.js';

const ModalWindow = () => {
  const chatApi = useContext(ApiContext);
  const dispatch = useDispatch();
  const inputRef = useRef();
  const { t } = useTranslation();
  useEffect(() => inputRef.current.focus(), []);

  const channelNames = useSelector(selectors.selectAll).map((channel) => channel.name);

  const closeModal = () => dispatch(modalsActions.closeModal());
  console.log(useSelector((state) => state.modals));
  const { type, channel } = useSelector((state) => state.modals);

  const onAdd = (name) => {
    chatApi.addNewChannel({ removable: true, name });
  };

  const onRename = (name) => {
    chatApi.renameChannel({ id: channel.id, name });
  };

  const title = type === 'adding' ? t('modal.add_channel') : t('modal.rename_channel');
  const handler = type === 'adding' ? onAdd : onRename;

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: yup.object({
      name: yup.string().required().notOneOf(channelNames),
    }),
    onSubmit: ({ name }) => {
      handler(name);
      closeModal();
    },
  });

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={closeModal}>
        <Modal.Title className='h4'>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <div>
            <Form.Control
              isInvalid={formik.touched.name && formik.errors.name}
              ref={inputRef}
              onChange={formik.handleChange}
              className='mb-2'
              name='name'
              id='name'
              value={formik.values.name}
            />
            <Form.Label className='visually-hidden' htmlFor='name'>
              {t('modal.name_channel')}
            </Form.Label>
            {formik.touched.name && formik.errors.name ? <Form.Control.Feedback type='invalid'>{formik.errors.name}</Form.Control.Feedback> : null}
            <div className='d-flex justify-content-end'>
              <Button onClick={closeModal} type='button' variant='secondary' className='me-2'>
                {t('modal.cancel')}
              </Button>
              <Button type='submit'>{t('modal.send')}</Button>
            </div>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalWindow;
