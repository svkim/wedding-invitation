import styled from 'styled-components';
import CalendarPic from '../../public/images/calendar.png';

// import FloatingBar from './../components/FloatingBar';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Snowfall from 'react-snowfall';
import BoyPic from '../../public/images/boy.png';
import GirlPic from '../../public/images/girl.png';
import ManPic from '../../public/images/man.jpg';
import WomanPic from '../../public/images/woman.jpg';

function Main() {
  const [isboy, setIsBoy] = useState(true);
  const [isGirl, setIsGirl] = useState(true);
  const [, setIsVisible] = useState(false);
  const refEl = useRef(null);
  const mainImageRef = useRef<HTMLDivElement>(null);

  const [searchParams] = useSearchParams();
  const dear = searchParams.get('dear'); // 받는사람 성명

  const innerHeight = window.innerHeight;

  useEffect(() => {
    if (mainImageRef.current) {
      mainImageRef.current.style.height = `${innerHeight - 180}px`;
    }
  }, []);

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
        <MainImage ref={mainImageRef}>
          <TitleImageTitle>
            We're Getting
            <br />
            Married!
          </TitleImageTitle>
        </MainImage>

        <DescriptionWrapper style={{ padding: '50px 20px', height: 180 }}>
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
            2025. 02. 09. 일요일 PM 2:00
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
            snowflakeCount={30}
            radius={[1, 4]}
            // images={['🌻']}
            speed={[0.2, 1]}
            style={{ opacity: 0.3 }}
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
          <div
            style={{
              paddingTop: 30,
              display: 'flex',
              gap: 'min(25px, 5%)',
              width: '100%',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                position: 'relative',
                width: 'calc(100vw - 70px)',
                aspectRatio: '1/1',
                pointerEvents: 'auto',
              }}
              onClick={(e) => {
                e.preventDefault();
                setIsBoy(!isboy);
              }}
            >
              <img
                style={{
                  position: 'absolute',
                  top: 0,
                  borderRadius: '20%',
                  width: '100%',
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'opacity 2s',
                  opacity: isboy ? 1 : 0,
                }}
                src={BoyPic}
              />
              <img
                style={{
                  position: 'absolute',
                  top: 0,
                  borderRadius: '20%',
                  width: '100%',
                  height: '100%',
                  cursor: 'pointer',
                  opacity: isboy ? 0 : 1,
                  transition: 'opacity 2s',
                  objectFit: 'cover',
                }}
                src={ManPic}
              />
            </div>
            <div
              style={{
                position: 'relative',
                width: 'calc(100vw - 70px)',
                aspectRatio: '1/1',
                pointerEvents: 'auto',
              }}
              onClick={(e) => {
                e.preventDefault();
                setIsGirl(!isGirl);
              }}
            >
              <img
                style={{
                  position: 'absolute',
                  top: 0,
                  borderRadius: '20%',
                  width: '100%',
                  height: '100%',
                  cursor: 'pointer',
                  opacity: isGirl ? 1 : 0,
                  transition: 'opacity 3s',
                }}
                src={GirlPic}
              />
              <img
                style={{
                  position: 'absolute',
                  top: 0,
                  borderRadius: '20%',
                  width: '100%',
                  height: '100%',
                  cursor: 'pointer',
                  opacity: isGirl ? 0 : 1,
                  transition: 'opacity 3s',
                  objectFit: 'cover',
                }}
                src={WomanPic}
              />
            </div>
          </div>
          <div
            style={{
              paddingTop: 30,
              display: 'flex',
              gap: 'min(25px, 5%)',
              width: '100%',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                position: 'relative',
                width: 'calc(100vw - 60px)',
              }}
            >
              <p style={{ textAlign: 'center', marginBottom: 10 }}>
                <span
                  style={{ fontSize: 10, marginRight: 6, color: '#15527e' }}
                >
                  신랑
                </span>{' '}
                김태현
              </p>
              <p
                style={{
                  fontSize: 10,
                  lineHeight: 1.7,
                  textAlign: 'center',
                  whiteSpace: 'nowrap',
                }}
              >
                노는걸 좋아하고 장난꾸러기였던
                <br />
                신랑은 자상하고 신중한 어른으로 자라 <br />
                예쁘고 사려깊은 신부의 모습이 <br />
                마음에 쏙 들었다고 합니다.
              </p>
            </div>
            <div
              style={{
                position: 'relative',
                width: 'calc(100vw - 60px)',
              }}
            >
              <p
                style={{
                  textAlign: 'center',
                  marginBottom: 10,
                }}
              >
                <span
                  style={{ fontSize: 10, marginRight: 6, color: '#e05068' }}
                >
                  신부
                </span>{' '}
                이상경
              </p>
              <p
                style={{
                  fontSize: 10,
                  lineHeight: 1.7,
                  textAlign: 'center',
                  whiteSpace: 'nowrap',
                }}
              >
                큰 눈이 유달리 반짝였던 신부는
                <br />
                씩씩하고 야무진 어른이 되어 <br />
                다정하면서도 배울점이 많은
                <br />
                신랑의 모습에 반했다고 합니다.
              </p>
            </div>
          </div>
        </DescriptionWrapper>

        <DescriptionWrapper
          style={{
            backgroundImage: `url(/images/calendarBackground.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <EnglishSubTitle>WEDDING DAY</EnglishSubTitle>
          <Title>날짜 </Title>
          <img
            src={CalendarPic}
            alt="캘린더"
            style={{ width: '80%', maxWidth: '300px', marginTop: '35px' }}
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
  font-size: 62px;
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

const MainImage = styled.div`
  position: relative;
  width: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  min-height: 450px;

  @supports (background-image: -webkit-image-set(url('/images/main.webp') 1x)) {
    background-image: -webkit-image-set(url('/images/main.webp') 1x);
  }

  background-image: url('/images/main.jpg');
`;

const DescriptionWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 55px 20px 60px 20px;
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
  color: #b2b2b2;
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
