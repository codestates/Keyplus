import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { isError } from '../reducers/errorReducer';
import Button from './Button';

import { Modal } from 'antd';

const ButtonModal = (props) => {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState(props.modalText);

  const dispatch = useDispatch();
  const history = useHistory();

  const showModal = () => {
    setVisible(true);
  };

  const onClickDelete = async () => {
    try {
      setModalText(props.loadingText);
      setConfirmLoading(true);
      setTimeout(() => {
        setVisible(false);
        setConfirmLoading(false);
      }, 2000);
      await dispatch(props.action({ history, keyboardId: props.keyboardId }));
    } catch (err) {
      dispatch(isError(err.response));
    }
  };

  const onClickCancel = () => {
    setVisible(false);
  };

  useEffect(() => {
    return () => setConfirmLoading(false);
  }, []);

  return (
    <>
      <Button>
        <button onClick={showModal}>{props.buttonText}</button>
      </Button>
      <Modal
        title={props.buttonText}
        visible={visible}
        onOk={onClickDelete}
        confirmLoading={confirmLoading}
        onCancel={onClickCancel}
      >
        <p>{modalText}</p>
      </Modal>
    </>
  );
};

export default withRouter(ButtonModal);
