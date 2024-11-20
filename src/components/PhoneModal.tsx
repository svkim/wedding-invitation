import { useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useOutsideClick } from '../hooks/useOutsideClick';

interface Props {
  setComponent: React.Dispatch<React.SetStateAction<React.ReactNode>>;
}

const PhoneModal = ({ setComponent }: Props) => {
  const elRef = useRef<HTMLDivElement>(null);

  useOutsideClick({
    ref: elRef,
    handler: () => setComponent(null),
  });

  const onClickPhone = () => {
    document.location.href = 'tel:01030016563';
  };

  const onClickMessage = () => {
    document.location.href = 'sms:01030016563';
  };

  return (
    <Container ref={elRef}>
      <CloseButton onClick={() => setComponent(null)}>
        <i
          className="fa fa-times"
          style={{ color: 'white' }}
          aria-hidden="true"
        ></i>
      </CloseButton>

      <Wrapper>
        <Title>신랑측</Title>
        <ContentWrapper>
          <Content>신랑</Content>
          <Name>김태현</Name>

          <Content style={{ marginLeft: '14px' }}>
            <Icon className="fa fa-phone" onClick={onClickPhone}></Icon>
          </Content>
          <Content>
            <Icon
              className="fa fa-envelope"
              onClick={onClickMessage}
              style={{ transform: 'none' }}
            ></Icon>
          </Content>
        </ContentWrapper>
        <ContentWrapper>
          <Content>혼주</Content>
          <Name>김은수</Name>

          <Content style={{ marginLeft: '14px' }}>
            <Icon className="fa fa-phone" onClick={onClickPhone}></Icon>
          </Content>
          <Content>
            <Icon
              className="fa fa-envelope"
              onClick={onClickMessage}
              style={{ transform: 'none' }}
            ></Icon>
          </Content>
        </ContentWrapper>
        <ContentWrapper>
          <Content>혼주</Content>
          <Name>곽숙견</Name>

          <Content style={{ marginLeft: '14px' }}>
            <Icon className="fa fa-phone" onClick={onClickPhone}></Icon>
          </Content>
          <Content>
            <Icon
              className="fa fa-envelope"
              onClick={onClickMessage}
              style={{ transform: 'none' }}
            ></Icon>
          </Content>
        </ContentWrapper>
      </Wrapper>
      <Wrapper>
        <Title style={{ color: '#a25364', borderBottom: '2px solid #e3cfd3' }}>
          신부측
        </Title>
        <ContentWrapper>
          <Content>신부</Content>
          <Name>이상경</Name>

          <Content style={{ marginLeft: '14px' }}>
            <Icon className="fa fa-phone" onClick={onClickPhone}></Icon>
          </Content>
          <Content>
            <Icon
              className="fa fa-envelope"
              onClick={onClickMessage}
              style={{ transform: 'none' }}
            ></Icon>
          </Content>
        </ContentWrapper>
        <ContentWrapper>
          <Content>혼주</Content>
          <Name>이혁선</Name>

          <Content style={{ marginLeft: '14px' }}>
            <Icon className="fa fa-phone" onClick={onClickPhone}></Icon>
          </Content>
          <Content>
            <Icon
              className="fa fa-envelope"
              onClick={onClickMessage}
              style={{ transform: 'none' }}
            ></Icon>
          </Content>
        </ContentWrapper>
        <ContentWrapper>
          <Content>혼주</Content>
          <Name>이화순</Name>

          <Content style={{ marginLeft: '14px' }}>
            <Icon className="fa fa-phone" onClick={onClickPhone}></Icon>
          </Content>
          <Content>
            <Icon
              className="fa fa-envelope"
              onClick={onClickMessage}
              style={{ transform: 'none' }}
            ></Icon>
          </Content>
        </ContentWrapper>
      </Wrapper>
    </Container>
  );
};

export default PhoneModal;

const Container = styled.div`
  position: relative;
  background-color: white;
  width: min(calc(100vw - 20px), 500px);
  height: 530px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  animation: fadeInUp 0.3s ease-in-out;
  flex-direction: column;
  gap: 20px;

  @media only screen and (max-width: 445px) {
    height: 510px;
    gap: 18px;
  }

  @media only screen and (max-width: 360px) {
    height: 490px;
    gap: 16px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 312px;

  @media only screen and (max-width: 600px) {
    width: 292px;
  }

  @media only screen and (max-width: 445px) {
    width: 262px;
  }

  @media only screen and (max-width: 360px) {
    width: 232px;
  }
`;

const Title = styled.div`
  width: 100%;
  height: 58px;
  color: #2d5976;
  border-bottom: 2px solid #cad3d9;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 21px;
  margin-bottom: 26px;

  @media only screen and (max-width: 600px) {
    font-size: 20px;
    height: 56px;
    margin-bottom: 24px;
  }

  @media only screen and (max-width: 445px) {
    font-size: 19px;
    height: 54px;
    margin-bottom: 22px;
  }

  @media only screen and (max-width: 360px) {
    font-size: 18px;
    height: 52px;
    margin-bottom: 20px;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-bottom: 16px;

  @media only screen and (max-width: 600px) {
    margin-bottom: 15px;
  }

  @media only screen and (max-width: 445px) {
    margin-bottom: 14px;
    gap: 16px;
  }

  @media only screen and (max-width: 360px) {
    margin-bottom: 13px;
    gap: 14px;
  }
`;

const Icon = styled.i`
  transform: rotate(93deg);

  color: #444444;
  padding: 5px;
  font-size: 18px;
  cursor: pointer;

  @media only screen and (max-width: 600px) {
    font-size: 17px;
  }

  @media only screen and (max-width: 445px) {
    font-size: 16px;
    padding: 4px;
  }
`;

const Content = styled.span`
  color: #444444;
  font-size: 16px;

  @media only screen and (max-width: 600px) {
    font-size: 15px;
  }

  @media only screen and (max-width: 445px) {
    font-size: 14px;
  }
`;

const Name = styled(Content)`
  font-size: 18px;
  color: #222222;
  font-weight: bold;

  @media only screen and (max-width: 600px) {
    font-size: 17px;
  }

  @media only screen and (max-width: 445px) {
    font-size: 16px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.28);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  color: white;
  font-size: 21px;
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  font-weight: 200;

  @media only screen and (max-width: 445px) {
    width: 34px;
    height: 34px;
    font-size: 20px;
  }

  @media only screen and (max-width: 360px) {
    width: 33px;
    height: 33px;
    font-size: 19px;
    top: 9px;
    right: 9px;
  }
`;
