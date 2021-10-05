import React, { useState, useEffect } from 'react';
import Button from './Button';
import { useHistory } from 'react-router';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Modal, message } from 'antd';

const ButtonModal = (props) => {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState(props.modalText);
  const dispatch = useDispatch();
  const history = useHistory();

  const showModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setVisible(true);
  };

  const onClickDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      setModalText(props.loadingText);
      setConfirmLoading(true);
      setTimeout(() => {
        setVisible(false);
        setConfirmLoading(false);
      }, 2000);
      await dispatch(
        props.action({
          history,
          keyboardId: props.keyboardId,
          reviewId: props.reviewId,
        })
      ).unwrap();
    } catch (err) {
      return message.warning('오류가 발생하여 로그아웃됩니다.');
    }
  };

  const onClickCancel = (e) => {
    e.preventDefault();
    e.stopPropagation();
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
