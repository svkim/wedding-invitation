import styled from 'styled-components';
import CalendarPic from '../../public/images/calendar4.jpg';
import CalendarBackground from '../../public/images/calendarBackground.jpg';
import Fireworks from 'react-canvas-confetti/dist/presets/fireworks';

// import FloatingBar from './../components/FloatingBar';
import { useEffect, useRef, useState, lazy } from 'react';
import { useSearchParams } from 'react-router-dom';
import Snowfall from 'react-snowfall';
import ManPic from '../../public/images/man.jpg';
import WomanPic from '../../public/images/woman.jpg';
import BoyPic from '../../public/images/boy.jpg';
import GirlPic from '../../public/images/girl.jpg';
import MainPic from '../../public/images/main7.jpg';
import ProgressiveImg from './ProgressiveImg';
import High from '../../public/images/high.jpg';
import TossIcon from '../../public/images/toss.jpg';
import KakaoMapIcon from '../../public/images/kakaoMap.png';
import NaverMapIcon from '../../public/images/naverMap.png';
import TMavIcon from '../../public/images/tmap.png';
import KakayPayIcon from '../../public/images/kakaopay.png';
import SunFlower from '../../public/images/sunflower1.png';
import SunFlower2 from '../../public/images/sunflower2.png';
import SunFlower3 from '../../public/images/sunflower3.png';
import image45 from '../../public/images/image45.jpg';
import Hall from '../../public/images/food2.jpg';
import Hall2 from '../../public/images/hall2.jpg';
import Cursor from '../../public/images/cursor.png';
import PhoneModal from './PhoneModal';
import Map from '../Map';
import LikeButton from './LikeButton';
import AttendModal from './AttendModal';
import { INFORMATION } from '../value';
import BusMap from '../../public/images/busMap.png';

interface Props {
  setComponent: React.Dispatch<React.SetStateAction<React.ReactNode>>;
}

const BUS_MAP_URL =
  'https://map.naver.com/p/directions/14119087.345187,4396486.7244838,%EC%B6%A9%EB%82%A8%20%EC%98%88%EC%82%B0%EA%B5%B0%20%EC%98%88%EC%82%B0%EC%9D%8D%20%EC%82%B0%EC%84%B1%EB%A6%AC%20678,,SIMPLE_POI/-/-/transit?c=18.57,0,0,0,dh';

const PhotoGallery = lazy(() => import('./Gallery/PhotoGallery'));

function Main({ setComponent }: Props) {
  const [isboy, setIsBoy] = useState(true);
  const [isGirl, setIsGirl] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const refEl = useRef(null);

  const childRef = useRef<{ triggerChildEvent: () => void }>(null);

  const triggerChildEventFromParent = () => {
    // 부모가 자식의 메서드를 호출
    if (childRef.current) {
      childRef.current.triggerChildEvent();
    }
  };

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

  // 카카오 SDK 로드
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js';
    script.integrity =
      'sha384-DKYJZ8NLiK8MN4/C5P2dtSmLQ4KwPaoqAfyA/DfmEc1VDxu4yyC7wy6K1Hs90nka';
    script.crossOrigin = 'anonymous';
    script.onload = () => {
      // 카카오 SDK 초기화
      window.Kakao.init(import.meta.env.VITE_APP_KAKAO_APP_KEY); // 카카오 앱의 JavaScript 키 입력
    };
    document.body.appendChild(script);

    // Cleanup (스크립트 제거)
    return () => {
      document.body.removeChild(script);
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

  const onClickLink = async () => {
    try {
      await navigator.clipboard.writeText('https://2025-11-01.vercel.app/');
      alert(`청첩장 링크가 복사되었습니다.`);
    } catch (err) {
      console.error(err);
    }
  };

  const onClickMapIcon = (platform: 'NAVER' | 'KAKAO' | 'TMAP') => {
    if (platform === 'NAVER') {
      window.location.href =
        'https://m.map.naver.com/search2/search.naver?query=%EB%B3%B4%ED%85%8C%EA%B0%80%EB%A7%88%EC%A7%80%EC%98%A4#/map/1/31494641';
    }
  };

  // 내비게이션 시작 함수
  const startNavigation = () => {
    window.Kakao.Navi.start({
      name: '보테가마지오',
      x: 37.5456811,
      y: 127.042481,
      coordType: 'wgs84',
    });
  };

  return (
    <Wrappper>
      <ContentWrapper>
        <ProgressiveImg placeholderSrc={MainPic} src={High} />
        {/* <TitleImageTitle>
          We're Getting
          <br />
          Married!
        </TitleImageTitle> */}
        <DescriptionWrapper style={{ padding: '32px 20px' }}>
          <TopName>
            김성식
            <Flower
              style={{
                backgroundImage: `url(${SunFlower2})`,
              }}
            />
            허지승
          </TopName>
          <TitleDescription>
            2025. 11. 01. 토요일 PM 12:00
            <br /> 서울 KU컨벤션웨딩홀
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
            같은 계절이 5번 돌아오는 동안
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
              김성환 &nbsp;•&nbsp; 김정선
              &nbsp;&nbsp;의&nbsp;&nbsp;&nbsp;아들&nbsp;
            </Parent>
            <span
              style={{
                fontFamily: 'GowunDodum-Bold',
                fontSize: '19px',
                marginLeft: '10px',
                color: '#3b3b3b',
                position: 'relative',
                bottom: '1px',
              }}
            >
              성식
            </span>
            <br />
            <Parent
              style={{
                left: '1px',
                position: 'relative',
              }}
            >
              김희연 &nbsp;&nbsp;의&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;딸&nbsp;&nbsp;&nbsp;
            </Parent>
            <span
              style={{
                fontFamily: 'GowunDodum-Bold',
                fontSize: '19px',
                marginLeft: '10px',
                color: '#3b3b3b',
                position: 'relative',
                bottom: '1px',
              }}
            >
              지승
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
        <DescriptionWrapper style={{ padding: '60px 22px' }}>
          <EnglishSubTitle>GROOM & BRIDE</EnglishSubTitle>
          <Title>신랑 신부는요,</Title>

          <InterviewWrapper>
            <div>
              <InterviewImageWrapper>
                <InterviewImage
                  style={{
                    opacity: isboy ? 0 : 1,
                    backgroundImage: `url(${BoyPic})`,
                  }}
                />
                <InterviewImage
                  style={{
                    opacity: isboy ? 1 : 0,
                    backgroundImage: `url(${ManPic})`,
                  }}
                />
              </InterviewImageWrapper>
              <p
                style={{
                  textAlign: 'center',
                  margin: '24px 0 20px',
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
                김성식
              </p>
              <Interview>
                2020년 겨울,
                수줍게 마스크를 내리던 순간 첫눈에 반했습니다.
                내 앞에서만 개구쟁이가 되는
                웃는 얼굴이 참 예쁜 사람과
                함께 웃고 부딪히며 성장해왔습니다.
                <div style={{ height: '18.5px' }}></div>
                그 시간들이 쌓여 서로의 가장 든든한 편이 되어
                함께 행복하게 살아가겠습니다.
              </Interview>
            </div>
            <div>
              <InterviewImageWrapper>
                <InterviewImage
                  style={{
                    opacity: isGirl ? 0 : 1,
                    backgroundImage: `url(${GirlPic})`,
                  }}
                />
                <InterviewImage
                  style={{
                    opacity: isGirl ? 1 : 0,
                    backgroundImage: `url(${WomanPic})`,
                  }}
                />
              </InterviewImageWrapper>
              <p
                style={{
                  textAlign: 'center',
                  margin: '24px 0 20px',
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
                허지승
              </p>
              <Interview>
                2020년 겨울, 
                마스크를 내리며 수줍게 웃던 개구쟁이 같은 표정이 아직도 생생합니다.
                밤새 통화하며 잠들던 그 사람과
                이제는 평생을 함께하게 되었습니다.
                <div style={{ height: '18.5px' }}></div>
                대학 졸업, 취업 준비, 그리고 지금까지
                삶의 굴곡을 함께하며 쌓아온 믿음과 사랑으로
                서로를 아끼며 행복하게 살아가겠습니다.
              </Interview>
            </div>
          </InterviewWrapper>
          <LikeButton ref={childRef} />
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
            style={{ maxWidth: '385px', marginTop: '35px' }}
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
          ref={refEl}
        >
          <div>
            <EnglishSubTitle>LOCATION</EnglishSubTitle>
            <Title>오시는 길</Title>
          </div>
          <Description style={{ margin: '50px 0 24px' }}>
            <Location>KU컨벤션웨딩홀</Location>
            <br />
            <LocationDetail>
              서울 광진구 아차산로36길 5
            </LocationDetail>
          </Description>
          <Map />
          <MapIconsWrapper>
            {/* <MapIconItem target="_blank" onClick={() => onClickMapIcon('TMAP')}>
              <MapIconImage src={TMavIcon} width={24} height={24} />
              티맵
            </MapIconItem> */}
            <MapIconItem href="https://kko.kakao.com/9iRbhRd6g0">
              <MapIconImage src={KakaoMapIcon} width={24} height={24} />
              카카오맵
            </MapIconItem>
            <MapIconItem href="https://naver.me/5Z0vOB1B">
              <MapIconImage src={NaverMapIcon} width={24} height={24} />
              네이버지도
            </MapIconItem>
          </MapIconsWrapper>
          <NaviWrapper style={{ paddingTop: '30px' }}>
            <NaviTitle>자가용 & 주차 안내</NaviTitle>
            <Li style={{ marginBottom: '4px' }}>
              <Marker>𒊹</Marker>내비게이션으로 "KU컨벤션웨딩홀" 검색해주세요.
            </Li>
            <Li>
              <Marker>𒊹</Marker>무료 주차는 2시간 가능합니다.
            </Li>
            <Li> - &nbsp;건국대학교 주차장, 무료주차 2시간 가능</Li>
          </NaviWrapper>
          <NaviWrapper>
            <NaviTitle>지하철 안내</NaviTitle>
            <Li>
              <Marker>𒊹</Marker>건대입구역 5번 혹은 4번 출구
            </Li>
            <Li style={{ marginBottom: '12px' }}>- &nbsp;도보 5분 거리</Li>
          </NaviWrapper>
          <NaviWrapper>
            <NaviTitle>대중교통 버스 안내</NaviTitle>
            <Li>
              <Marker>𒊹</Marker> 건국대학교앞 혹은 건대입구역 하차
            </Li>
            <Li style={{ marginBottom: '12px' }}>
              - &nbsp;240, 721, 2222, 2224, 3217, 3220, 4212, 광진05
            </Li>
            <Li>
              <Marker>𒊹</Marker> 광진구의회 하차
            </Li>
            <Li style={{ marginBottom: '12px' }}>
              - &nbsp;공항버스 6013
            </Li>
          </NaviWrapper>
          <NaviWrapper
            style={{
              margin: '40px 0 0 0',
              border: '4px double lightgray',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0)',
              padding: '30px 0 56px',
            }}
          >
            <Flower
              style={{
                backgroundImage: `url(${SunFlower2})`,
                marginBottom: '18px',
              }}
            />
            <NaviTitle>전세버스 안내</NaviTitle>
            <Li
              style={{
                textAlign: 'center',
                marginTop: '12px',
              }}
            >
              귀한 발걸음을 해주시는 <br />
              지방 하객분들의 편의를 위해 <br />
              화성↔서울 간 전세버스를 준비하였습니다.
            </Li>
            <Li
              style={{
                textAlign: 'left',
                lineHeight: 1.7,
              }}
            >
              <i
                className="fa fa-clock"
                aria-hidden="true"
                style={{
                  marginTop: '38px',
                  marginRight: '8px',
                  fontSize: '15.5px',
                  color: '#444444',
                }}
              ></i>
              출발 시간 : 2025. 11. 01. (토) 오전 10시 10분
              <br />
              <i
                className="fa fa-map-marker-alt"
                aria-hidden="true"
                style={{
                  marginTop: '16px',
                  marginRight: '8px',
                  fontSize: '15.5px',
                  color: '#444444',
                }}
              ></i>
              탑승 장소 : 경기도 화성시 반월동 948
              <br />
              삼성전자 NanoCity 화성캠퍼스 대형 주차장 (H1) <br />
              → H3정문(경유) <br />
              <i
                className="fa fa-phone"
                aria-hidden="true"
                style={{
                  marginTop: '16px',
                  marginRight: '8px',
                  fontSize: '15.5px',
                  color: '#444444',
                  transform: 'rotate(98deg)',
                }}
              ></i>
              관련 문의 : 신랑측 연락처로 부탁드립니다.
            </Li>

            {/* <img
              src={BusMap}
              style={{
                width: '80%',
                marginTop: '36px',
                border: '1px solid lightgray',
              }}
            /> */}
            {/* <AButton
              target="_blank"
              href={BUS_MAP_URL}
              style={{ position: 'relative', top: '30px' }}
            >
              탑승 위치 보기
            </AButton> */}
          </NaviWrapper>
        </DescriptionWrapper>
        <DescriptionWrapper>
          <EnglishSubTitle>WEDDING DINING INFO</EnglishSubTitle>
          <Title style={{ margin: '0 0 24px' }}>예식 · 식사 안내</Title>

          {/* <Slider /> */}
          <DescriptionItem>
            <HR style={{ width: '100%', marginBottom: '6px' }} />
            <img
              src={Hall}
              loading="lazy"
              style={{ marginBottom: '18px', width: '100%' }}
            />
            <DescriptionLi>
              <DescriptionMarker>𒊹</DescriptionMarker>예식장 1층에 ATM기가
              있으니 참고 부탁드립니다.
            </DescriptionLi>
            <DescriptionLi>
              <DescriptionMarker>𒊹</DescriptionMarker>식사 장소는 지하 1층
              에 마련되어 있습니다.
            </DescriptionLi>
            <DescriptionLi>
              <DescriptionMarker>𒊹</DescriptionMarker>예식 시작 30분 전부터
              식사가 가능합니다.
            </DescriptionLi>

            <DescriptionLi>
              <DescriptionMarker>𒊹</DescriptionMarker>
              전체메뉴의 80% 이상이 즉석 메뉴로 구성된 뷔페로, 생맥주, 와인 등
              주류도 무제한이니 편하게 즐겨주시면 감사하겠습니다.
            </DescriptionLi>
          </DescriptionItem>

          <EnglishSubTitle style={{ marginTop: '68px' }}>
            RECEPTION INFO
          </EnglishSubTitle>
          {/* <Title style={{ margin: '0 0 24px' }}>
            지방 피로연 (앞잔치) 안내
          </Title>
          <DescriptionItem>
            <HR style={{ width: '100%', marginBottom: '6px' }} />
            <img
              src={Hall2}
              loading="lazy"
              style={{ marginBottom: '18px', width: '100%' }}
            />
            <DescriptionLi>
              <DescriptionMarker>𒊹</DescriptionMarker>거리가 멀어 본식에
              참석하지 못하시는 분들을 위해, 예식 4일전 작은 피로연 자리를
              마련하였습니다.
            </DescriptionLi>
            <DescriptionLi>
              <DescriptionMarker>𒊹</DescriptionMarker>
              일시 : 25.02.05. 수요일 오후 5시
            </DescriptionLi>
            <DescriptionLi>
              <DescriptionMarker>𒊹</DescriptionMarker>
              장소 : 충청남도 예산군 더스타웨딩홀 피로연장
            </DescriptionLi>
          </DescriptionItem> */}
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
        <LastImgWrapper style={{ backgroundImage: `url(${image45})` }}>
          <span style={{ color: 'white', zIndex: 200 }}>
            저희의 새로운 시작을 축하해주시는
            <br />
            모든 분들께 감사드립니다.
          </span>
          <Dimmed></Dimmed>
        </LastImgWrapper>
      </ContentWrapper>

      {isVisible && (
        <BottomBar>
          <button
            style={{ width: '50%' }}
            onClick={() =>
              setComponent(<AttendModal setComponent={setComponent} />)
            }
          >
            <i className="fa fa-calendar-check" aria-hidden="true"></i>
            참석여부 전달하기
          </button>
          <button
            style={{ width: '25%', content: '23423' }}
            onClick={onClickLink}
          >
            {' '}
            <i className="fa fa-link" aria-hidden="true"></i>
            링크 복사
          </button>
          {/* <button style={{ width: '25%' }}>
            {' '}
            <i className="fa fa-comment" aria-hidden="true"></i>
            카톡 공유
          </button> */}
          <button
            style={{ width: '25%' }}
            onClick={triggerChildEventFromParent}
          >
            {' '}
            <i className="fa fa-heart" aria-hidden="true"></i>
            좋아요
          </button>
        </BottomBar>
      )}
    </Wrappper>
  );
}

export default Main;

const BottomBar = styled.div`
  position: fixed;
  bottom: 0;
  height: 55px;
  width: 100%;
  background-color: #f2f2f2;
  border-top: 1px solid #eaeaea;
  display: flex;
  z-index: 400;

  & > button {
    color: #444444;
    font-family: Pretendard;
    white-space: nowrap;
    font-size: 16px;
    z-index: 450;

    @media only screen and (max-width: 380px) {
      margin-right: 7px;
      font-size: 15px;
    }
  }

  & > button > i {
    margin-right: 8px;
    font-size: 15px;
    color: #444444;
    z-index: 450;

    @media only screen and (max-width: 380px) {
      margin-right: 7px;
      font-size: 14px;
    }
  }
`;

const Dimmed = styled.div`
  background-color: rgba(0, 0, 0, 0.35);
  width: 100%;
  height: 100%;
  position: absolute;
`;

const LastImgWrapper = styled.div`
  width: 100vw;
  max-width: 600px;
  height: calc(min(100vw, 600px) * 0.6667);
  position: relative;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 18px;
  text-align: center;
  line-height: 1.8;

  @media only screen and (max-width: 380px) {
    font-size: 17px;
    line-height: 1.7;
  }
`;

const InterviewWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 36px;
  flex-direction: column;
  margin: 36px 0;
`;

const Interview = styled.div`
  width: 100%;
  font-size: 15.4px;
  color: #555555;
  line-height: 1.8;

  word-break: break-all;

  @media only screen and (max-width: 390px) {
    font-size: 15px;
  }
`;

const InterviewImageWrapper = styled.div`
  position: relative;
  width: min(calc(100vw - 44px), 510px);
  height: min(calc(100vw - 44px), 510px);
  margin: 0 auto;
`;

const InterviewImage = styled.div`
  position: absolute;
  top: 0;
  border-radius: 20px;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  transition: opacity 2s;
`;

const TitleImageTitle = styled.div`
  font-family: Cafe24Behappy, GowunDodum-Bold;
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
  position: relative;
  padding-bottom: 55px;
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
  font-family: GowunDodum-Bold;
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
  font-family: GowunDodum-Light;
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

const AButton = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
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
  text-decoration: none;
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
    font-size: 16.2px;
  }

  @media only screen and (max-width: 340px) {
    font-size: 15.2px;
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

const MapIconsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 330px;
  margin: 20px 0;
  gap: 50px;

  @media only screen and (max-width: 400px) {
    width: 320px;
    gap: 45px;
  }

  @media only screen and (max-width: 360px) {
    width: 310px;
    gap: 43px;
  }

  @media only screen and (max-width: 340px) {
    width: 290px;
    gap: 42px;
  }
`;

const MapIconItem = styled.a`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: Pretendard;
  font-size: 16px;
  text-decoration: none;

  @media only screen and (max-width: 380px) {
    font-size: 15.5px;
  }

  @media only screen and (max-width: 340px) {
    font-size: 15px;
  }
`;

const MapIconItemDiv = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: Pretendard;
  font-size: 16px;
  text-decoration: none;

  @media only screen and (max-width: 380px) {
    font-size: 15.5px;
  }

  @media only screen and (max-width: 340px) {
    font-size: 15px;
  }
`;

const MapIconImage = styled.img`
  border-radius: 4px;
`;

const DescriptionItem = styled.div`
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  gap: 6.5px;
  font-size: 15px;
  font-family: Pretendard;
  line-height: 1.8;
  word-break: keep-all;
  word-wrap: break-word;
  color: #555555;
`;

const DescriptionLi = styled.li`
  list-style: none;
  /* font-weight: 800; */
  font-family: Pretendard;
  font-size: 17px;

  @media only screen and (max-width: 445px) {
    font-size: 16.6px;
  }

  @media only screen and (max-width: 360px) {
    font-size: 16.2px;
  }
`;

const DescriptionMarker = styled.span`
  font-size: 10px;
  color: #555555;
  margin-right: 6px;
  font-family: Pretendard;
  position: relative;
  bottom: 3px;
`;
