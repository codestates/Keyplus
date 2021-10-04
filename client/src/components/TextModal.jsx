import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { isError } from '../reducers/errorReducer';
import { withRouter } from 'react-router-dom';

const DeleteModal = (props) => {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState(props.modalText);
  const history = useHistory();
  const dispatch = useDispatch();

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
      await dispatch(props.action({ history }));
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
      <button type="button" onClick={showModal}>
        {props.buttonText}
      </button>
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

export default withRouter(DeleteModal);
