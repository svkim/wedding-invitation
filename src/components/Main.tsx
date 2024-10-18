import styled from 'styled-components';
import MainPic from '../assets/images/main.jpg';
import MainWebp from '../assets/images/main.webp';
import CalendarPic from '../assets/images/calendar.png';
import BabyPic from '../assets/images/baby.png';
// import FloatingBar from './../components/FloatingBar';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Snowfall from 'react-snowfall';

function Main() {
  const [, setIsVisible] = useState(false);
  const refEl = useRef(null);

  const [searchParams] = useSearchParams();
  const dear = searchParams.get('dear'); // 받는사람 성명

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
        <picture>
          <source
            width={500}
            height={500}
            srcSet={MainWebp}
            type="image/webp"
          />
          <TitleImageTitle>
            We're Getting
            <br />
            Married!
          </TitleImageTitle>
          <MainImage src={MainPic} alt="main"></MainImage>
        </picture>

        <DescriptionWrapper style={{ padding: '50px 20px' }}>
          <Description
            style={{
              fontSize: '22px',
              marginBottom: '40px',
              fontWeight: 500,
            }}
          >
            김태현 🌻 이상경
          </Description>
          <Description style={{ letterSpacing: '0.2px' }}>
            2025. 02. 09. 일 PM 2:00
          </Description>
          <Description style={{ letterSpacing: '0.2px' }}>
            서울숲 갤러리아포레 G층 보테가마지오
          </Description>
        </DescriptionWrapper>
        <DescriptionWrapper
          style={{
            backgroundColor: '#F4F4F4',
            gap: '30px',
            position: 'relative',
          }}
        >
          <Snowfall
            color="gold"
            snowflakeCount={20}
            radius={[1, 4]}
            // images={['🌻']}
            speed={[0.2, 1]}
            style={{ opacity: 0.2 }}
          />

          <span>🌻</span>

          <div>
            <>
              <EnglishSubTitle>INVITATION</EnglishSubTitle>
              {dear ? (
                <>
                  <Title>소중한 {dear}님</Title>
                  <br />
                  <Title>저희 결혼식에 초대합니다</Title>
                </>
              ) : (
                <Title>소중한 분들을 초대합니다</Title>
              )}
            </>
          </div>
          <Description
            ref={refEl}
            style={{
              fontWeight: 200,
              lineHeight: '28px',
              fontSize: '14px',
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
                fontFamily: 'MaruBuriSemiBold',
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
                fontFamily: 'MaruBuriSemiBold',
                fontSize: '16px',
                marginLeft: '8px',
              }}
            >
              상경
            </span>
          </Description>
          <HR />
        </DescriptionWrapper>

        <DescriptionWrapper>
          <EnglishSubTitle>GROOM & BRIDE</EnglishSubTitle>
          <Title>신랑 신부는요,</Title>
          <img src={BabyPic} style={{ width: '100%' }}></img>
        </DescriptionWrapper>

        <DescriptionWrapper>
          <EnglishSubTitle>WEDDING DAY</EnglishSubTitle>
          <Title>날짜 </Title>
          <img
            src={CalendarPic}
            alt="캘린더"
            style={{ width: '80%', maxWidth: '300px' }}
          />
        </DescriptionWrapper>
        <DescriptionWrapper>
          <EnglishSubTitle>GALLERY</EnglishSubTitle>
          <Title>우리의 소중한 순간</Title>
          {/* <GalleryWrap /> */}
        </DescriptionWrapper>
      </ContentWrapper>
      {/* <FloatingBar isVisible={isVisible} /> */}
    </Wrappper>
  );
}

export default Main;

const TitleImageTitle = styled.div`
  font-family: Cafe24Behappy;
  color: #ffffff;
  font-size: 60px;
  position: absolute;
  z-index: 5;
  top: 10%;
  font-style: italic;
  line-height: 44px;
  text-align: center;
  left: 50%;
  width: 100%;
  transform: translateX(-50%);
  letter-spacing: 0.5px;
`;

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

const MainImage = styled.img`
  position: relative;
  object-fit: cover;
  width: 100%;
  height: calc(100vh - 200px);
  min-height: 400px;

  height: -webkit-fill-available;
  height: fill-available;
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
  font-weight: bold;
  position: relative;
  animation: fade_up 0.8s;
  font-weight: 200;
`;

const Title = styled.p`
  font-family: MaruBuriBold;
  font-size: 18px;
  font-weight: 400;
  color: #555555;
  /* font-style: italic; */
`;

const EnglishSubTitle = styled.p`
  font-family: MaruburiLight;
  font-size: 11px;
  color: #cfcfcf;
  letter-spacing: 3px;
  text-align: center;
  padding-bottom: 4px;
`;

const HR = styled.hr`
  width: 50%;
  border: 0;
  height: 1px;
  border-width: 1px 0 0 0;
  border-style: solid;
  border-color: #e4e4e4;
`;
