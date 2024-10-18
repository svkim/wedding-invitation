import './App.css';
import styled from 'styled-components';
// import MainPic from '../src/assets/images/image08.jpg';
// import MainWebp from '../public/main2.webp';
import CalendarPic from '../public/calendar.png';
import FloatingBar from './components/FloatingBar';
import { useEffect, useRef, useState } from 'react';
import GalleryWrap from './components/Gallery/GalleryWrap';

function App() {
  const [isVisible, setIsVisible] = useState(false);
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
        {/* <picture>
          <source srcSet={MainWebp} type="image/webp" /> 
         <MainImage src={MainPic} alt="메인사진" height={500}></MainImage> 
        </picture> */}
        <MainImage
          style={{
            backgroundImage: `url(../src/assets/images/image08.jpg)`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        ></MainImage>
        <DescriptionWrapper style={{ padding: '50px 20px' }}>
          <Description
            style={{
              fontSize: '24px',
              marginBottom: '40px',
              fontWeight: 500,
            }}
          >
            김태현 | 이상경
          </Description>
          <Description>2025. 02. 09. 일 PM 2:00</Description>
          <Description>서울숲 갤러리아포레 G층 보테가마지오</Description>
        </DescriptionWrapper>
        <DescriptionWrapper
          style={{
            backgroundColor: '#F4F4F4',
            gap: '30px',
          }}
        >
          <Title>INVITATION </Title>
          <Description
            ref={refEl}
            style={{
              fontWeight: 200,
              lineHeight: '28px',
              fontSize: '15px',
            }}
          >
            계절이 6번 돌아오는 동안
            <br />
            함께 행복했던 기억이 차곡차곡 쌓였습니다. <br />
            힘들 때마다 큰 위로가
            <br /> 되어주리라는 마음으로 <br />
            평생을 약속했습니다. <br /> 저희의 새로운 시작의 날에
            <br /> 축하와 온기로 함께해 주세요.
          </Description>

          <HR />
          <Description style={{ lineHeight: '28px', fontSize: '14px' }}>
            <span>김은수 • 곽숙견 의 장남</span>
            <span
              style={{
                fontWeight: 500,
                fontSize: '16px',
                marginLeft: '8px',
              }}
            >
              태현
            </span>
            <br />
            <span>이혁선 • 이화순 의 차녀</span>
            <span
              style={{
                fontWeight: 500,
                fontSize: '16px',
                marginLeft: '8px',
              }}
            >
              상경
            </span>
          </Description>
          <HR />
        </DescriptionWrapper>
        <DescriptionWrapper></DescriptionWrapper>
        <DescriptionWrapper>
          <Title>CALENDAR </Title>
          <img
            src={CalendarPic}
            alt="캘린더"
            style={{ width: '80%', maxWidth: '300px' }}
          />
        </DescriptionWrapper>
        <DescriptionWrapper>
          <Title>GALLERY </Title>
          <GalleryWrap />
        </DescriptionWrapper>
      </ContentWrapper>
      <FloatingBar isVisible={isVisible} />
    </Wrappper>
  );
}

export default App;

const Wrappper = styled.div`
  background-color: #e4e4e4;
  width: 100vw;
  min-height: 100vh;
  height: 500vh;
`;

const ContentWrapper = styled.div`
  background-color: white;
  width: 100%;
  max-width: 600px;
  line-height: 1.4rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

// const MainImage = styled.img`
//   width: 100%;
// `;

const MainImage = styled.div`
  width: 100%;
  height: calc(100vh - 200px);
`;

const DescriptionWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
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

const HR = styled.hr`
  width: 50%;
  border: 0;
  height: 1px;
  border-width: 1px 0 0 0;
  border-style: solid;
  border-color: #e4e4e4;
`;
