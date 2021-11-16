import React from 'react';
import exceptionAxios from 'axios';
import { message } from 'antd';
import { useForm } from 'react-hook-form';
import './styles/Inquiry.scss';

const Inquiry = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  console.log(watch('email'));
  console.log(watch('name'));
  console.log(watch('title'));
  console.log(watch('contents'));

  const onSubmit = async (data) => {
    console.log('데이터', data);
    try {
      await exceptionAxios.post('/inquiries', {
        data,
      });
      message.success('이메일 전송이 완료되었습니다');
    } catch (err) {
      message.warning('이메일 전송에 실패했습니다. 다시 시도해주세요');
      throw err;
    }
    reset();
  };

  return (
    <>
      <section className="inquiry-container">
        <div className="inquiry-main">
          <h2 className="title">문의하기</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <select className="inquiry-select" {...register('category')}>
              <option value="키보드 추가 요청">키보드 추가 요청</option>
              <option value="키보드 추천 요청">키보드 추천 요청</option>
              <option value="버그 제보">버그 제보</option>
              <option value="그 외">그 외</option>
            </select>

            <div className="inquiry-input-box">
              <label htmlFor="email">이메일</label>
              <input
                type="email"
                placeholder="example@example.com"
                name="email"
                {...register('email', {
                  required: '이메일을 입력해주세요.',
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: '올바르지 않은 이메일 형식입니다.',
                  },
                })}
              />
              {errors.email && (
                <p className="error-message">{errors.email.message}</p>
              )}
            </div>

            <div className="inquiry-input-box">
              <label htmlFor="name">이름</label>
              <input
                type="text"
                placeholder="name"
                name="name"
                {...register('name', {
                  required: '이름을 입력해주세요.',
                  maxLength: {
                    value: 10,
                    message: '이름은 최대 10자 이하입니다.',
                  },
                })}
              />
              {errors.name && (
                <p className="error-message">{errors.name.message}</p>
              )}
            </div>

            <div className="inquiry-input-box">
              <label htmlFor="title">제목</label>
              <input
                type="text"
                placeholder="title"
                name="title"
                {...register('title', {
                  required: '제목을 입력해주세요.',
                  maxLength: {
                    value: 30,
                    message: '이름은 최대 30자 이하입니다.',
                  },
                })}
              />
              {errors.title && (
                <p className="error-message">{errors.title.message}</p>
              )}
            </div>

            <div className="inquiry-input-box">
              <label htmlFor="contents">내용</label>
              <textarea
                name="contents"
                id="contents"
                placeholder="contents"
                cols="80"
                rows="10"
                {...register('contents', {
                  required: '내용을 입력해주세요.',
                  maxLength: {
                    value: 1000,
                    message: '내용은 최대 1000자 이하입니다.',
                  },
                })}
              />
              {errors.contents && (
                <p className="error-message">{errors.contents.message}</p>
              )}
            </div>
            <div className="inquiry-input-box">
              <button type="submit">메일 전송</button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Inquiry;
