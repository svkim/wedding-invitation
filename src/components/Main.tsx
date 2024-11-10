import styled from 'styled-components';
import CalendarPic from '../../public/images/calendar.png';

// import FloatingBar from './../components/FloatingBar';
import { useEffect, useRef, useState, lazy } from 'react';
import { useSearchParams } from 'react-router-dom';
import Snowfall from 'react-snowfall';
import ManPic from '../../public/images/man.jpg';
import WomanPic from '../../public/images/woman.jpg';
import BoyPic from '../../public/images/boy.png';
import GirlPic from '../../public/images/girl.jpeg';
import MainPic from '../../public/images/main7.jpg';
import ProgressiveImg from './ProgressiveImg';
import High from '../../public/images/high.jpg';
import Slider from './Slider';
import Cursor from '../../public/images/cursor.png';
import PhoneModal from './PhoneModal';

interface Props {
  setComponent: React.Dispatch<React.SetStateAction<React.ReactNode>>;
}

const PhotoGallery = lazy(() => import('./Gallery/PhotoGallery'));

function Main({ setComponent }: Props) {
  const [isboy, setIsBoy] = useState(true);
  const [isGirl, setIsGirl] = useState(true);
  const [, setIsVisible] = useState(false);
  const refEl = useRef(null);
  const mainImageRef = useRef<HTMLDivElement>(null);

  const [searchParams] = useSearchParams();
  const dear = searchParams.get('dear'); // 받는사람 성명

  const innerHeight = window.innerHeight;

  // useEffect(() => {
  //   if (mainImageRef.current) {
  //     mainImageRef.current.style.height = `${innerHeight - 200}px`;
  //   }
  // }, []);

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
        <ProgressiveImg placeholderSrc={MainPic} src={High} />

        <TitleImageTitle>
          We're Getting
          <br />
          Married!
        </TitleImageTitle>

        <DescriptionWrapper style={{ padding: '50px 20px', height: 180 }}>
          <Description
            style={{
              fontSize: '21px',
              marginBottom: '25px',
              fontWeight: 'bold',
              letterSpacing: '0.1px',
              color: '#343434',
            }}
          >
            김태현&nbsp;&nbsp;&&nbsp;&nbsp;이상경
          </Description>
          <Description
            style={{
              letterSpacing: '0.3px',
              marginBottom: '4px',
              fontFamily: 'Pretendard',
              fontWeight: 400,
              color: '#4f4f4f',
            }}
          >
            2025. 02. 09. 일요일 PM 2:00
          </Description>
          <Description
            style={{
              letterSpacing: '0.2px',
              fontFamily: 'Pretendard',
              fontWeight: 400,
            }}
          >
            서울숲 갤러리아포레 G층 보테가마지오
          </Description>
        </DescriptionWrapper>
        <DescriptionWrapper
          style={{
            backgroundColor: '#F4F4F4',
            gap: '32px',
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
              lineHeight: '32px',
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
          <Description style={{ lineHeight: '31px' }}>
            <span
              style={{
                fontFamily: 'Pretendard',
                fontWeight: 400,
                fontSize: '17px',
                color: '#555555',
              }}
            >
              김은수 &nbsp;•&nbsp; 곽숙견
              &nbsp;&nbsp;의&nbsp;&nbsp;&nbsp;아들&nbsp;
            </span>
            <span
              style={{
                fontFamily: 'MaruBuriBold',
                fontSize: '18px',
                marginLeft: '10px',
                color: '#3b3b3b',
              }}
            >
              태현
            </span>
            <br />
            <span
              style={{
                fontFamily: 'Pretendard',
                fontWeight: 400,
                fontSize: '17px',
                left: '1px',
                position: 'relative',
                color: '#555555',
              }}
            >
              이혁선 &nbsp;•&nbsp; 이화순
              &nbsp;&nbsp;의&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;딸&nbsp;&nbsp;&nbsp;
            </span>
            <span
              style={{
                fontFamily: 'MaruBuriBold',
                fontSize: '18px',
                marginLeft: '10px',
                color: '#3b3b3b',
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
            전화로 축하 인사하기
          </Button>
        </DescriptionWrapper>

        <DescriptionWrapper>
          <EnglishSubTitle>GROOM & BRIDE</EnglishSubTitle>
          <Title>신랑 신부는요,</Title>
          <div
            style={{
              paddingTop: 30,
              display: 'flex',
              gap: 'min(15px, 2vw)',
              width: '100%',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                position: 'relative',
                width: 'min(45vw, 270px)',
                height: 'min(45vw, 270px)',
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
                width: 'min(45vw, 270px)',
                height: 'min(45vw, 270px)',
                aspectRatio: '1/1',
                pointerEvents: 'auto',
              }}
              onClick={(e) => {
                e.preventDefault();
                setIsGirl(!isGirl);
              }}
            >
              <span
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
              </span>
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
              <p
                style={{
                  textAlign: 'center',
                  marginBottom: '10px',
                  fontSize: '17px',
                }}
              >
                <span
                  style={{
                    fontSize: '12px',
                    marginRight: '6px',
                    color: '#136198',
                  }}
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
                  marginBottom: '10px',
                  fontSize: '17px',
                }}
              >
                <span
                  style={{
                    fontSize: '12px',
                    marginRight: '6px',
                    color: '#e05068',
                  }}
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
            backgroundImage: `url(/images/image0.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'left',
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
          <Title style={{ marginBottom: '38px' }}>우리의 소중한 순간</Title>

          <PhotoGallery />
        </DescriptionWrapper>
        <DescriptionWrapper>
          <EnglishSubTitle>INFORMATION</EnglishSubTitle>
          <Title style={{ marginBottom: '35px' }}>안내 말씀드립니다</Title>

          <Slider />
        </DescriptionWrapper>
        <DescriptionWrapper
          style={{
            backgroundColor: '#F4F4F4',
            gap: '32px',
            position: 'relative',
            padding: '60px 15px 50px 15px',
          }}
        >
          <div>
            <EnglishSubTitle>SAVE THE DATE</EnglishSubTitle>
            <Title>참석정보를 전달해주세요</Title>
          </div>
          <Description
            ref={refEl}
            style={{
              fontWeight: 200,
              lineHeight: '32px',
            }}
          >
            축하의 마음으로 예식에 참석하시는
            <br />
            모든 분들을 더욱 귀하게 모실 수 있도록, <br />
            아래 버튼을 눌러 신랑 & 신부에게
            <br /> 참석 정보 전달을 부탁드립니다.
          </Description>

          <HR
            style={{
              borderWidth: '4px 0 0 0',
              borderStyle: 'double',
              borderColor: '#cccccc',
            }}
          />

          <Description style={{ lineHeight: '30px' }}>
            <span
              style={{
                fontFamily: 'Pretendard',
                fontWeight: 400,
                fontSize: '18px',
                color: '#444444',
              }}
            >
              2025. 02. 09. 일요일 오후 2:00
            </span>
            <br />
            <span
              style={{
                fontFamily: 'Pretendard',
                fontWeight: 400,
                fontSize: '18px',
                left: '1px',
                position: 'relative',
                color: '#444444',
              }}
            >
              서울숲 보테가마지오 단독홀
            </span>
          </Description>
          <HR
            style={{
              borderWidth: '4px 0 0 0',
              borderStyle: 'double',
              borderColor: '#cccccc',
            }}
          />
          <Button
            style={{ backgroundColor: '#444444', color: 'white' }}
            onClick={() =>
              setComponent(<PhoneModal setComponent={setComponent} />)
            }
          >
            참석정보 전달하기
          </Button>
        </DescriptionWrapper>
      </ContentWrapper>
      {/* <FloatingBar isVisible={isVisible} /> */}
      {/* {툴팁 추가할까?하단에 좋아요 배;치하고 놓치지않게 } */}
    </Wrappper>
  );
}

export default Main;

const TitleImageTitle = styled.div`
  font-family: Cafe24Behappy;
  color: #ffffff;
  font-size: min(14vw, 70px);
  position: absolute;
  z-index: 5;
  top: 35px;
  font-style: italic;
  line-height: 0.75;
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
  padding: 55px 20px 40px 20px;
`;

const Description = styled.p`
  font-size: 15.5px;
  text-align: center;
  font-weight: bold;
  position: relative;
  /* animation: fade_up 0.8s; */
  font-weight: 200;
  color: #555555;
`;

const Title = styled.p`
  font-family: MaruBuriBold;
  font-size: 21px;
  font-weight: 500;
  color: #555555;

  /* font-style: italic; */
`;

const EnglishSubTitle = styled.p`
  font-family: MaruburiLight;
  font-size: 12px;
  color: #b2b2b2;
  letter-spacing: 3px;
  text-align: center;
  padding-bottom: 5px;
`;

const HR = styled.hr`
  width: 50%;
  border: 0;
  height: 1px;
  border-width: 1px 0 0 0;
  border-style: solid;
  border-color: #e4e4e4;
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
  font-size: 17px;
  border-radius: 10px;
  cursor: pointer;
  margin: 8px 0px 16px;
`;
