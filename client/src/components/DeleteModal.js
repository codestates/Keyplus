import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { deleteUser } from '../reducers/api/userAPI';
import { isError } from '../reducers/errorReducer';
import { withRouter } from 'react-router-dom';

const DeleteModal = () => {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  //FIXME: 회원탈퇴 OK버튼을 누르면 회원이 탈퇴됨
  const [modalText, setModalText] = useState('정말로 탈퇴하시겠습니까?');

  const dispatch = useDispatch();
  const history = useHistory();

  const showModal = () => {
    setVisible(true);
  };

  //FIXME: 회원탈퇴 함수
  const handleOk = async () => {
    try {
      //회원 탈퇴 ok 버튼 누르면 컨텐츠가 탈퇴 진행중으로 바뀜
      setModalText('탈퇴 진행중입니다.');
      setConfirmLoading(true);
      //OK 버튼에 로딩 돌아가는 것
      setTimeout(() => {
        setVisible(false);
        setConfirmLoading(false);
      }, 2000);
      await dispatch(deleteUser());
      // window.location.replace('/');
      return history.push('/landing');
      // props.history.push('/');
    } catch (err) {
      dispatch(isError(err.response));
    }
  };

  const handleCancel = () => {
    console.log('취소버튼이 눌렸습니다!');
    setVisible(false);
  };

  useEffect(() => {
    return () => setConfirmLoading(false);
  }, []);

  return (
    <>
      <Button type="primary" onClick={showModal}>
        회원탈퇴
      </Button>
      <Modal
        title="회원탈퇴"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
    </>
  );
};

export default withRouter(DeleteModal);
