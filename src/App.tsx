import './App.css';
import styled from 'styled-components';
import MainPic from '../public/main.jpg';
import FloatingBar from './components/FloatingBar';
import { useEffect, useRef, useState } from 'react';

function App() {
  const [, setIsVisible] = useState(false);
  const refEl = useRef(null);

  useEffect(() => {
    window.addEventListener('scroll', checkScrollPosition);
    return () => {
      window.removeEventListener('scroll', checkScrollPosition);
    };
  }, []);

  const checkScrollPosition = () => {
    if (refEl.current) {
      const { offsetTop } = refEl.current;
      const scrollPosition = window.scrollY;

      if (scrollPosition >= offsetTop) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }
  };

  return (
    <Wrappper>
      <ContentWrapper>
        <MainImage src={MainPic} alt="메인사진"></MainImage>
        <DescriptionWrapper>
          <Description
            style={{
              fontSize: '24px',
              marginBottom: '10px',
              fontWeight: 500,
            }}
          >
            김태현 & 이상경
          </Description>
          <Description>2025. 02. 09. 일 PM 2:00</Description>
          <Description>서울숲 갤러리아포레 G층 보테가마지오</Description>
        </DescriptionWrapper>
        <DescriptionWrapper
          ref={refEl}
          style={{
            backgroundColor: '#F4F4F4',
            gap: '30px',
            padding: '40px 20px',
            height: '260px',
          }}
        >
          <Title>INVITATION </Title>
          <Description
            style={{
              fontWeight: 200,
              lineHeight: '28px',
              fontSize: '14px',
            }}
          >
            서로가 마주보며 다져온 사랑을
            <br />
            이제 함께 한 곳을 바라보며 <br />
            걸어갈 수 있는 큰 사랑으로 키우고자 합니다. <br />
            저희 두 사람이 사랑의 이름으로 지켜나갈 수 있게 <br /> 앞날을 축복해
            주시면 감사하겠습니다.
          </Description>
        </DescriptionWrapper>
        <DescriptionWrapper></DescriptionWrapper>
      </ContentWrapper>
      <FloatingBar isVisible={true} />
    </Wrappper>
  );
}

export default App;

const Wrappper = styled.div`
  background-color: #e4e4e4;
  width: 100vw;
  min-height: 100vh;
  height: 100%;
`;

const ContentWrapper = styled.div`
  background-color: white;
  width: 100%;
  max-width: 600px;
  height: 200vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const MainImage = styled.img`
  width: 100%;
`;

const DescriptionWrapper = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  padding: 10px;
`;

const Description = styled.p`
  font-size: 14px;
  text-align: center;
  font-weight: 400;
`;

const Title = styled.p`
  font-size: 12px;
  font-weight: 400;
  color: #555555;
  font-style: italic;
`;
