import styled from 'styled-components';
import CalendarPic from '../../public/images/calendar.png';
import CalendarBackground from '../../public/images/calendarBackground.jpg';

// import FloatingBar from './../components/FloatingBar';
import { useEffect, useRef, useState, lazy } from 'react';
import { useSearchParams } from 'react-router-dom';
import Snowfall from 'react-snowfall';
import ManPic from '../../public/images/man.jpg';
import WomanPic from '../../public/images/woman.jpg';
import BoyPic from '../../public/images/boy.jpeg';
import GirlPic from '../../public/images/girl.jpeg';
import MainPic from '../../public/images/main7.jpg';
import ProgressiveImg from './ProgressiveImg';
import High from '../../public/images/high.jpg';
import SunFlower from '../../public/images/sunflower1.png';
import SunFlower2 from '../../public/images/sunflower2.png';
import SunFlower3 from '../../public/images/sunflower3.png';

import Cursor from '../../public/images/cursor.png';
import PhoneModal from './PhoneModal';
import Map from '../Map';
import LikeButton from './LikeButton';
import AttendModal from './AttendModal';
import { INFORMATION } from '../value';

interface Props {
  setComponent: React.Dispatch<React.SetStateAction<React.ReactNode>>;
}

const PhotoGallery = lazy(() => import('./Gallery/PhotoGallery'));
const Slider = lazy(() => import('./Slider'));

function Main({ setComponent }: Props) {
  const [isboy, setIsBoy] = useState(true);
  const [isGirl, setIsGirl] = useState(true);
  const [, setIsVisible] = useState(false);
  const refEl = useRef(null);

  const [searchParams] = useSearchParams();
  const dear = searchParams.get('dear'); // 받는사람 성명

  const [openGroomAccount, setOpenGroomAccount] = useState<boolean>(false);
  const [openBrideccount, setOpenBrideAccount] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener('scroll', checkScrollPosition);

    const intervalId = setInterval(() => {
      setIsBoy((prev) => !prev);
      setIsGirl((prev) => !prev);
    }, 4000);

    return () => {
      clearInterval(intervalId);
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

  const onClickCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert(`${text}\n계좌번호가 복사되었습니다.`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Wrappper>
      <ContentWrapper>
        <ProgressiveImg placeholderSrc={MainPic} src={High} />
        <TitleImageTitle>
          We're Getting
          <br />
          Married!
        </TitleImageTitle>
        <DescriptionWrapper style={{ padding: '32px 20px' }}>
          <TopName>
            김태현
            <Flower
              style={{
                backgroundImage: `url(${SunFlower2})`,
              }}
            />
            이상경
          </TopName>
          <TitleDescription>
            2025. 02. 09. 일요일 PM 2:00
            <br /> 서울숲 갤러리아포레 G층 보테가마지오
          </TitleDescription>
        </DescriptionWrapper>
        <DescriptionWrapper
          style={{
            backgroundColor: '#f6f6f6',
            gap: '32px',
            position: 'relative',
            paddingTop: '65px',
          }}
        >
          <Snowfall
            color="gold"
            snowflakeCount={30}
            radius={[1, 5]}
            // images={['🌻']}
            speed={[0.2, 1]}
            style={{ opacity: 0.35 }}
          />

          {/* <div
            style={{
              backgroundImage: `url(${SunFlower3})`,
              width: '50px',
              height: '50px',
              backgroundSize: 'contain',
            }}
          /> */}

          <div>
            <EnglishSubTitle>INVITATION</EnglishSubTitle>
            {dear ? (
              <Title
                style={{
                  textAlign: 'center',
                  lineHeight: '1.77',
                }}
              >
                소중한 {dear}님 <br />
                저희 결혼식에 초대합니다
              </Title>
            ) : (
              <Title>소중한 분들을 초대합니다</Title>
            )}
          </div>

          <Description>
            계절이 6번 돌아오는 동안
            <br />
            함께 행복했던 기억이 차곡차곡 쌓였습니다. <br />
            부부로서 하나의 길을 걷게 될
            <br /> 힘찬 첫걸음을 내딛는 날, 함께해 주세요. <br />
            귀한 걸음 하시어 따스하게 격려해 주신다면 <br /> 평생의 응원으로
            여기며 살아가겠습니다.
          </Description>

          <HR />
          <Description>
            <Parent>
              김은수 &nbsp;•&nbsp; 곽숙견
              &nbsp;&nbsp;의&nbsp;&nbsp;&nbsp;아들&nbsp;
            </Parent>
            <span
              style={{
                fontFamily: 'MaruBuriBold',
                fontSize: '19px',
                marginLeft: '10px',
                color: '#3b3b3b',
                position: 'relative',
                bottom: '1px',
              }}
            >
              태현
            </span>
            <br />
            <Parent
              style={{
                left: '1px',
                position: 'relative',
              }}
            >
              이혁선 &nbsp;•&nbsp; 이화순
              &nbsp;&nbsp;의&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;딸&nbsp;&nbsp;&nbsp;
            </Parent>
            <span
              style={{
                fontFamily: 'MaruBuriBold',
                fontSize: '19px',
                marginLeft: '10px',
                color: '#3b3b3b',
                position: 'relative',
                bottom: '1px',
              }}
            >
              상경
            </span>
          </Description>
          <HR />
          <Button
            onClick={() =>
              setComponent(<PhoneModal setComponent={setComponent} />)
            }
          >
            <i
              className="fa fa-phone"
              style={{
                transform: 'rotate(98deg)',
                marginRight: '12px',
                fontSize: '16px',
              }}
            ></i>
            전화로 축하 인사하기
          </Button>
        </DescriptionWrapper>
        <DescriptionWrapper
          style={{
            backgroundColor: '#efefef',
            gap: '36px',
            position: 'relative',
          }}
        >
          <div>
            <EnglishSubTitle>SAVE THE DATE</EnglishSubTitle>
            <Title>참석여부를 전달해주세요</Title>
          </div>
          <Description>
            축하의 마음으로 예식에 참석하시는
            <br />
            모든 분들을 더욱 귀하게 모실 수 있도록, <br />
            참석 여부를 알려주시면 감사하겠습니다.
          </Description>

          <Button
            style={{ backgroundColor: '#444444', color: 'white' }}
            onClick={() =>
              setComponent(<AttendModal setComponent={setComponent} />)
            }
          >
            <i
              className="fa fa-calendar-check"
              aria-hidden="true"
              style={{
                marginRight: '12px',
                fontSize: '16px',
                color: 'white',
              }}
            ></i>
            참석여부 전달하기
          </Button>
        </DescriptionWrapper>
        <DescriptionWrapper>
          <EnglishSubTitle>GROOM & BRIDE</EnglishSubTitle>
          <Title>신랑 신부는요,</Title>
          <div
            style={{
              paddingTop: 40,
              display: 'flex',
              gap: '20px',
              width: '100%',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                position: 'relative',
                width: 'min(43vw, 260px)',
                height: 'min(43vw, 260px)',
                aspectRatio: '1/1',
                pointerEvents: 'auto',
              }}
              onClick={(e) => {
                e.preventDefault();
                setIsBoy(!isboy);
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  borderRadius: '20%',
                  width: '100%',
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'opacity 2s',
                  opacity: isboy ? 0 : 1,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundImage: `url(${BoyPic})`,
                  boxShadow: '3px 6px 6px rgba(0, 0, 0, 0.12)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  borderRadius: '20%',
                  boxShadow: '3px 6px 6px rgba(0, 0, 0, 0.12)',
                  width: '100%',
                  height: '100%',
                  cursor: 'pointer',
                  opacity: isboy ? 1 : 0,
                  transition: 'opacity 2s',
                  backgroundSize: 'cover',
                  backgroundPosition: 'top',
                  backgroundRepeat: 'no-repeat',
                  backgroundImage: `url(${ManPic})`,
                }}
              />
            </div>
            <div
              style={{
                position: 'relative',
                width: 'min(43vw, 260px)',
                height: 'min(43vw, 260px)',
                aspectRatio: '1/1',
                pointerEvents: 'auto',
              }}
              onClick={(e) => {
                e.preventDefault();
                setIsGirl(!isGirl);
              }}
            >
              {/* <span
                style={{
                  position: 'absolute',
                  bottom: -15,
                  right: -5,
                  fontSize: '11px',
                  fontFamily: 'Pretendard',
                  backgroundImage: `url(${Cursor})`,
                  width: 'min(11vw, 42px)',
                  height: 'min(11vw, 42px)',
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  zIndex: 100,
                  transform: 'rotate(25deg)',
                }}
              ></span>
              <span
                style={{
                  position: 'absolute',
                  bottom: -29,
                  right: -12,
                  fontSize: 'min(10.5px, 2.7vw)',
                  fontFamily: 'Pretendard',
                  zIndex: 100,
                  transform: 'rotate(-25deg)',
                }}
              >
                Click!
              </span> */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  borderRadius: '20%',
                  width: '100%',
                  height: '100%',
                  cursor: 'pointer',
                  opacity: isGirl ? 0 : 1,
                  transition: 'opacity 3s',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  backgroundImage: `url(${GirlPic})`,
                  boxShadow: '3px 6px 6px rgba(0, 0, 0, 0.12)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  borderRadius: '20%',
                  width: '100%',
                  height: '100%',
                  cursor: 'pointer',
                  opacity: isGirl ? 1 : 0,
                  transition: 'opacity 3s',
                  backgroundSize: 'cover',
                  backgroundPosition: 'bottom',
                  backgroundRepeat: 'no-repeat',
                  backgroundImage: `url(${WomanPic})`,
                  boxShadow: '3px 6px 6px rgba(0, 0, 0, 0.12)',
                }}
              />
            </div>
          </div>
          <div
            style={{
              paddingTop: 35,
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
              <p
                style={{
                  textAlign: 'center',
                  marginBottom: '14px',
                  fontSize: '20px',
                }}
              >
                <span
                  style={{
                    fontSize: '14.5px',
                    marginRight: '8px',
                    color: '#136198',
                  }}
                >
                  신랑
                </span>{' '}
                김태현
              </p>
              {/* <IntroduceWrapper>
                <span>1994년생, 서울사람</span>
                <span>다정한 사랑꾼 ESTJ</span>
                <span>#운동광 #닭강정</span>
              </IntroduceWrapper> */}
              {/* <p
                style={{
                  fontSize: 13,
                  lineHeight: 1.8,
                  textAlign: 'center',
                  whiteSpace: 'nowrap',
                }}
              >
                노는걸 좋아하고 장난꾸러기였던
                <br />
                신랑은 자상하고 신중한 어른으로 자라 <br />
                예쁘고 사려깊은 신부의 모습이 <br />
                마음에 쏙 들었다고 합니다.
              </p> */}
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
                  marginBottom: '14px',
                  fontSize: '20px',
                }}
              >
                <span
                  style={{
                    fontSize: '14.5px',
                    marginRight: '8px',
                    color: '#e05068',
                  }}
                >
                  신부
                </span>{' '}
                이상경
              </p>
              {/* <IntroduceWrapper>
                <span>1995년생, 예산사람</span>
                <span>다정한 사랑꾼 INFJ</span>
                <span>#게임광 #닭강정</span>
              </IntroduceWrapper> */}
              {/* <p
                style={{
                  fontSize: 13,
                  lineHeight: 1.8,
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
              </p> */}
            </div>
          </div>
          <LikeButton />
        </DescriptionWrapper>

        <DescriptionWrapper
          style={{
            backgroundImage: `url(${CalendarBackground})`,
          }}
        >
          <EnglishSubTitle style={{ color: '#777777' }}>
            WEDDING DAY
          </EnglishSubTitle>
          <Title>날짜 </Title>
          <img
            src={CalendarPic}
            alt="캘린더"
            style={{ width: '91%', maxWidth: '385px', marginTop: '35px' }}
          />
        </DescriptionWrapper>
        <DescriptionWrapper>
          <EnglishSubTitle>GALLERY</EnglishSubTitle>
          <Title style={{ marginBottom: '40px' }}>우리의 소중한 순간</Title>

          <PhotoGallery />
        </DescriptionWrapper>
        <DescriptionWrapper
          style={{
            backgroundColor: '#f6f6f6',
            position: 'relative',
          }}
        >
          <div>
            <EnglishSubTitle>LOCATION</EnglishSubTitle>
            <Title>오시는 길</Title>
          </div>
          <Description style={{ margin: '50px 0 24px' }}>
            <Location>보테가마지오</Location>
            <br />
            <LocationDetail>
              서울 성동구 서울숲2길 32-14 갤러리아포레 G층
            </LocationDetail>
          </Description>
          <Map />
          <NaviWrapper style={{ paddingTop: '50px' }}>
            <NaviTitle>자가용 & 주차 안내</NaviTitle>
            <Li style={{ marginBottom: '4px' }}>
              <Marker>𒊹</Marker>내비게이션으로 "보테가마지오" 검색해주세요.
            </Li>
            <Li>
              <Marker>𒊹</Marker>무료 주차는 2시간 가능합니다.
            </Li>
            <Li> - &nbsp;건물 내 B3-B7층, 무료주차 2시간 가능</Li>
            <Li> - &nbsp;안내데스크에서 주차 등록</Li>
          </NaviWrapper>
          <NaviWrapper>
            <NaviTitle>지하철 안내</NaviTitle>
            <Li>
              <Marker>𒊹</Marker>수인분당선 서울숲역 5번 출구
            </Li>
            <Li style={{ marginBottom: '12px' }}>- &nbsp;도보 2분 거리</Li>
            <Li>
              <Marker>𒊹</Marker>2호선 뚝섬역 8번 출구
            </Li>
            <Li>- &nbsp;도보 5분 거리</Li>
          </NaviWrapper>
          <NaviWrapper style={{ borderBottom: 'none' }}>
            <NaviTitle>대중교통 버스 안내</NaviTitle>
            <Li>
              <Marker>𒊹</Marker> 뚝섬 서울숲 정류장
            </Li>
            <Li style={{ marginBottom: '12px' }}>
              - &nbsp;간선(파랑색) : 121, 141, 145, 148, 463
            </Li>
            <Li>
              <Marker>𒊹</Marker> 성동구민 종합 체육센터 정류장
            </Li>
            <Li style={{ marginBottom: '12px' }}>
              - &nbsp;지선(녹색) : 2014, 2224, 2413
            </Li>
            <Li>
              <Marker>𒊹</Marker> 뚝섬역 8번 출구 정류장
            </Li>
            <Li>- &nbsp;지선(녹색) : 2016, 2224, 2413</Li>
          </NaviWrapper>
          <NaviWrapper
            style={{
              margin: 0,
              border: '4px double lightgray',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0)',
              padding: '46px 0',
            }}
          >
            <NaviTitle>전세버스 안내</NaviTitle>
            <Li style={{ textAlign: 'center' }}>
              귀한 발걸음을 해주시는 하객분들의 편의를 위해 <br />
              예산↔서울 간 전세버스를 준비하였습니다. <br />
              출발시간과 탑승 장소는 업데이트 예정입니다.
            </Li>
          </NaviWrapper>
        </DescriptionWrapper>
        <DescriptionWrapper>
          <EnglishSubTitle>INFORMATION</EnglishSubTitle>
          <Title style={{ marginBottom: '35px' }}>안내 말씀드립니다</Title>

          <Slider />
        </DescriptionWrapper>

        <DescriptionWrapper style={{ backgroundColor: '#f6f6f6' }}>
          <EnglishSubTitle>
            <i
              className="fa fa-heart"
              style={{ color: '#ffa2a2', fontSize: '16px' }}
            ></i>
          </EnglishSubTitle>
          <Title>마음 전하실 곳</Title>
          <Description
            style={{
              margin: '36px 0',
            }}
          >
            필요하신 분들을 위해
            <br />
            안내드리니 양해 부탁드립니다.
            <br />
            참석하지 못하더라도 축복해주시는
            <br />그 마음 감사히 간직하겠습니다.
          </Description>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              width: '98%',
            }}
          >
            <TabButton
              style={{ backgroundColor: '#355568' }}
              onClick={() => setOpenGroomAccount(!openGroomAccount)}
            >
              신랑측 계좌번호 보기
            </TabButton>
            <AccountWrapper style={{ height: openGroomAccount ? '310px' : 0 }}>
              {INFORMATION.groom.map((info) => (
                <div key={info.name}>
                  <AccountOwner>
                    {info.bank} (예금주 : {info.name})
                  </AccountOwner>
                  <AccountItem>
                    {info.accountNumber}
                    <button
                      onClick={() => {
                        onClickCopy(info.accountNumber);
                      }}
                    >
                      복사하기
                    </button>
                  </AccountItem>
                </div>
              ))}
            </AccountWrapper>
            <TabButton
              onClick={() => setOpenBrideAccount(!openBrideccount)}
              style={{ backgroundColor: '#714048' }}
            >
              신부측 계좌번호 보기
            </TabButton>
            <AccountWrapper style={{ height: openBrideccount ? '310px' : 0 }}>
              {INFORMATION.bride.map((info) => (
                <div key={info.name}>
                  <AccountOwner>
                    {info.bank} (예금주 : {info.name})
                  </AccountOwner>
                  <AccountItem>
                    {info.accountNumber}
                    <button
                      onClick={() => {
                        onClickCopy(info.accountNumber);
                      }}
                    >
                      복사하기
                    </button>
                  </AccountItem>
                </div>
              ))}
            </AccountWrapper>
          </div>
        </DescriptionWrapper>
      </ContentWrapper>
      {/* <FloatingBar isVisible={isVisible} /> */}
      {/* {툴팁 추가할까?하단에 좋아요 배;치하고 놓치지않게 } */}
    </Wrappper>
  );
}

export default Main;

const TitleImageTitle = styled.div`
  font-family: Cafe24Behappy, MaruBuriBold;
  color: #ffffff;
  font-size: min(16vw, 85px);
  position: absolute;
  z-index: 5;
  top: 35px;
  font-style: italic;
  line-height: 0.8;
  text-align: center;
  left: 50%;
  width: 100%;
  transform: translateX(-50%);
  letter-spacing: 1px;
  text-shadow: 2px 2px 3px rgba(0, 0, 0, 0.2);
`;

const Wrappper = styled.div`
  background-color: #e4e4e4;
  width: 100vw;
  padding-bottom: 300px;
`;

const ContentWrapper = styled.div`
  background-color: white;
  width: 100%;
  max-width: 600px;
  line-height: 1.4rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const MainImage = styled.img`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 450px;
`;

const DescriptionWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 60px 20px;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  @media only screen and (max-width: 445px) {
    padding: 58px 18px;
  }

  @media only screen and (max-width: 360px) {
    padding: 55px 16px;
  }
`;

const Description = styled.p`
  font-size: 18.5px;
  line-height: 38px;
  text-align: center;
  font-weight: bold;
  position: relative;
  /* animation: fade_up 0.8s; */
  white-space: nowrap;
  font-weight: 200;
  color: #4e4e4e;

  @media only screen and (max-width: 445px) {
    font-size: 17px;
    line-height: 36px;
  }

  @media only screen and (max-width: 360px) {
    font-size: 16px;
    line-height: 34px;
  }

  @media only screen and (max-width: 340px) {
    font-size: 15px;
    line-height: 32px;
  }
`;

const Flower = styled.div`
  width: 34px;
  height: 34px;
  background-size: contain;
  margin: 0 12px;

  @media only screen and (max-width: 400px) {
    width: 33px;
    height: 33px;
  }

  @media only screen and (max-width: 360px) {
    width: 32px;
    height: 32px;
  }
`;

const TopName = styled(Description)`
  font-size: 23px;
  margin-bottom: 32px;
  color: #141414;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;

  @media only screen and (max-width: 445px) {
    font-size: 22.5px;
  }

  @media only screen and (max-width: 360px) {
    font-size: 22px;
  }

  @media only screen and (max-width: 340px) {
    font-size: 21.5px;
  }
`;

const TitleDescription = styled(Description)`
  line-height: 33px;
  font-size: 17.2px;
  color: #3a3a3a;

  @media only screen and (max-width: 445px) {
    font-size: 17px;
    line-height: 32.5px;
  }

  @media only screen and (max-width: 360px) {
    font-size: 16.5px;
    line-height: 32px;
  }

  @media only screen and (max-width: 340px) {
    font-size: 16.2px;
    line-height: 31.2px;
  }
`;

const Title = styled.p`
  font-family: MaruBuriBold;
  font-size: 23.5px;
  font-weight: 500;
  color: #4d4d4d;
  margin-bottom: 10px;

  @media only screen and (max-width: 445px) {
    font-size: 23px;
  }

  @media only screen and (max-width: 360px) {
    font-size: 22px;
  }
`;

const EnglishSubTitle = styled.p`
  font-family: MaruburiLight;
  font-size: 13px;
  color: #b2b2b2;
  letter-spacing: 3px;
  text-align: center;
  padding-bottom: 12px;

  @media only screen and (max-width: 445px) {
    font-size: 12.5px;
    padding-bottom: 11.5px;
  }

  @media only screen and (max-width: 360px) {
    font-size: 12.3px;
    padding-bottom: 11px;
  }
`;

const HR = styled.hr`
  width: min(270px, 70%);
  border: 0;
  height: 1px;
  border-width: 1px 0 0 0;
  border-style: solid;
  border-color: #d6d6d6;
`;

const Gallery = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3개의 열 */
  grid-template-rows: repeat(8, 1fr); /* 8개의 행 */
  gap: 10px; /* 이미지 사이 간격 */
  max-width: 100%; /* 가로 크기 제한 */
  margin: 0 auto; /* 가운데 정렬 */
`;

const GalleryItem = styled.div`
  border: 2px solid #ddd; /* 이미지를 감싸는 테두리 */
  border-radius: 8px; /* 테두리 둥글게 처리 */
  overflow: hidden;
`;

const GalleryItemImg = styled.img`
  width: 100%; /* 이미지가 갤러리 아이템에 꽉 차도록 설정 */
  height: 100%; /* 이미지 높이도 꽉 차도록 설정 */
  object-fit: cover; /* 이미지 크기 맞추기 */
  display: block; /* 이미지 아래 공백 제거 */
`;

const Button = styled.button`
  font-family: 'Pretendard';
  background-color: rgba(255, 255, 255, 0.1);
  letter-spacing: 0.5px;
  width: min(300px, 85%);
  height: 60px;
  border: 1px solid #afafaf;
  font-size: 17.5px;
  border-radius: 10px;
  cursor: pointer;
  margin: 10px 0px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);

  @media only screen and (max-width: 360px) {
    font-size: 16px;
  }
`;

const TabButton = styled.div`
  border: 1px solid gray;
  width: 230px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  cursor: pointer;
  color: white;
  border-radius: 6px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`;

const NaviWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid lightgray;
  padding: 35px 0;
  overflow: visible;

  @media only screen and (max-width: 400px) {
    padding: 33px 0;
  }
`;

const NaviTitle = styled.div`
  font-size: 21px;
  font-weight: 600;
  margin-bottom: 18px;

  @media only screen and (max-width: 445px) {
    font-size: 20px;
  }

  @media only screen and (max-width: 360px) {
    font-size: 19px;
  }
`;

const Li = styled.li`
  list-style: none;
  font-family: Pretendard;
  font-size: 17.5px;
  line-height: 1.8;
  white-space: nowrap;

  @media only screen and (max-width: 445px) {
    font-size: 17px;
  }

  @media only screen and (max-width: 360px) {
    font-size: 16.5px;
  }
`;

const Marker = styled.span`
  font-size: 10px;
  color: #555555;
  margin-right: 6px;
  font-family: Pretendard;
  position: relative;
  bottom: 3px;
`;

const AccountWrapper = styled.div`
  margin: 0 auto;
  width: max(75%, 290px);
  transition: height 0.6s;
  transition-timing-function: cubic-bezier(0.15, 0.82, 0.165, 1);
  overflow: hidden;
`;

const AccountOwner = styled.div`
  font-family: Pretendard;
  width: 100%;
  padding-top: 20px;
`;

const AccountItem = styled.div`
  font-family: Pretendard;
  margin-top: 8px;
  height: 40px;
  width: 100%;
  background-color: white;
  display: flex;
  padding: 12px;
  align-items: center;
  position: relative;

  & > button {
    position: absolute;
    top: 1px;
    right: 2px;
    font-family: Pretendard;
    background-color: white;
    border: 1px solid #c6c6c6;
    box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.2);
    padding: 6px 8px;
    font-size: 15px;
    color: #555555;
    cursor: pointer;
  }
`;

const Parent = styled.span`
  font-family: Pretendard;
  font-weight: 400;
  font-size: 19px;
  color: #555555;

  @media only screen and (max-width: 445px) {
    font-size: 18px;
  }

  @media only screen and (max-width: 360px) {
    font-size: 17px;
  }

  @media only screen and (max-width: 340px) {
    font-size: 16.5px;
  }
`;

const Location = styled.span`
  font-family: Pretendard;
  font-weight: 600;
  font-size: 21px;
  color: #314a35;

  @media only screen and (max-width: 360px) {
    font-size: 20px;
  }

  @media only screen and (max-width: 340px) {
    font-size: 19px;
  }
`;

const LocationDetail = styled.span`
  font-family: Pretendard;
  font-weight: 300;
  font-size: 17.5px;
  color: #555555;
  line-height: 1.8;

  @media only screen and (max-width: 360px) {
    font-size: 17px;
  }

  @media only screen and (max-width: 340px) {
    font-size: 16.5px;
  }
`;

const IntroduceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid gray;
  gap: 6px;

  & > * {
    font-family: Pretendard;
    font-size: 15px;
  }
`;
