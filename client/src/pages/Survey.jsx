import React from 'react';

const Survey = () => {
  //TODO: API 하나 더 만들어달라고 요청해야함
  //FIXME: 게이밍, 노이즈, 사운드 등등 useState로 만듬
  //클릭핸들러 함수
  return (
    <>
      {/* section 태그로 된 큰 테스트 카드 만들기 */}
      {/* 시작하기 버튼 transparent로 만들기 */}
      {/* 누를 때마다 그에 맞는 답을 우리가 useState에 저장한다. */}
      {/*
        if(!isStarted){
          return <start 버튼 있는 컴포넌트 />
        else {
          if(gaming === null) return <Question1 onClickAnswer1 = {onClickAnswer1} />
          else if(!noise) return <Question2 />
          else if(!weight) return <Question3 />
          else if(!sound) return <Question4 />
        }
        
        } 
      */}
      1. 어떤 용도 (게임, 개발, 사무) 용도 2. 소음 (조용, 보통, 시끄러워도 상관
      없다) 3. 키압(키를 누를 때 줘야 하는 힘의 크기)(무거운게 좋다, 가벼운게 4.
      타건감 (도각(짧게 들어보기), 서걱(짧게 들어보기 버튼), 보글, 찰칵) 5.
      로딩중... 6. 당신에게 맞는 키보드는..? 7. 짜잔
    </>
  );
};

export default Survey;
