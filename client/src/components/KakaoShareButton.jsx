import React, { useEffect } from 'react';

const KakaoShareButton = ({ url }) => {
  useEffect(() => {
    console.log(url);
    Kakao.init(process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY);
  }, []);

  const shareKakao = () => {
    Kakao.Link.sendDefault({
      objectType: 'feed',

      content: {
        title: 'Keyplus',
        description: '기계식 키보드 취향 공유',
        imageUrl:
          'https://media.discordapp.net/attachments/880163201872961636/894314709032009758/keyplus.png',
        link: {
          webUrl: url,
          mobileWebUrl: url,
        },
      },
      buttons: [
        {
          title: '취향 확인하기',
          link: {
            webUrl: url,
            mobileWebUrl: url,
          },
        },
      ],
    });
  };

  return (
    <>
      <div className="share-text" onClick={shareKakao}>
        키보드 취향 공유하기
      </div>
      <button
        className="share-button"
        onClick={shareKakao}
        style={{
          backgroundImage: `url(${'kakao.png'})`,
        }}
      ></button>
    </>
  );
};
export default KakaoShareButton;
